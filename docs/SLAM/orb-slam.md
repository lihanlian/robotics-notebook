---
title: ORB-SLAM
parent: SLAM
nav_order: 4
---

# ORB-SLAM
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

ORB-SLAM is a family of visual SLAM systems that uses image features to estimate camera motion and build a sparse 3D landmark map. Tracking, local mapping, relocalization, and loop closure work together to maintain and refine that estimate.

ORB-SLAM3 supports monocular, stereo, and RGB-D cameras, as well as visual-inertial configurations. Its landmark map is distinct from the occupancy maps used for navigation and obstacle avoidance.

## ▪ Topics
{: #topics }

- ORB features, matching, and geometric verification.
- Camera pose estimation, keyframes, and bundle adjustment.
- Relocalization, loop closure, and map reuse.
- Camera calibration and transforming camera poses into robot-base poses.

## ▪ Connections to the SLAM Components
{: #connections-to-the-slam-components }

- **Frontend:** [visual features and tracking]({% link docs/SLAM/frontends/visual-features.md %}), [RANSAC]({% link docs/SLAM/frontends/ransac.md %}), and [loop-closure detection]({% link docs/SLAM/frontends/loop-closure.md %}).
- **Backend:** [graph-based estimation]({% link docs/SLAM/backends/graph-based-slam.md %}), including pose-graph optimization and bundle adjustment.
- **Map:** [landmark maps]({% link docs/SLAM/maps/landmark-maps.md %}) built from image observations.

<span id="resources"></span>

## ▪ References
{: #references }

- [ORB-SLAM3 official implementation](https://github.com/UZ-SLAMLab/ORB_SLAM3)
- [ORB-SLAM3 paper](https://arxiv.org/abs/2007.11898)
