---
title: SLAM Backends
parent: SLAM
nav_order: 2
has_toc: false
---

# SLAM Backends
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ State Estimation
{: #state-estimation }

The backend combines motion models and observations from the frontend to estimate robot states and, where included in the formulation, map variables. Uncertainty determines how strongly each observation influences the estimate.

Filtering updates a maintained estimate as measurements arrive. Smoothing revisits multiple states along a trajectory, allowing later observations to refine earlier poses. These are estimation choices, independent of whether the main sensor is a camera or lidar.

## ▪ Methods
{: #methods }

- [Extended Kalman Filter]({% link docs/SLAM/backends/ekf.md %}): a Gaussian estimate and local linearization.
- [Particle Filters]({% link docs/SLAM/backends/particle-filters.md %}): weighted hypotheses and resampling.
- [Graph-Based SLAM]({% link docs/SLAM/backends/graph-based-slam.md %}): measurement constraints and optimization.

These pages introduce representative approaches. A complete system may combine them.

## ▪ References
{: #references }

- Cadena et al. [Past, Present, and Future of Simultaneous Localization and Mapping](https://arxiv.org/abs/1606.05830).
- <i class="fab fa-youtube" aria-hidden="true"></i> [SLAM frontend and backend overview (YouTube)](https://www.youtube.com/watch?v=BuRCJ2fegcc).
