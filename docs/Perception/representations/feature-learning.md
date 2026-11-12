---
title: Feature Learning
parent: Visual Representations
grand_parent: Computer Vision
nav_order: 1
---

# Feature Learning
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Features and Backbones
{: #features-and-backbones }

Features encode useful properties of an image, such as local appearance or object structure. Classical descriptors use a designed computation; learned features come from a network fitted to data. A convolutional neural network (CNN) learns filters that combine local patterns into larger representations.

A backbone extracts features, while a prediction head converts them into outputs such as class scores. This separation allows the same pretrained backbone to support different tasks.

## ▪ Training Choices
{: #training-choices }

Supervised learning uses labeled targets. Self-supervised learning creates training signals from the data itself, for example by relating different views of an image. Pretraining learns a reusable representation; fine-tuning adapts network weights to a particular task.

## ▪ Using Pretrained Features
{: #using-pretrained-features }

A simple starting experiment freezes the backbone and trains a small classifier on its outputs. Compare this with fine-tuning, using held-out images to evaluate generalization. For geometric applications, connect features to the existing [matching and verification pipeline]({% link docs/SLAM/frontends/visual-features.md %}).

## ▪ References
{: #references }

- PyTorch. [Transfer Learning for Computer Vision](https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html).
- Oquab et al. [DINOv2: Learning Robust Visual Features without Supervision](https://arxiv.org/abs/2304.07193).
