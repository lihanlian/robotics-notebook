---
title: Waypoint Tracking
parent: Stretch
permalink: /docs/Examples/stretch-waypoint-tracking.html
nav_order: 1
---

# Waypoint Tracking
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Notes on the Stretch 3 waypoint-tracking project. Implementation details and results will be added here.

## 1. Connecting ROS 2 to Stretch

### System architecture

The tracking node computes velocity commands from odometry. The Stretch ROS driver receives those commands and uses `stretch_body`, the Python hardware API, to control the base. Feedback returns through the driver to the tracker. `PDController` and `SquareTask` are Python objects inside the tracker, not separate ROS nodes. The [driver source](https://github.com/hello-robot/stretch_ros2/blob/humble/stretch_core/stretch_core/stretch_driver.py) shows how ROS connects to `stretch_body`.

### ROS concepts and interfaces

A **node** performs a specific task. **Topics** carry typed messages between publishers and subscribers:

- `/stretch/cmd_vel`: `Twist` commands; `linear.x` specifies forward speed (m/s), and `angular.z` specifies yaw rate (rad/s).
- `/odom`: `Odometry` feedback containing estimated pose and velocity.
- `/is_homed`, `/mode`, and `/is_runstopped`: driver status messages.

In `/odom`, `header.stamp` records time. This tracker expects pose in `odom` and velocity in `base_link`, identified by `header.frame_id` and `child_frame_id`. It reads `pose.pose.position`, converts quaternion orientation to yaw, and reads velocity from `twist.twist`. Covariance fields describe uncertainty but are unused here. See the [message definition](https://github.com/ros2/common_interfaces/blob/humble/nav_msgs/msg/Odometry.msg).

**Services** exchange a request and response for discrete operations. **Parameters** are node settings, such as `side_length` and `control_hz`.

### Starting and inspecting the system

#### Start the driver

Use terminals with the ROS and workspace environments sourced. In terminal 1, start the Stretch driver directly in navigation mode and leave it running:

```bash
ros2 launch stretch_core stretch_driver.launch.py mode:=navigation
```

`ros2 launch` runs a launch description. `stretch_core` is Hello Robot’s ROS package containing Stretch’s core interfaces; a package groups code, launch files, configuration, and dependencies. Its driver connects ROS to the hardware through `stretch_body` ([documentation](https://github.com/hello-robot/stretch_ros2/blob/humble/stretch_core/README.md)). `stretch_driver.launch.py` is the package’s Python launch file. `mode:=navigation` assigns `navigation` to its `mode` launch argument, enabling base velocity commands on `/stretch/cmd_vel`.

If you instead run `ros2 launch stretch_core stretch_driver.launch.py`, the driver defaults to **position mode**. Switch the running driver to navigation mode from another configured terminal:

```bash
ros2 service call /switch_to_navigation_mode std_srvs/srv/Trigger "{}"
```

`ros2 service call` sends a request and waits for a response. `/switch_to_navigation_mode` names the driver’s service; the leading `/` makes it an absolute ROS name. `std_srvs/srv/Trigger` defines the request and response: `std_srvs` is the package, `srv` identifies a service interface, and `Trigger` is its name. `"{}"` supplies an empty YAML request; `Trigger` has no request fields and returns `success` and `message`. In ROS 2 Humble, the request defaults to `{}`, so this is equivalent:

```bash
ros2 service call /switch_to_navigation_mode std_srvs/srv/Trigger
```

The service call waits if the service is unavailable; it does not start the driver. Skip this switch if already in navigation mode.

#### Home and stow through ROS

Keep the tracker stopped during preparation. With the driver running in terminal 1, use a second configured terminal. Skip homing if already homed, and stowing if already stowed. Run each needed command separately, waiting for successful completion before continuing:

```bash
ros2 service call /home_the_robot std_srvs/srv/Trigger "{}"
ros2 service call /stow_the_robot std_srvs/srv/Trigger "{}"
```

These operations move joints and require clearance. The driver temporarily enters `homing` or `stowing` mode, then restores its previous mode.

#### Alternative: prepare before starting the driver

You can instead use standalone tools while the driver and other hardware-owning software are stopped. Run the needed preparation commands sequentially, then start the driver:

```bash
stretch_robot_home.py
stretch_robot_stow.py
ros2 launch stretch_core stretch_driver.launch.py mode:=navigation
```

Both tools access the hardware directly through Stretch Body. The ROS driver uses the same library and keeps its connection open. A process lock prevents a second program from taking ownership. This restriction applies to the standalone tools; homing and stowing through ROS services use the running driver’s existing connection.

#### Monitor odometry

With the driver running, use another configured terminal to display position continuously:

```bash
ros2 topic echo /odom | grep -A3 "position:"
```

- `ros2 topic echo`: subscribe and print messages as YAML; `ros2 echo` is not valid syntax.
- `/odom`: the topic carrying `nav_msgs/msg/Odometry` messages.
- `|`: pass the left command’s standard output to the right command’s standard input.
- `grep`: filter lines matching `"position:"`; the shell removes the quotes.
- `-A3`: print each match and the next three lines (`x`, `y`, `z`). Equivalent forms are `-A 3` and `--after-context=3`. Separate match groups may have `--` between them.

For example:

```yaml
    position:
      x: 0.12
      y: -0.03
      z: 0.0
```

ROS can also select the field directly:

```bash
ros2 topic echo /odom --field pose.pose.position
```

`--field` selects the nested `pose.pose.position` field, printing only `x`, `y`, and `z`. These estimates are in meters in the odometry frame, not displacement from the experiment’s starting position. Both commands only monitor feedback. Press **Ctrl+C** in that terminal to stop monitoring.

---

Source ROS and workspace setup files so the terminal can find packages. `stretch_tracking` is the package, `track` is its executable, and `/tracking_node` is the running node's name.

```bash
ros2 launch stretch_tracking tracking.launch.py
```

`launch` runs a launch description. This one starts the tracker with the installed `experiment.yaml`; the driver runs separately. In YAML, `tracking_node` selects the node and `ros__parameters` contains overrides for defaults supplied to `declare_parameter()`.

Alternatively, `run` starts the executable directly:

```bash
ros2 run stretch_tracking track --ros-args \
  --params-file path/to/experiment.yaml -p trace_callbacks:=false
```

Replace the example path with your YAML. `--ros-args` introduces ROS arguments; `--params-file` loads configuration; the later `-p` overrides tracing. Omitting these arguments uses code defaults. This tracker caches settings at startup, so restart it to apply configuration changes.

A service call illustrates request/response communication:

```bash
ros2 service call /switch_to_navigation_mode std_srvs/srv/Trigger "{}"
```

The arguments identify the service, its type, and an empty request. `Trigger` returns `success` and `message`.

Inspect the system while the tracker runs:

```bash
ros2 node list
ros2 node info /tracking_node
ros2 topic echo /odom --once
ros2 topic hz /stretch/cmd_vel
ros2 param get /tracking_node side_length
ros2 run rqt_graph rqt_graph
```

These list nodes, show connections, print feedback, measure command frequency, read a setting, and visualize communication. The nominal command rate is 20 Hz; odometry has its own publishing rate. `rqt_graph` shows driver-to-tracker feedback and tracker-to-driver commands, not Python callback order.

![ROS graph showing the Stretch driver's joint-state and robot-description connections]({{ '/assets/images/Stretch/rqt_graph.png' | relative_url }})

*Stretch's joint-state and robot-description connections in `rqt_graph`. The tracking node is not shown in this capture.*

**Ellipses represent nodes**, such as `/stretch_driver`; **rectangles represent topics**, such as `/joint_states`. Arrows indicate message flow: node → topic means publishing, and topic → node means subscribing. The larger `/stretch` box groups items in that namespace; it is not a node.

## 2. Implementation: From Feedback to Commands

### Execution and callbacks

- Subscription callbacks store feedback; the timer invokes `control_loop()`.
- `spin_once()`, timer frequency, and actual elapsed control time.

### Coordinate transformation

- `to_local()`: translation and rotation relative to the initial stationary pose.
- Fixed experiment frame versus the odometry frame and moving robot frame.

*Figure placeholder: coordinate-frame sketch showing the initial pose and transformation.*

### Waypoint sequencing

- Four square corners and the DRIVE → STOP → TURN sequence.
- Settling conditions and the fourth turn back to the initial heading.

*Figure placeholder: phase diagram showing transitions, completion, and position-drift handling.*

### PD control and steering

- Position and heading errors, proportional and derivative terms, and previous errors.
- Target bearing, angle wrapping, cosine speed scaling, and command limits.
- Distinguishing PD control, geometric steering, and waypoint sequencing.

### Completion and stopping

- Completion tolerances, settling time, readiness checks, and motion timeout.
- Interruption handling, stop commands, cleanup, CSV logs, and saved plots.

## 3. Results and Limitations

### Experimental setup

- Record robot/software versions, square dimensions, gains, limits, and control rate.
- Label simulation and hardware runs separately; add measured results when available.

### Trajectory and control results

- Report completion time, final position/heading error, and run outcome.
- Interpret target-switch error jumps and the difference between corner error and path deviation.
- Compare commanded and measured velocities during DRIVE, STOP, and TURN.

*Figure placeholder: planned square and odometry-estimated XY trajectory, with corners, start, and finish marked.*

*Figure placeholder: X, Y, and heading-error histories, annotated with waypoint or phase changes.*

*Figure placeholder: forward and angular velocity commands versus odometry estimates.*

### Odometry limitations

- Accumulated drift and the limits of odometry-estimated motion.
- Shared odometry for feedback and evaluation; coordinate transformation does not correct drift.
- Independent verification using a marked starting pose or external measurements.
