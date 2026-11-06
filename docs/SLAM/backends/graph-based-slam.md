---
title: Graph-Based SLAM
parent: SLAM Backends
grand_parent: SLAM
nav_order: 3
---

# Graph-Based SLAM
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Variables and Constraints
{: #variables-and-constraints }

A pose graph represents robot poses as nodes and relative-pose measurements as edges. A more general factor graph can also include landmarks, velocities, or sensor biases, with factors expressing measurement relationships and prior information.

## ▪ Nonlinear Least Squares
{: #nonlinear-least-squares }

The backend adjusts the variables to reduce disagreement between predicted and measured quantities, weighted by measurement uncertainty. Nonlinear least squares is a common formulation. The graph describes the problem's structure; least squares describes an objective used to solve it.

## ▪ Loop-Closure Correction
{: #loop-closure-correction }

After the frontend verifies a revisit, the resulting constraint connects observations separated in time. Optimization can then correct accumulated trajectory error. Detecting the revisit and applying its correction are different parts of the system.

## ▪ References
{: #references }

- Grisetti et al. [A Tutorial on Graph-Based SLAM](https://mediawiki.isr.tecnico.ulisboa.pt/images/1/12/A_Tutorial_on_Graph-Based_SLAM.pdf).
- [GTSAM: Factor Graphs and GTSAM](https://gtsam.org/tutorials/intro.html).
