---
title: Landmark Maps
parent: Maps and Mapping
grand_parent: SLAM
nav_order: 2
---

# Landmark Maps
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Core Idea
{: #core-idea }

A landmark map stores selected, recognizable features of the environment. In feature-based visual SLAM, these are often 3D points observed in several images. A map point can have associated descriptors and observation records that help match it when the camera moves or returns later.

The map does not need to describe every visible surface. Its purpose is to provide reliable geometric references for estimating motion and recognizing known places.

## ▪ Landmarks in Visual SLAM
{: #landmarks-in-visual-slam }

The frontend associates image features with map points. Pose estimation seeks a camera pose whose projected map points agree with the observed image features. Bundle adjustment refines camera poses and landmark positions together by reducing reprojection errors.

[ORB-SLAM]({% link docs/SLAM/orb-slam.md %}) is a practical example. Its sparse landmark map supports tracking, relocalization, and loop closure; it does not directly label all surrounding space as free or occupied.

## ▪ References
{: #references }

- Mur-Artal, Montiel, and Tardós. [ORB-SLAM: A Versatile and Accurate Monocular SLAM System](https://arxiv.org/pdf/1502.00956).
