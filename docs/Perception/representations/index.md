---
title: Visual Representations
parent: Computer Vision
nav_order: 2
has_toc: false
---

# Visual Representations
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

A visual representation describes an image or an image region using numerical features. These features can support recognition, correspondence matching, or a task-specific prediction head. An architecture specifies how features are computed; a training method determines what the network learns.

## ▪ Topics
{: #topics }

- [Feature Learning]({% link docs/Perception/representations/feature-learning.md %}): classical and learned features, backbones, and training choices.
- [Vision Transformers]({% link docs/Perception/representations/vision-transformers.md %}): image patches, tokens, and self-attention.
- [DINOv2]({% link docs/Perception/representations/dinov2.md %}): reusable visual features learned without manual labels.
- [DINOv3]({% link docs/Perception/representations/dinov3.md %}): dense representations and practical feature matching.

## ▪ Connection to Geometry
{: #connection-to-geometry }

Feature similarity can suggest correspondences, but geometric verification is still needed to reject inconsistent matches. The SLAM pages on [Visual Features and Tracking]({% link docs/SLAM/frontends/visual-features.md %}) and [RANSAC]({% link docs/SLAM/frontends/ransac.md %}) describe that connection.

## ▪ References
{: #references }

- PyTorch. [Transfer Learning for Computer Vision](https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html).
- Oquab et al. [DINOv2: Learning Robust Visual Features without Supervision](https://arxiv.org/abs/2304.07193).
