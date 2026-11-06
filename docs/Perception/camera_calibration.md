---
title: Camera Calibration
layout: default
parent: Computer Vision
nav_order: 2
---

# Camera Calibration
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

This page continues the [Pinhole Camera Model]({{ '/docs/Perception/pinhole_camera_model.html' | relative_url }}). Let $$P_c=[X,Y,Z]^T$$ be a point in the camera frame and $$P_w=[X_w,Y_w,Z_w,1]^T$$ its homogeneous world-frame representation, with $$R,t$$ mapping world coordinates to camera coordinates. The equations below use the ideal pinhole model with zero skew and omit lens distortion; $$(u,v)$$ are pixel coordinates in the final digital image.

## ▪ Calibrated mapping and coordinate conventions
{: #calibrated-mapping-and-coordinate-conventions }

Calibration defines a mapping for a chosen coordinate convention.

It does not mean:

> The software changes the real image into the virtual image.

It means:

The camera system provides a calibrated mathematical relationship:

$$
(X,Y,Z)\rightarrow(u,v)
$$

that already uses a chosen coordinate convention.

The calibration gives you:

$$
K=
\begin{bmatrix}
f_x & 0 & c_x \\
0 & f_y & c_y \\
0 & 0 & 1
\end{bmatrix}
$$

and the projection model:

$$
u=f_x\frac{X}{Z}+c_x
$$

$$
v=f_y\frac{Y}{Z}+c_y
$$

This is the “calibrated mapping.”

### Camera parameter calibration

Suppose a chessboard with known corner positions defines the world frame. Photograph it from multiple positions and orientations. Calibration estimates a shared $$K$$ and separate $$R,t$$ for each image; the equations below describe one view.

You know its real 3D points:

$$
P_w
$$

You detect their image locations:

$$
(u,v)
$$

The calibration algorithm finds:

$$
K,R,t
$$

such that:

$$
Z
\begin{bmatrix}
u \\
v \\
1
\end{bmatrix}
=
K
\begin{bmatrix}
R \mid t
\end{bmatrix}
\begin{bmatrix}
X_w \\
Y_w \\
Z_w \\
1
\end{bmatrix}
$$

The camera does not tell you:

> “The physical image plane is virtual.”

Instead, calibration says:

> “Given this pixel coordinate system, this $$K$$ makes the projection equations correct.”

## ▪ References
{: #references }

- OpenCV. [Camera Calibration and 3D Reconstruction](https://docs.opencv.org/4.13.0/d9/d0c/group__calib3d.html). *OpenCV 4.13.0 documentation*.
