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

- Roles of the tracking node, Stretch ROS driver, `stretch_body`, and hardware.
- Command flow through `/stretch/cmd_vel`; feedback through odometry and status topics.

### ROS concepts and interfaces

- Nodes, topics, messages, services, and parameters used in this project.
- `/odom`: timestamps, frame identifiers, pose, orientation, velocity, and covariance.

### Starting and inspecting the system

- `ros2 launch`, `ros2 run`, `ros2 service call`, and startup parameter loading.
- Node, topic, message-type, and parameter inspection commands.
- Reading `rqt_graph`: communication connections versus callback execution order.

*Figure placeholder: annotated `rqt_graph` screenshot showing the tracker, driver, and relevant topics.*

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
