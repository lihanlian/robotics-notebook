---
title: Loop-Closure Detection
parent: SLAM Frontends
grand_parent: SLAM
nav_order: 4
---

# Loop-Closure Detection
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

Loop-closure detection recognizes that the robot is observing a previously visited place. It supplies a connection between observations separated in time, allowing accumulated drift to be corrected. Similar appearance alone is insufficient: different places can contain repeated textures or geometry.

## ▪ Detection and Verification
{: #detection-and-verification }

1. Retrieve candidate places using image appearance or a scan representation.
2. Establish correspondences and check geometric consistency.
3. Estimate a relative transformation and provide the verified constraint to the backend.

For a visual example, [ORB-SLAM]({% link docs/SLAM/orb-slam.md %}) combines place recognition with geometric verification before correcting the map.

## ▪ Connection to Graph Optimization
{: #connection-to-graph-optimization }

Detection identifies the revisited place; correction uses its constraint to update estimates. In [Graph-Based SLAM]({% link docs/SLAM/backends/graph-based-slam.md %}), optimization distributes the correction across connected poses. A false loop closure can distort the trajectory, so verification is an essential part of the frontend.

## ▪ References
{: #references }

- Mur-Artal et al. [ORB-SLAM: a Versatile and Accurate Monocular SLAM System](https://arxiv.org/abs/1502.00956), 2015.
