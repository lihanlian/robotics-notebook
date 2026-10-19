---
title: Piper-ViT-VS
parent: Piper
permalink: /docs/Examples/piper-vit-vs.html
nav_order: 1
---

# Piper-ViT-VS

**Status: Planned.** This example will explore adapting ViT-VS to the Piper robot. ViT-VS uses pretrained vision-transformer features, including a DINOv2 option, for visual servoing.

**Reference implementation:** [ViT-VS on GitHub](https://github.com/AlessandroScherl/ViT-VS).

Planned scope:

- Review the reference implementation and identify the interfaces needed for Piper.
- Integrate the camera and robot interfaces, camera-to-tool calibration, and end-effector velocity commands.
- Evaluate visual convergence and robot tracking, documenting limitations and lessons learned.

Related foundations: [Visual Servoing]({% link docs/Visual_Servoing/index.md %}).
