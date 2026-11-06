---
title: Motion Planning
nav_order: 6
nav_group: perception_navigation
has_toc: false
---

# Motion Planning
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

Motion planning searches for a collision-free path or trajectory that connects a robot's start state to a goal while respecting specified constraints. These methods apply to mobile robots, robot arms, and mobile manipulators.

- **Configuration:** a description of the robot's pose or joint positions.
- **Path:** a geometric sequence of configurations connecting the start and goal.
- **Trajectory:** a motion described over time, including its timing and associated velocities.

A planning problem also specifies obstacles, allowed motions, and an objective, such as reducing path length or increasing clearance.

## ▪ Components and Topics
{: #components-and-topics }

- [A*]({% link docs/Motion_Planning/a_star.md %}) searches a graph or grid using the cost accumulated so far and an estimate of the remaining cost.
- [RRT]({% link docs/Motion_Planning/rrt.md %}) explores configuration space by growing a tree toward sampled configurations.
- [PRM]({% link docs/Motion_Planning/prm.md %}) builds a roadmap of collision-free configurations that can support multiple planning queries.
- [CHOMP]({% link docs/Motion_Planning/chomp.md %}) optimizes an initial trajectory using smoothness and obstacle costs.

These approaches can work together: graph search can find a route through a PRM roadmap, and a sampling-based planner can supply an initial path for trajectory optimization.

## ▪ Related Foundations
{: #related-foundations }

- Configuration spaces, robot geometry, and joint limits.
- Collision checking, robot footprints, and obstacle clearance.
- Graphs, edge costs, heuristics, and search.
- Kinematic and dynamic constraints, path smoothing, and time parameterization.

The [Navigation]({% link docs/Navigation/index.md %}) chapter combines planning with pose and map estimates from [SLAM]({% link docs/SLAM/index.md %}) and path execution using [Control]({% link docs/Control/index.md %}).

## ▪ References
{: #references }

- Steven M. LaValle, [Planning Algorithms](https://lavalle.pl/planning/), especially Chapters 2, 4, and 5.
- [MoveIt: Motion Planning](https://moveit.picknik.ai/main/doc/concepts/motion_planning.html).
- [MoveIt: Using CHOMP Planner](https://moveit.picknik.ai/main/doc/how_to_guides/chomp_planner/chomp_planner_tutorial.html).
