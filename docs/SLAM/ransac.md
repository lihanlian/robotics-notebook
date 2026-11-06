---
title: RANSAC
parent: SLAM
nav_order: 1
---

# RANSAC

Random Sample Consensus (RANSAC) is a robust estimation method for fitting a model when some measurements are incorrect. Measurements that agree with a candidate model within an error threshold are called inliers; the others are treated as outliers.

## Core idea

1. Randomly select a small subset of measurements.
2. Fit a candidate model using that subset.
3. Check all measurements against the model and count its inliers.
4. Repeat, keep the model with the strongest support, and refine it using its inliers.

## Role in SLAM

Visual SLAM can use RANSAC to handle incorrect feature matches during geometric estimation. Examples include estimating an essential matrix from matches between images, estimating camera pose with PnP from 3D-to-2D matches, and geometrically verifying candidate loop closures.

RANSAC is a general estimation tool used within a SLAM system. Its success depends on the model, error threshold, number of iterations, and proportion of inliers.

## Resources

- [OpenCV: Camera Calibration and 3D Reconstruction](https://docs.opencv.org/4.13.0/d9/d0c/group__calib3d.html)
- [ORB-SLAM paper](https://arxiv.org/abs/1502.00956)
