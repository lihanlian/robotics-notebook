---
title: Computer Vision
layout: default
nav_order: 4
nav_group: perception_navigation
has_toc: false
---

# Computer Vision
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

Computer vision extracts information about the world from images. In robotics, it helps estimate camera motion, locate objects, and interpret the scene so the robot can act on it. This chapter begins with the geometry connecting 3D points to image measurements.

- **Camera modeling:** describe how points in space project onto an image.
- **Calibration:** estimate the parameters needed to use that model with a real camera.
- **Pose estimation:** infer an object's or camera's position and orientation from observations.

## ▪ Components and Topics
{: #components-and-topics }

- [Pinhole Camera Model]({% link docs/Perception/pinhole_camera_model.md %}) introduces perspective projection, homogeneous coordinates, and intrinsic and extrinsic camera parameters.
- [Camera Calibration]({% link docs/Perception/camera_calibration.md %}) connects known 3D points to measured pixels to estimate camera intrinsics and the camera's pose for each calibration view.
- [Pose Estimation]({% link docs/Perception/pose_estimation.md %}) outlines how features and model correspondences support estimating, refining, and tracking 3D pose.

Study these topics in this order: first understand the projection model, then identify its parameters, and finally use image observations to estimate pose. A pixel identifies a viewing ray; recovering depth requires additional information.

## ▪ Related Foundations
{: #related-foundations }

- Coordinate frames, rotations, translations, and rigid transformations.
- Linear algebra, homogeneous coordinates, and projective geometry.
- Feature detection, correspondence matching, and robust estimation.
- Measurement uncertainty and reprojection error.

Visual [SLAM]({% link docs/SLAM/index.md %}) uses camera models and image correspondences to estimate motion and build maps. Object pose estimates also support grasping and visual servoing.

## ▪ References
{: #references }

- OpenCV. [Camera Calibration and 3D Reconstruction](https://docs.opencv.org/4.13.0/d9/d0c/group__calib3d.html). *OpenCV 4.13.0 documentation*.
- Richard Szeliski. [Computer Vision: Algorithms and Applications](https://szeliski.org/Book/), second edition.
