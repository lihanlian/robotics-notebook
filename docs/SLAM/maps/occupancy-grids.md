---
title: Occupancy Grids
parent: Maps and Mapping
grand_parent: SLAM
nav_order: 1
---

# Occupancy Grids
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Core Idea
{: #core-idea }

An occupancy grid divides space into cells and estimates whether each cell is occupied. A 2D grid describes a planar environment; a 3D representation uses volumes, often organized efficiently with an octree. Free space and occupied space are distinguished from areas that have not been observed.

Updates combine range observations with estimated sensor poses. Sensor uncertainty and pose errors affect the resulting map, so an occupancy grid is an estimate rather than a perfect floor plan.

## ▪ Mapping and Navigation
{: #mapping-and-navigation }

An existing grid can support [scan matching]({% link docs/SLAM/frontends/scan-matching.md %}), while new measurements extend or update the map.

A navigation costmap assigns costs for planning. It can use an occupancy map together with live obstacles and inflated costs around obstacles. These costs express navigation preferences and clearance, rather than simply the probability that a cell is occupied.

## ▪ References
{: #references }

- [OctoMap: Probabilistic 3D Occupancy Mapping](https://octomap.github.io/).
- [Nav2: Costmap 2D](https://docs.nav2.org/rolling/configuration_and_development/configuration_guide/core_servers/costmap_2d/).
