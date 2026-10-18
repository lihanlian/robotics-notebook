---
title: ORB-SLAM
parent: SLAM
nav_order: 1
---

# ORB-SLAM

ORB-SLAM is a family of visual SLAM systems that uses image features to estimate camera motion and build a sparse 3D landmark map. Tracking, local mapping, relocalization, and loop closure work together to maintain and refine that estimate.

ORB-SLAM3 supports monocular, stereo, and RGB-D cameras, as well as visual-inertial configurations. Its landmark map is distinct from the occupancy maps used for navigation and obstacle avoidance.

Topics for these notes include:

- ORB features, matching, and geometric verification.
- Camera pose estimation, keyframes, and bundle adjustment.
- Relocalization, loop closure, and map reuse.
- Camera calibration and transforming camera poses into robot-base poses.

## Resources

- [ORB-SLAM3 official implementation](https://github.com/UZ-SLAMLab/ORB_SLAM3)
- [ORB-SLAM3 paper](https://arxiv.org/abs/2007.11898)
