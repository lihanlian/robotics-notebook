---
title: Particle Filters
parent: SLAM Backends
grand_parent: SLAM
nav_order: 2
---

# Particle Filters
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Weighted Hypotheses
{: #weighted-hypotheses }

A particle filter approximates uncertainty with weighted samples. Each particle represents a possible state; its weight expresses how well that hypothesis agrees with the observations. Multiple clusters can represent competing explanations of the robot's location.

## ▪ Filtering Cycle
{: #filtering-cycle }

1. Propagate particles using the motion model and sampled noise.
2. Update their weights using the measurement likelihood.
3. Normalize the weights and resample when needed.

Resampling concentrates effort on plausible hypotheses, but can reduce diversity. The required particle count depends on uncertainty and state dimension.

## ▪ FastSLAM
{: #fastslam }

FastSLAM applies particle filtering to robot trajectories and estimates landmarks conditioned on each trajectory. Its original formulation combines trajectory particles with individual landmark EKFs. A particle filter that only localizes within an existing map does not, by itself, perform SLAM.

## ▪ References
{: #references }

- Montemerlo et al. [FastSLAM: A Factored Solution to the Simultaneous Localization and Mapping Problem](https://robots.stanford.edu/papers/montemerlo.fastslam-tr.pdf).
