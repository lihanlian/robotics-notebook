---
title: Recognition and Detection
parent: Computer Vision
nav_order: 3
has_toc: false
---

# Recognition and Detection
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

Image classification predicts a label for an image. Object detection also locates individual objects, usually with bounding boxes, class labels, and confidence scores. The distinction determines the annotations required and how predictions are evaluated.

## ▪ Topics
{: #topics }

- [Classification and Detection]({% link docs/Perception/detection/classification-and-detection.md %}): task outputs, annotations, overlap, precision, and recall.
- [YOLO]({% link docs/Perception/detection/yolo.md %}): a family of models for efficient detection, inference, and custom-data training.

## ▪ Connection to Other Tasks
{: #connection-to-other-tasks }

A detector can use a learned [visual representation]({% link docs/Perception/representations/index.md %}) and a task-specific prediction head. A bounding box identifies an image region, but does not describe its exact shape or 3D pose. [Segmentation]({% link docs/Perception/segmentation/index.md %}) and [Pose Estimation]({% link docs/Perception/pose_estimation.md %}) address those further requirements. These tasks can form successive steps in a robotic perception pipeline.

## ▪ References
{: #references }

- Ultralytics. [Image Classification](https://docs.ultralytics.com/tasks/classify/).
- Ultralytics. [Object Detection](https://docs.ultralytics.com/tasks/detect/).
