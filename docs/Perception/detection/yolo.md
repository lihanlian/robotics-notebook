---
title: YOLO
parent: Recognition and Detection
grand_parent: Computer Vision
nav_order: 2
---

# YOLO
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Core Idea
{: #core-idea }

YOLO, short for “You Only Look Once,” introduced a unified approach that predicts object boxes and classes directly from an image. The name now covers multiple model generations and implementations. A detection model returns boxes, class labels, and confidence scores; other task variants can produce masks or keypoints.

## ▪ Inference Pipeline
{: #inference-pipeline }

Resize and normalize the input as required by the selected model, run inference, and map the output coordinates back to the original image. Follow that model's post-processing rules: many detectors use non-maximum suppression to remove overlapping predictions, while some newer YOLO variants provide an end-to-end alternative.

## ▪ Training and Evaluation
{: #training-and-evaluation }

Begin with pretrained weights before training on custom box annotations. Record the implementation, checkpoint, input resolution, and inference hardware when comparing accuracy and latency. Inspect failures on small or occluded objects, and use held-out images for evaluation. The [detection fundamentals]({% link docs/Perception/detection/classification-and-detection.md %}) page explains the relevant output and metric definitions.

## ▪ References
{: #references }

- Redmon et al. [You Only Look Once: Unified, Real-Time Object Detection](https://arxiv.org/abs/1506.02640).
- Ultralytics. [YOLO documentation](https://docs.ultralytics.com/).
