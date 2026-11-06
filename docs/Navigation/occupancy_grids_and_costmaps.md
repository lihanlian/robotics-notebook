---
title: Occupancy Grids & Costmaps
parent: Navigation
nav_order: 1
---

# Occupancy Grids & Costmaps

Navigation needs a representation of where obstacles are and where the robot can travel. Occupancy grids describe the environment; costmaps turn that information into costs used for planning and control.

## Occupancy grids

An occupancy grid divides the environment into square cells. Each cell stores an estimate of whether it contains an obstacle, often interpreted as:

- **Free:** observed space without an obstacle.
- **Occupied:** space believed to contain an obstacle.
- **Unknown:** space without enough information to classify.

The grid's **resolution** specifies each cell's size in metres. Its **origin** places and orients the grid in a reference frame. Finer resolution preserves more detail but requires more memory and computation.

## Costmaps and clearance

A costmap assigns navigation costs to cells. These costs express obstacles and travel preferences rather than occupancy probabilities. Higher costs near obstacles encourage paths with more clearance.

The robot's **footprint** describes its shape on the ground for collision checking. **Inflation** adds costs around obstacles to encourage clearance; the robot must have room for its whole footprint, not just its centre point.

In Nav2, layers combine a saved map, current sensor observations, and inflation into a costmap.

## Global and local costmaps

- **Global costmap:** supports planning a route toward the goal across the wider environment.
- **Local costmap:** commonly moves with the robot and supports nearby obstacle avoidance and path following using recent observations.

## Resources

- [Nav2: Environmental Representation](https://docs.nav2.org/jazzy/getting_started/navigation_concepts/environmental_representation/)
- [Nav2: Costmap 2D](https://docs.nav2.org/jazzy/configuration_and_development/configuration_guide/core_servers/costmap_2d/)
