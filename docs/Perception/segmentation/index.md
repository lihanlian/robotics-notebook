---
title: Segmentation
parent: Computer Vision
nav_order: 4
has_toc: false
---

# Segmentation
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

Segmentation assigns image pixels to regions or objects. Its output is a mask describing a region's shape. Some methods assign semantic classes, others separate individual objects, and promptable models use a point, box, or description to specify the desired region.

## ▪ Topics
{: #topics }

- [Segmentation Fundamentals]({% link docs/Perception/segmentation/fundamentals.md %}): task definitions, masks, and overlap measures.
- [SAM 2]({% link docs/Perception/segmentation/sam2.md %}): visual prompts and mask propagation across video frames.
- [SAM 3]({% link docs/Perception/segmentation/sam3.md %}): text and exemplar prompts for matching object instances.

## ▪ Connection to Robotics
{: #connection-to-robotics }

A mask can select image measurements belonging to a target before estimating its geometry. It does not directly provide metric depth or a 3D grasp pose. Those require additional observations or models, as introduced in [Pose Estimation]({% link docs/Perception/pose_estimation.md %}).

## ▪ References
{: #references }

- Kirillov et al. [Panoptic Segmentation](https://arxiv.org/abs/1801.00868).
- Meta. [SAM 2 repository and examples](https://github.com/facebookresearch/sam2).
- Meta. [SAM 3: Segment Anything with Concepts](https://ai.meta.com/research/publications/sam-3-segment-anything-with-concepts/).
