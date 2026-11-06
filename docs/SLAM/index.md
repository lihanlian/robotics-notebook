---
title: SLAM
nav_order: 5
nav_group: perception_navigation
has_toc: false
---

# SLAM
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

Simultaneous localization and mapping estimates a robot's pose while building a map of its environment. This chapter also covers the state-estimation concepts needed to interpret and use those estimates.

- **Localization:** estimate the robot's pose relative to an existing map.
- **Mapping:** construct a map using observations and known or estimated sensor poses.
- **SLAM:** estimate the trajectory and unknown map together.

## ▪ Components and Topics
{: #components-and-topics }

- [SLAM Frontends]({% link docs/SLAM/frontends/index.md %}) turn sensor data into feature associations, relative-motion estimates, and measurement constraints.
- [SLAM Backends]({% link docs/SLAM/backends/index.md %}) combine observations and motion models to estimate states and, where included, map variables.
- [Maps and Mapping]({% link docs/SLAM/maps/index.md %}) describe how the environment is represented and updated.
- [ORB-SLAM]({% link docs/SLAM/orb-slam.md %}) connects these ideas in a complete visual SLAM system.

These components exchange information: frontend matching can use estimated poses and existing maps. Loop-closure detection supplies a constraint; the backend uses it to correct the estimate.

## ▪ Related Foundations
{: #related-foundations }

- Wheel odometry, inertial sensing, and sensor fusion.
- Coordinate frames, pose uncertainty, and drift.
- LiDAR and visual SLAM, map representations, and loop closure.
- Localization in an existing map and its role in navigation.

The [Navigation]({% link docs/Navigation/index.md %}) chapter builds on these pose estimates and maps to move the robot toward a goal.

## ▪ References
{: #references }

- Cadena et al. [Past, Present, and Future of Simultaneous Localization and Mapping](https://arxiv.org/abs/1606.05830).
- [SLAM Tutorial](https://www.cs.columbia.edu/~allen/F19/NOTES/slam_pka.pdf), Columbia University course slides.
- <i class="fab fa-youtube" aria-hidden="true"></i> [SLAM - 5 Minutes with Cyrill (SLAM frontend and backend overview)](https://www.youtube.com/watch?v=BuRCJ2fegcc).
- <i class="fab fa-youtube" aria-hidden="true"></i> [Introduction to SLAM from a Photogrammetric Perspective](https://www.youtube.com/watch?v=NW8hUcbjuIQ&list=PLgnQpQtFTOGQEXN2Qo571uvwIGNGAM8uf&index=26).
