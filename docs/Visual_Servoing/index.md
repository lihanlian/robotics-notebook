---
title: Visual Servoing
nav_order: 9
nav_group: manipulation
has_toc: false
---

# Visual Servoing
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

Visual servoing uses camera feedback to guide robot motion. Each cycle measures image features or estimates a target pose, compares them with the desired values, and computes a command to reduce the error.

The camera can move with the robot (eye-in-hand) or remain fixed. Coordinate transformations connect camera motion to robot commands.

## ▪ Components and Topics
{: #components-and-topics }

- [Interaction Matrix]({% link docs/Visual_Servoing/interaction-matrix.md %}) explains the coordinate and motion relationships behind image-feature interaction matrices.
- [IBVS]({% link docs/Visual_Servoing/ibvs.md %}), or image-based visual servoing, controls errors in image features such as point coordinates.
- [PBVS]({% link docs/Visual_Servoing/pbvs.md %}), or position-based visual servoing, controls errors in 3D pose estimated from images.

In differential formulations, both methods relate feature changes to camera velocity through an interaction matrix. The matrix depends on the selected features; image coordinates and pose parameters require different forms.

## ▪ Related Foundations
{: #related-foundations }

- [Pinhole Camera Model]({% link docs/Perception/pinhole_camera_model.md %}): perspective projection, camera intrinsics, and pixel coordinates.
- [Rigid-body Pose Foundations]({% link docs/Kinematics/rigid_body_pose.md %}): translation, rotation, and coordinate transformations.
- [Pose Estimation]({% link docs/Perception/pose_estimation.md %}): recovering 3D position and orientation from observations.
- Robot Jacobians, camera calibration, and feedback-control gains.

## ▪ References
{: #references }

- François Chaumette and Seth Hutchinson. [Visual Servo Control, Part I: Basic Approaches](https://web.mit.edu/amcp/OldFiles/drg/Chaumette_Part_I.pdf). *IEEE Robotics & Automation Magazine*, 2006.
