---
title: SAM 2
parent: Segmentation
grand_parent: Computer Vision
nav_order: 2
---

# SAM 2
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Promptable Segmentation
{: #promptable-segmentation }

Segment Anything Model 2 (SAM 2) produces object masks in images and videos. Visual prompts such as foreground/background clicks, boxes, or masks identify the region of interest. Its output describes the selected object's extent rather than automatically assigning a semantic class to every pixel.

## ▪ Video Memory
{: #video-memory }

SAM 2 uses streaming memory to carry information about objects across frames. A user can prompt an object in one frame, propagate its masks through the video, and add corrective prompts where the prediction becomes inaccurate. The model also supports individual images, so the same basic prompting idea applies to both settings.

## ▪ Learning Experiment
{: #learning-experiment }

Start with one image and compare a click prompt with a box prompt. Then propagate one object's mask through a short video and inspect occlusion and boundary errors. Record which frames need correction. Compare this visually selected target with the concept-based selection introduced in [SAM 3]({% link docs/Perception/segmentation/sam3.md %}).

## ▪ References
{: #references }

- Ravi et al. [SAM 2: Segment Anything in Images and Videos](https://arxiv.org/abs/2408.00714).
- Meta. [SAM 2 repository and example notebooks](https://github.com/facebookresearch/sam2).
