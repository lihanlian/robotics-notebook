---
title: Vision Transformers
parent: Visual Representations
grand_parent: Computer Vision
nav_order: 2
---

# Vision Transformers
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Image Patches and Tokens
{: #image-patches-and-tokens }

A Vision Transformer (ViT) divides an image into patches and maps each patch to a feature vector, or token. Positional embeddings preserve information about where patches occur. The original ViT also introduces a class token whose final representation supports image classification.

## ▪ Self-Attention
{: #self-attention }

Self-attention lets each token combine information from other tokens. Transformer blocks alternate attention and feed-forward processing to refine the representations. Patch size and image resolution determine the number of tokens and influence computation and spatial detail.

## ▪ Architecture and Training
{: #architecture-and-training }

ViT describes a network architecture, rather than a single training objective or vision task. A classifier can use a global representation, while other methods use the patch features. [DINOv2]({% link docs/Perception/representations/dinov2.md %}) provides an example of training ViT backbones through self-supervision. A useful first exercise is to trace the tensor shapes from image patches to final features.

## ▪ References
{: #references }

- Dosovitskiy et al. [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929).
- Google Research. [Vision Transformer implementation](https://github.com/google-research/vision_transformer).
