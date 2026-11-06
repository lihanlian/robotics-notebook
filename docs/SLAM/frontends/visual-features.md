---
title: Visual Features and Tracking
parent: SLAM Frontends
grand_parent: SLAM
nav_order: 1
---

# Visual Features and Tracking
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

Visual features provide recognizable image locations that can be associated across observations. A detector finds keypoints; a descriptor summarizes their surrounding appearance. ORB combines a keypoint detector with binary descriptors. Optical flow offers another approach by tracking how image patterns move between frames.

## ▪ Processing Steps
{: #processing-steps }

1. Detect informative image locations, such as corners.
2. Match descriptors or track locations into the next frame.
3. Reject inconsistent correspondences using geometric checks, including [RANSAC]({% link docs/SLAM/frontends/ransac.md %}).
4. Use the remaining observations to estimate motion or constrain mapped landmarks.

## ▪ Role in SLAM
{: #role-in-slam }

Correspondences connect image measurements to the camera model and pose-estimation problem. Image displacement alone is not a complete 3D motion estimate: projection geometry and scene structure also matter. [ORB-SLAM]({% link docs/SLAM/orb-slam.md %}) provides a complete-system example of feature-based tracking and mapping.

## ▪ References
{: #references }

- OpenCV. [ORB detector and descriptor](https://docs.opencv.org/4.13.0/db/d95/classcv_1_1ORB.html).
- OpenCV. [Optical Flow](https://docs.opencv.org/4.13.0/d4/dee/tutorial_optical_flow.html).
- Mur-Artal et al. [ORB-SLAM](https://arxiv.org/abs/1502.00956), 2015.
