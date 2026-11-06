---
title: RANSAC
parent: SLAM Frontends
grand_parent: SLAM
nav_order: 2
---

# RANSAC
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

Random Sample Consensus (RANSAC) is a robust estimation method for fitting a model when some measurements are incorrect. Measurements that agree with a candidate model within an error threshold are called inliers; the others are treated as outliers.

## ▪ Core idea
{: #core-idea }

1. Randomly select a small subset of measurements.
2. Fit a candidate model using that subset.
3. Check all measurements against the model and count its inliers.
4. Repeat, keep the model with the strongest support, and refine it using its inliers.

## ▪ Role in SLAM
{: #role-in-slam }

Visual SLAM can use RANSAC to handle incorrect feature matches during geometric estimation. Examples include estimating an essential matrix from matches between images, estimating camera pose with PnP from 3D-to-2D matches, and geometrically verifying candidate loop closures.

RANSAC is a general estimation tool used within a SLAM system. Its success depends on the model, error threshold, number of iterations, and proportion of inliers.

See [Visual Features and Tracking]({% link docs/SLAM/frontends/visual-features.md %}) for the observations being matched, and [Loop-Closure Detection]({% link docs/SLAM/frontends/loop-closure.md %}) for revisit verification.

<span id="resources"></span>

## ▪ References
{: #references }

- [OpenCV: Camera Calibration and 3D Reconstruction](https://docs.opencv.org/4.13.0/d9/d0c/group__calib3d.html)
- [ORB-SLAM paper](https://arxiv.org/abs/1502.00956)
