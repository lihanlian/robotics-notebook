---
title: SAM 3
parent: Segmentation
grand_parent: Computer Vision
nav_order: 3
---

# SAM 3
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Concept Prompts
{: #concept-prompts }

Segment Anything Model 3 (SAM 3) detects, segments, and tracks objects using concept prompts: short text descriptions, image exemplars, or both. A description such as “red cup” specifies a concept whose matching instances should receive separate masks and identities in an image or video.

## ▪ Relationship to SAM 2
{: #relationship-to-sam-2 }

[SAM 2]({% link docs/Perception/segmentation/sam2.md %}) selects targets through visual prompts and propagates their masks. SAM 3 adds the ability to search for instances matching a concept, while retaining interactive visual prompting. Its image detector and video tracker share a backbone; detection identifies matching instances and video memory helps maintain them over time.

## ▪ Learning Experiment
{: #learning-experiment }

Compare a text prompt with an exemplar on an image containing several similar objects. Inspect missed instances, incorrect matches, and mask boundaries separately. Repeat with a more specific description to see how the requested concept affects the result. A predicted mask still needs depth or geometric information before it can support a 3D manipulation target.

## ▪ References
{: #references }

- Carion et al. [SAM 3: Segment Anything with Concepts](https://ai.meta.com/research/publications/sam-3-segment-anything-with-concepts/).
- Meta. [SAM 3 repository and examples](https://github.com/facebookresearch/sam3).
