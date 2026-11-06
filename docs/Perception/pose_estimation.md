---
title: Pose Estimation
parent: Computer Vision
nav_order: 3
---

# Pose Estimation
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Pose estimation infers 3D position and orientation from sensor observations.

## ▪ Common inputs
{: #common-inputs }

- RGB images
- RGB-D images
- Point clouds
- Fiducial markers

## ▪ Typical pipeline
{: #typical-pipeline }

1. Detect keypoints or object regions.
2. Match features with model priors.
3. Solve for 6D pose.
4. Refine and track over time.

## ▪ Why it matters in manipulation
{: #why-it-matters-in-manipulation }

- Enables closed-loop grasping
- Supports hand-eye coordination
- Improves robustness to scene changes

## ▪ References
{: #references }

- OpenCV. [Perspective-n-Point (PnP) pose computation](https://docs.opencv.org/4.13.0/d5/d1f/calib3d_solvePnP.html). *OpenCV 4.13.0 documentation*.
