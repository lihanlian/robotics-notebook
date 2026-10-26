---
title: Stretch-MPC-Tracking
parent: Stretch
permalink: /docs/Examples/stretch-mpc-tracking.html
nav_order: 1
---

# Stretch-MPC-Tracking
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Notes on the Stretch 3 tracking project. The current implementation is a PD baseline; MPC is not yet implemented. Implementation details and results will be added here.

## ▪ Running the project

### Build and prepare the robot

- **Build the package and configure terminals**

  Build on Stretch’s onboard computer. The fleet path and ID below match the example robot; use the values configured for your robot:

  ```bash
  source /opt/ros/humble/setup.bash
  source ~/ament_ws/install/setup.bash
  export HELLO_FLEET_PATH=/home/hello-robot/stretch_user
  export HELLO_FLEET_ID=stretch-se3-3166
  cd ~/Desktop/tracking_ws
  colcon build --symlink-install --packages-select stretch_tracking
  source install/setup.bash
  ```

  In **each new onboard terminal**, source the environment before ROS commands:

  ```bash
  source /opt/ros/humble/setup.bash
  source ~/ament_ws/install/setup.bash
  source ~/Desktop/tracking_ws/install/setup.bash
  export HELLO_FLEET_PATH=/home/hello-robot/stretch_user
  export HELLO_FLEET_ID=stretch-se3-3166
  ```

- **Start the driver**

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

- **Home and stow through ROS**

  Keep the tracker stopped during preparation. With the driver running in terminal 1, use a second configured terminal. Skip homing if already homed, and stowing if already stowed. Run each needed command separately, waiting for successful completion before continuing:

  ```bash
  ros2 service call /home_the_robot std_srvs/srv/Trigger "{}"
  ros2 service call /stow_the_robot std_srvs/srv/Trigger "{}"
  ```

  These operations move joints and require clearance. The driver temporarily enters `homing` or `stowing` mode, then restores its previous mode.

- **Alternative: prepare before starting the driver**

  You can instead use standalone tools while the driver and other hardware-owning software are stopped. Run the needed preparation commands sequentially, then start the driver:

  ```bash
  stretch_robot_home.py
  stretch_robot_stow.py
  ros2 launch stretch_core stretch_driver.launch.py mode:=navigation
  ```

  Both tools access the hardware directly through Stretch Body. The ROS driver uses the same library and keeps its connection open. A process lock prevents a second program from taking ownership. This restriction applies to the standalone tools; homing and stowing through ROS services use the running driver’s existing connection.

- **Monitor odometry**

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

### Execution: run and plot

- **Run the tracker**

  After preparation, run the tracker in terminal 2. `stretch_tracking` is the package, `track` is its executable, and `/tracking_node` is the running node's name.

  The tracker requires fresh odometry and status messages, homed status, navigation mode, and a released runstop.

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

  Use only one tracker command per run. The launch file does not forward parameter overrides; use the direct executable command above when overriding a parameter.

- **Inspect the running system**

  Use another configured terminal while the tracker runs. Run these commands separately; press **Ctrl+C** to stop continuous output before entering the next command:

  ```bash
  ros2 node list
  ros2 node info /tracking_node
  ros2 topic echo /odom --once
  ros2 topic hz /stretch/cmd_vel
  ros2 param get /tracking_node side_length
  ros2 run rqt_graph rqt_graph
  ```

  These list nodes, show connections, print feedback, measure command frequency, read a setting, and visualize communication. The nominal command rate is 20 Hz; odometry has its own publishing rate. `rqt_graph` shows driver-to-tracker feedback and tracker-to-driver commands, not Python callback order.

- **Finish the run and plot the results**

  Wait for the result and the `Saved CSV:` path printed by the node. To stop early, press **Ctrl+C** in terminal 2 and let cleanup finish; keep the driver running until the tracker has stopped. Then **Ctrl+C** in terminal 1 shuts down the driver.

  Each run saves a uniquely named CSV. After closing the log and shutting down ROS, the tracker automatically saves PNG figures if tracking samples exist, including after a normal interruption or an abort during tracking. An abort before tracking begins has no trajectory to plot. Allow plotting to finish before closing the terminal.

  To regenerate plots for the latest run in the default logs directory:

  ```bash
  ros2 run stretch_tracking plot
  ```

  To plot a specific recording, replace this example with the printed CSV path:

  ```bash
  ros2 run stretch_tracking plot ~/Desktop/tracking_ws/logs/track_20261021_120000_1e945b39.csv
  ```

  Figures are saved in a matching `track_..._plots/` directory beside the CSV; `--output /your/output/directory` chooses another location. The plotter prints the saved paths. The figures show the XY trajectory, errors, and velocity commands using odometry estimates, not independent physical ground truth.

### System architecture

The tracking node computes velocity commands from odometry. The Stretch ROS driver receives those commands and uses `stretch_body`, the Python hardware API, to control the base. Feedback returns through the driver to the tracker. `PDController` and `SquareTask` are Python objects inside the tracker, not separate ROS nodes. The [driver source](https://github.com/hello-robot/stretch_ros2/blob/humble/stretch_core/stretch_core/stretch_driver.py) shows how ROS connects to `stretch_body`.

- **ROS concepts and interfaces**

  A **node** performs a specific task. **Topics** carry typed messages between publishers and subscribers:

  - `/stretch/cmd_vel`: `Twist` commands; `linear.x` specifies forward speed (m/s), and `angular.z` specifies yaw rate (rad/s).
  - `/odom`: `Odometry` feedback containing estimated pose and velocity.
  - `/is_homed`, `/mode`, and `/is_runstopped`: driver status messages.

  In `/odom`, `header.stamp` records time. This tracker expects pose in `odom` and velocity in `base_link`, identified by `header.frame_id` and `child_frame_id`. It reads `pose.pose.position`, converts quaternion orientation to yaw, and reads velocity from `twist.twist`. Covariance fields describe uncertainty but are unused here. See the [message definition](https://github.com/ros2/common_interfaces/blob/humble/nav_msgs/msg/Odometry.msg).

  **Services** exchange a request and response for discrete operations. **Parameters** are node settings, such as `side_length` and `control_hz`.

- **ROS graph**

  ![ROS graph showing the Stretch driver's joint-state and robot-description connections]({{ '/assets/images/Stretch/rqt_graph.png' | relative_url }})

  *Stretch's joint-state and robot-description connections in `rqt_graph`. The tracking node is not shown in this capture.*

  **Ellipses represent nodes**, such as `/stretch_driver`; **rectangles represent topics**, such as `/joint_states`. Arrows indicate message flow: node → topic means publishing, and topic → node means subscribing. The larger `/stretch` box groups items in that namespace; it is not a node.

## ▪ Implementation: From Feedback to Commands

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

## ▪ Results and Limitations

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
