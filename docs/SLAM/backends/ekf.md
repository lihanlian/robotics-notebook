---
title: Extended Kalman Filter
parent: SLAM Backends
grand_parent: SLAM
nav_order: 1
---

# Extended Kalman Filter
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Kalman Filter and EKF
{: #kalman-filter-and-ekf }

The Kalman filter estimates a state using a mean and covariance. Its standard formulation uses linear models with Gaussian noise. The extended Kalman filter (EKF) handles nonlinear motion and measurement models by linearizing them around the current estimate using Jacobians.

## ▪ Prediction and Correction
{: #prediction-and-correction }

1. Predict the state and uncertainty from the motion model.
2. Predict the sensor observation from that state.
3. Use the difference between predicted and measured observations to correct the estimate.

## ▪ EKF-SLAM
{: #ekf-slam }

In EKF-SLAM, the state includes the robot pose and landmark positions. Their covariance captures correlations: uncertainty in the robot pose affects the inferred map. A single Gaussian cannot represent several widely separated location hypotheses, and maintaining correlations becomes expensive as the map grows.

## ▪ References
{: #references }

- [SLAM Tutorial](https://www.cs.columbia.edu/~allen/F19/NOTES/slam_pka.pdf), Columbia University course slides.
