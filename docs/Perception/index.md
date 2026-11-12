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

The topics also cover learned visual features, object recognition, and segmentation. These produce different kinds of information: feature vectors describe appearance, detections locate objects, masks identify their image regions, and geometric estimates recover spatial relationships.

## ▪ Components and Topics
{: #components-and-topics }

- [Camera Geometry]({% link docs/Perception/geometry/index.md %}) groups the existing camera-model, calibration, and pose-estimation notes.
- [Visual Representations]({% link docs/Perception/representations/index.md %}) introduces feature learning, Vision Transformers, DINOv2, and DINOv3.
- [Recognition and Detection]({% link docs/Perception/detection/index.md %}) covers classification, bounding-box detection, and YOLO.
- [Segmentation]({% link docs/Perception/segmentation/index.md %}) covers pixel masks, segmentation tasks, SAM 2, and SAM 3.

These groups distinguish geometry, reusable representations, and prediction tasks. A model can contribute to several tasks; the pages introduce it where its main role is easiest to understand.

## ▪ Related Foundations
{: #related-foundations }

- [Visual Features and Tracking]({% link docs/SLAM/frontends/visual-features.md %}): keypoints, descriptors, and image correspondences.
- [RANSAC]({% link docs/SLAM/frontends/ransac.md %}): robust geometric estimation when some correspondences are incorrect.
- [SLAM]({% link docs/SLAM/index.md %}): combining observations to estimate motion and build maps.
- [Visual Servoing]({% link docs/Visual_Servoing/index.md %}): using image features or estimated pose in a feedback-control loop.

## ▪ References
{: #references }

- OpenCV. [Camera Calibration and 3D Reconstruction](https://docs.opencv.org/4.13.0/d9/d0c/group__calib3d.html). *OpenCV 4.13.0 documentation*.
- Richard Szeliski. [Computer Vision: Algorithms and Applications](https://szeliski.org/Book/), second edition.
