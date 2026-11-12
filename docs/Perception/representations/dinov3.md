---
title: DINOv3
parent: Visual Representations
grand_parent: Computer Vision
nav_order: 4
---

# DINOv3
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Core Idea
{: #core-idea }

DINOv3 continues the DINO family's self-supervised representation learning, following [DINOv2]({% link docs/Perception/representations/dinov2.md %}). Its features support several downstream tasks, including image recognition and dense correspondence matching. A pretrained encoder supplies representations; the surrounding method determines how they become task outputs.

## ▪ Dense Feature Quality
{: #dense-feature-quality }

Alongside larger-scale data and training, DINOv3 introduces Gram anchoring to address degradation of dense features during extended training. This matters when spatially detailed patch representations are needed, rather than only a single descriptor for the entire image.

Study these changes after understanding the shared teacher–student framework and the distinction between image-level and patch-level features.

## ▪ Practical Comparison
{: #practical-comparison }

Compare DINOv2 and DINOv3 on the same images and correspondence task. Inspect similarity maps, match consistency, memory use, and inference time. Record model size and input resolution so the comparison is meaningful. The official repository includes matching examples that can serve as a starting point.

## ▪ References
{: #references }

- Siméoni et al. [DINOv3](https://arxiv.org/abs/2508.10104).
- Meta. [DINOv3 code, pretrained models, and examples](https://github.com/facebookresearch/dinov3).
