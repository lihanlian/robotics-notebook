---
title: Point Clouds and Surface Maps
parent: Maps and Mapping
grand_parent: SLAM
nav_order: 3
---

# Point Clouds and Surface Maps
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Point Clouds
{: #point-clouds }

A point cloud stores sampled 3D positions, optionally with attributes such as color or surface normals. Lidar and depth cameras provide measurements that can be transformed into a shared frame using estimated sensor poses.

[Scan matching]({% link docs/SLAM/frontends/scan-matching.md %}) aligns overlapping observations. Filtering and downsampling reduce noise and storage requirements. Incorrect poses can produce doubled surfaces or blurred geometry when observations are combined.

## ▪ Surface Reconstruction
{: #surface-reconstruction }

Surface models describe structure between samples, for example using triangle meshes. Another approach integrates depth images into a truncated signed distance field (TSDF), from which a surface mesh can be extracted.

These representations are useful for visualization and geometric queries. A plain point cloud records observed samples; the absence of a point does not establish that an area is free. [Occupancy Grids]({% link docs/SLAM/maps/occupancy-grids.md %}) explicitly address occupied, free, and unknown space.

## ▪ References
{: #references }

- [Open3D: Point Cloud](https://www.open3d.org/docs/release/tutorial/geometry/pointcloud.html).
- [Open3D: Integrate Scene](https://www.open3d.org/docs/release/tutorial/reconstruction_system/integrate_scene.html).
- [OctoMap: Probabilistic 3D Occupancy Mapping](https://octomap.github.io/).
