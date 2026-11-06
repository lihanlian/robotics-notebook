---
title: SLAM Frontends
parent: SLAM
nav_order: 1
has_toc: false
---

# SLAM Frontends
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

A SLAM frontend turns sensor observations into correspondences, motion estimates, and measurement constraints. Its design depends on the sensor: a camera provides images, while lidar provides range measurements. Data association identifies observations of the same physical features or places.

## ▪ Topics
{: #topics }

- [Visual Features and Tracking]({% link docs/SLAM/frontends/visual-features.md %}): detect, describe, match, and follow image features.
- [RANSAC]({% link docs/SLAM/frontends/ransac.md %}): estimate geometric models despite incorrect correspondences.
- [Scan Matching]({% link docs/SLAM/frontends/scan-matching.md %}): align lidar scans or register a scan against a map.
- [Loop-Closure Detection]({% link docs/SLAM/frontends/loop-closure.md %}): recognize and verify revisited places.

## ▪ Connection to the Backend
{: #connection-to-the-backend }

The [backend]({% link docs/SLAM/backends/index.md %}) combines these constraints to estimate states. This interaction includes feedback: estimated poses and maps can guide subsequent matching. Frontends may themselves estimate local motion; the distinction describes their role in the overall system.

## ▪ References
{: #references }

- Cadena et al. [Past, Present, and Future of Simultaneous Localization and Mapping](https://arxiv.org/abs/1606.05830), 2016.
