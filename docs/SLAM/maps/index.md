---
title: Maps and Mapping
parent: SLAM
nav_order: 3
has_toc: false
---

# Maps and Mapping
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

A map represents selected properties of the environment. Its representation determines what the robot can store, query, and use for later tasks. Mapping combines sensor observations with estimated sensor poses to place those observations in a shared coordinate frame.

Map representation is a separate choice from the [SLAM backend]({% link docs/SLAM/backends/index.md %}). A system may maintain several representations, such as sparse landmarks for localization and an occupancy grid for navigation. Maps can also help the frontend associate new observations with previously seen structure.

## ▪ Representations
{: #representations }

- [Occupancy Grids]({% link docs/SLAM/maps/occupancy-grids.md %}): probabilities of occupied space, with free and unknown regions.
- [Landmark Maps]({% link docs/SLAM/maps/landmark-maps.md %}): identifiable features used for localization and geometric estimation.
- [Point Clouds and Surface Maps]({% link docs/SLAM/maps/point-clouds.md %}): sampled geometry and reconstructed surfaces.

## ▪ References
{: #references }

- Cadena et al. [Past, Present, and Future of Simultaneous Localization and Mapping](https://arxiv.org/abs/1606.05830). See the discussion of metric map representations.
- [Nav2: Environmental Representation](https://docs.nav2.org/jazzy/getting_started/navigation_concepts/environmental_representation/). Overview of environmental representations, layered costmaps, and their use in navigation.
