---
title: Scan Matching
parent: SLAM Frontends
grand_parent: SLAM
nav_order: 3
---

# Scan Matching
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

Scan matching estimates a rigid transformation that aligns overlapping range observations. The reference may be another scan or an existing map. The resulting motion estimate can supply a constraint to the [SLAM backend]({% link docs/SLAM/backends/index.md %}).

## ▪ Common Methods
{: #common-methods }

- **Iterative Closest Point (ICP):** repeatedly associates points and updates the transformation to reduce alignment error. Common variants minimize point-to-point or point-to-plane distances.
- **Normal Distributions Transform (NDT):** represents the reference cloud using local statistical distributions and optimizes how well transformed observations agree with those distributions.

## ▪ Practical Considerations
{: #practical-considerations }

Both methods depend on overlap and scene geometry. An initial estimate from odometry or another motion model helps the optimizer find a useful alignment. Repeated structures, moving objects, and weak geometric constraints can produce misleading matches; numerical convergence alone does not establish that the estimated pose is correct.

## ▪ References
{: #references }

- Point Cloud Library. [How to use Iterative Closest Point](https://pointclouds.org/documentation/tutorials/iterative_closest_point.html).
- Point Cloud Library. [How to use Normal Distributions Transform](https://pointclouds.org/documentation/tutorials/normal_distributions_transform.html).
