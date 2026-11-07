---
title: IBVS
parent: Visual Servoing
nav_order: 1
---

# IBVS
{: .no_toc }

Image-Based Visual Servoing (IBVS) uses image-space features directly in the feedback loop. This page derives the interaction matrix relating camera velocity to the motion of a point feature.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Coordinate frames and notation
{: #coordinate-frames-and-notation }

<figure style="margin: 1.5rem auto; width: 80%; text-align: center;">
  <img src="{{ '/assets/images/perception/pinhole-camera/image.png' | relative_url }}" alt="World and camera coordinate frames" style="display: block; width: 100%; height: auto;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">Coordinate illustration.</figcaption>
</figure>

Let $$P_w$$ be a fixed point in **world coordinates** and $$C_w$$ the camera center in the **same frame**. The rotation $$R_{cw}$$ converts world-frame vectors into camera coordinates, so the point in the camera frame is

$$
\boxed{P_c=R_{cw}(P_w-C_w)},
\qquad
P_c=\begin{bmatrix}X & Y & Z\end{bmatrix}^{T}.
$$

Perspective projection uses these camera-relative coordinates: $$X$$ and $$Y$$ describe transverse displacement, and $$Z$$ is depth along the optical axis. **World coordinates alone do not determine the image location; the camera pose is also required.**

Write the camera twist as

$$
\boldsymbol{\nu}_c
=\begin{bmatrix}
v_x & v_y & v_z & \omega_x & \omega_y & \omega_z
\end{bmatrix}^{T}.
$$

Its first three components form the camera-center velocity $$\mathbf{v}_c$$, and the last three form the camera angular velocity $$\boldsymbol{\omega}_c$$. Both are expressed in the **camera frame**. The symbol $$\boldsymbol{\nu}_c$$ distinguishes this six-dimensional velocity from the vertical **pixel coordinate** $$v$$.

## ▪ Camera-frame point motion
{: #camera-frame-point-motion }

Although the scene point is stationary, its camera-frame coordinates change as the camera moves. Differentiate $$P_c=R_{cw}(P_w-C_w)$$ with $$\dot P_w=0$$:

$$
\dot P_c
=\dot R_{cw}(P_w-C_w)-R_{cw}\dot C_w.
$$

The camera translational velocity and rotation derivative satisfy

$$
\boxed{\mathbf{v}_c=R_{cw}\dot C_w},
\qquad
\boxed{\dot R_{cw}=-[\boldsymbol{\omega}_c]_\times R_{cw}},
$$

where the skew-symmetric matrix represents the cross product:

$$
[\boldsymbol{\omega}_c]_\times
=\begin{bmatrix}
0 & -\omega_z & \omega_y \\
\omega_z & 0 & -\omega_x \\
-\omega_y & \omega_x & 0
\end{bmatrix},
\qquad
[\boldsymbol{\omega}_c]_\times P_c
=\boldsymbol{\omega}_c\times P_c.
$$

Substituting gives

$$
\begin{aligned}
\dot P_c
&=-[\boldsymbol{\omega}_c]_\times R_{cw}(P_w-C_w)-\mathbf{v}_c \\
&=-[\boldsymbol{\omega}_c]_\times P_c-\mathbf{v}_c.
\end{aligned}
$$

Matrix multiplication is associative, so $$R_{cw}(P_w-C_w)$$ can be evaluated first; the multiplication order remains unchanged.

Therefore,

$$
\boxed{\dot P_c=-\mathbf{v}_c-\boldsymbol{\omega}_c\times P_c}.
$$

The negative signs describe a fixed world point observed from a moving camera:

- If the camera translates right, the fixed point appears to move left.
- If the camera rotates in one direction, the scene appears to rotate in the opposite direction.

In components, the same equation is

$$
\boxed{
\begin{aligned}
\dot X&=-v_x-\omega_yZ+\omega_zY, \\
\dot Y&=-v_y-\omega_zX+\omega_xZ, \\
\dot Z&=-v_z-\omega_xY+\omega_yX.
\end{aligned}
}
$$

## ▪ Perspective projection and image velocity
{: #perspective-projection-and-image-velocity }

The normalized image coordinates are

$$
x=\frac{X}{Z},\qquad y=\frac{Y}{Z},\qquad
s=\begin{bmatrix}x & y\end{bmatrix}^{T}.
$$

They describe projection onto a virtual image plane at unit distance from the camera center, **with focal-length scaling removed**.

### Horizontal image velocity
{: #horizontal-image-velocity }

Apply the quotient rule and use $$X=xZ$$:

$$
\dot x=\frac{\dot XZ-X\dot Z}{Z^2}
=\frac{\dot X-x\dot Z}{Z}.
$$

Substitute the camera-frame point velocities:

$$
\begin{aligned}
\dot x
&=\frac{-v_x-\omega_yZ+\omega_zY-x(-v_z-\omega_xY+\omega_yX)}{Z} \\[4pt]
&=\frac{-v_x+xv_z}{Z}-\omega_y+\omega_z\frac{Y}{Z}
+x\omega_x\frac{Y}{Z}-x\omega_y\frac{X}{Z}.
\end{aligned}
$$

Using $$X/Z=x$$ and $$Y/Z=y$$ gives

$$
\boxed{
\dot x=-\frac{v_x}{Z}+\frac{xv_z}{Z}
+xy\omega_x-(1+x^2)\omega_y+y\omega_z
}.
$$

There is no $$v_y$$ term because pure translation along the camera $$y$$-axis does not change $$X/Z$$.

### Vertical image velocity
{: #vertical-image-velocity }

Similarly, with $$Y=yZ$$,

$$
\dot y=\frac{\dot YZ-Y\dot Z}{Z^2}
=\frac{\dot Y-y\dot Z}{Z}.
$$

Substitution gives

$$
\begin{aligned}
\dot y
&=\frac{-v_y-\omega_zX+\omega_xZ-y(-v_z-\omega_xY+\omega_yX)}{Z} \\[4pt]
&=\frac{-v_y+yv_z}{Z}-\omega_z\frac{X}{Z}+\omega_x
+y\omega_x\frac{Y}{Z}-y\omega_y\frac{X}{Z}.
\end{aligned}
$$

Using the normalized coordinates gives

$$
\boxed{
\dot y=-\frac{v_y}{Z}+\frac{yv_z}{Z}
+(1+y^2)\omega_x-xy\omega_y-x\omega_z
}.
$$

## ▪ Point-feature interaction matrix
{: #point-feature-interaction-matrix }

Collect the coefficients in the camera-twist order defined above:

$$
\dot s
=\begin{bmatrix}\dot x \\ \dot y\end{bmatrix}
=L_s\boldsymbol{\nu}_c,
$$

with

$$
\boxed{
L_s=
\begin{bmatrix}
-\dfrac{1}{Z} & 0 & \dfrac{x}{Z} & xy & -(1+x^2) & y \\[6pt]
0 & -\dfrac{1}{Z} & \dfrac{y}{Z} & 1+y^2 & -xy & -x
\end{bmatrix}
}.
$$

This $$2\times6$$ interaction matrix, also called the image Jacobian, maps camera velocity to the velocity of one normalized point feature. Its first three columns describe translation and depend on depth $$Z$$; its last three describe rotation.

## ▪ Pixel-coordinate interaction matrix
{: #pixel-coordinate-interaction-matrix }

For fixed camera intrinsics and zero skew, the pixel feature is

$$
s_p=\begin{bmatrix}u \\ v\end{bmatrix}
=\begin{bmatrix}f_xx+c_x \\ f_yy+c_y\end{bmatrix},
$$

where $$f_x,f_y$$ are focal lengths in pixels and $$(c_x,c_y)$$ is the principal point. Differentiating gives

$$
\dot u=f_x\dot x,\qquad \dot v=f_y\dot y.
$$

Consequently,

$$
\dot s_p
=\begin{bmatrix}f_x & 0 \\ 0 & f_y\end{bmatrix}\dot s
=\underbrace{\begin{bmatrix}f_x & 0 \\ 0 & f_y\end{bmatrix}L_s}_{L_{\mathrm{pixel}}}
\boldsymbol{\nu}_c.
$$

Thus, multiplying the normalized matrix's rows by $$f_x$$ and $$f_y$$ converts image velocity to pixels per second. The $$x,y$$ entries in $$L_s$$ remain normalized coordinates: $$x=(u-c_x)/f_x$$ and $$y=(v-c_y)/f_y$$.

With nonzero intrinsic skew $$\gamma$$, the horizontal pixel coordinate is $$u=f_xx+\gamma y+c_x$$ and the multiplier becomes

$$
L_{\mathrm{pixel}}
=\begin{bmatrix}f_x & \gamma \\ 0 & f_y\end{bmatrix}L_s.
$$

## ▪ References
{: #references }

- François Chaumette and Seth Hutchinson. [Visual Servo Control, Part I: Basic Approaches](https://web.mit.edu/amcp/OldFiles/drg/Chaumette_Part_I.pdf). *IEEE Robotics & Automation Magazine*, 2006.
- <i class="fab fa-youtube" aria-hidden="true"></i> [Image-Based Visual Servoing - Robot Control Part 1](https://www.youtube.com/watch?v=s_0DdxHjrfA&t=22s).
- <i class="fab fa-youtube" aria-hidden="true"></i> [Image-Based Visual Servoing - Robot Control Part 2](https://www.youtube.com/watch?v=XDE6oxEJn3c&list=PLjoIYgWzjQHK8G2O56jsu56dmjWiipguv&index=61).
