---
title: DINOv2
parent: Visual Representations
grand_parent: Computer Vision
nav_order: 3
---

# DINOv2
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Core Idea
{: #core-idea }

DINOv2 learns reusable visual representations from images without manual training labels. Its pretrained Vision Transformer backbones provide image-level and patch-level features. These are numerical descriptions of appearance; converting them into class labels, depth, or segmentation requires an appropriate downstream method.

## ▪ Learning and Transfer
{: #learning-and-transfer }

The method combines teacher–student learning with image-level and patch-level objectives. Different augmented views provide related observations from which to learn. Curated training data and training stability are also central to the approach.

After pretraining, the backbone can remain frozen while a small task-specific head is trained. This separates the cost of learning general features from adapting them to a particular application.

## ▪ Feature Exploration
{: #feature-exploration }

Start by extracting features from two images and comparing patch similarities. Inspect both plausible matches and failures under viewpoint changes or repeated texture. Similar appearance alone does not establish a valid geometric correspondence; use [RANSAC]({% link docs/SLAM/frontends/ransac.md %}) where a suitable geometric model is available.

## ▪ References
{: #references }

- Oquab et al. [DINOv2: Learning Robust Visual Features without Supervision](https://arxiv.org/abs/2304.07193).
- Meta. [DINOv2 code and pretrained models](https://github.com/facebookresearch/dinov2).
