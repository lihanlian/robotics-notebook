---
title: Classification and Detection
parent: Recognition and Detection
grand_parent: Computer Vision
nav_order: 1
---

# Classification and Detection
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Outputs and Annotations
{: #outputs-and-annotations }

Classification assigns image-level labels, while detection predicts individual objects' locations and classes. Training a detector therefore requires annotations identifying both the object category and its bounding box. A confidence score expresses the model's prediction strength; it is not a guarantee that the prediction is correct.

## ▪ Evaluation
{: #evaluation }

Intersection over Union (IoU) measures the overlap between a predicted box and a reference box. Detection evaluation matches predictions to annotations using class and overlap requirements. Precision measures how many reported detections are correct; recall measures how many annotated objects are found.

Average precision summarizes the precision–recall relationship as the confidence threshold varies. Report the overlap thresholds and class-averaging convention alongside the score.

## ▪ Learning Experiment
{: #learning-experiment }

Run a pretrained detector on a small labeled image set. Vary the confidence threshold and inspect false positives and missed objects. Keep evaluation images separate from training data. [YOLO]({% link docs/Perception/detection/yolo.md %}) provides a practical model family for this exercise.

## ▪ References
{: #references }

- Ultralytics. [Object Detection](https://docs.ultralytics.com/tasks/detect/).
- Lin et al. [Microsoft COCO: Common Objects in Context](https://arxiv.org/abs/1405.0312).
