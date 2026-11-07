---
title: Home
layout: home
nav_order: 0
has_toc: false
---

# Robotics Notebook
{: .no_toc }

{{ site.description }}
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

This notebook collects concepts and practical notes on how robots perceive, move, learn, and interact with the world. It connects the foundations of robot motion with perception, navigation, manipulation, and robot learning.

The scope spans arm manipulation and mobile manipulation, including work with Stretch 3 and platform notes for Piper. Mathematical models and algorithms are connected to implementations, experiments, and project plans.

## ▪ Chapters and Topics
{: #chapters-and-topics }

- **Foundations:** [Kinematics]({% link docs/Kinematics/index.md %}), [Dynamics]({% link docs/Dynamics/index.md %}), and [Control]({% link docs/Control/index.md %}) describe robot motion, forces, and feedback.
- **Perception & Navigation:** [Computer Vision]({% link docs/Perception/index.md %}), [SLAM]({% link docs/SLAM/index.md %}), [Motion Planning]({% link docs/Motion_Planning/index.md %}), and [Navigation]({% link docs/Navigation/index.md %}) connect sensing and state estimation to movement through the environment.
- **Manipulation:** [Grasping]({% link docs/Grasping/index.md %}) and [Visual Servoing]({% link docs/Visual_Servoing/index.md %}) cover grasp selection and motion guided by visual feedback.
- **Robot Learning:** [Imitation Learning]({% link docs/Imitation_Learning/index.md %}), [Reinforcement Learning]({% link docs/Reinforcement_Learning/index.md %}), and [VLA]({% link docs/VLA/index.md %}) explore learning robot behavior from demonstrations, interaction, and visual and language inputs.
- **Practice:** [Stretch]({% link docs/Stretch/index.md %}) and [Piper]({% link docs/Piper/index.md %}) connect these concepts to robot platforms and practical projects.

## ▪ How to Use This Notebook
{: #how-to-use-this-notebook }

Start with the foundations needed for your task, then follow a chapter overview to its individual topics. Use the references in each topic for deeper explanations, and connect the methods to the robot projects in Practice. Cross-links show how ideas such as pose estimation, planning, and control are shared across applications.
