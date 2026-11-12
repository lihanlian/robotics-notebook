---
title: Segmentation Fundamentals
parent: Segmentation
grand_parent: Computer Vision
nav_order: 1
---

# Segmentation Fundamentals
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Segmentation Tasks
{: #segmentation-tasks }

- **Semantic segmentation:** assign a class to each pixel, without separating objects of the same class.
- **Instance segmentation:** produce a separate mask for each object instance.
- **Panoptic segmentation:** combine semantic classes with instance identities for countable objects, while also labeling regions such as roads or sky.

## ▪ Prompts and Masks
{: #prompts-and-masks }

A binary mask indicates which pixels belong to a selected region. Promptable segmentation uses inputs such as points or boxes to specify that region; a mask alone need not include a class label. [SAM 2]({% link docs/Perception/segmentation/sam2.md %}) and [SAM 3]({% link docs/Perception/segmentation/sam3.md %}) provide examples of different prompting interfaces.

## ▪ Evaluating Overlap
{: #evaluating-overlap }

For predicted foreground pixels $$A$$ and reference pixels $$B$$, two common measures are

$$
\operatorname{IoU}=\frac{|A\cap B|}{|A\cup B|},
\qquad
\operatorname{Dice}=\frac{2|A\cap B|}{|A|+|B|}.
$$

Both reach one for identical nonempty masks. Inspect boundaries and missed objects alongside aggregate scores; averaging can hide errors on small targets. Evaluation should also specify how empty masks are handled.

## ▪ References
{: #references }

- Kirillov et al. [Panoptic Segmentation](https://arxiv.org/abs/1801.00868).
- Kirillov et al. [Segment Anything](https://arxiv.org/abs/2304.02643).
