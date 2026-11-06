---
title: Visual Servoing
nav_order: 9
nav_group: manipulation
---

# Visual Servoing
{: .no_toc }

This section covers vision-based robot control methods.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Point coordinates and reference frames
{: #point-coordinates-and-reference-frames }

<figure style="margin: 1.5rem auto; width: 80%; text-align: center;">
  <img src="{{ '/assets/images/perception/pinhole-camera/image.png' | relative_url }}" alt="World and camera coordinate frames" style="display: block; width: 100%; height: auto;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">Coordinate illustration.</figcaption>
</figure>

Suppose a physical point is fixed in the world. Its coordinates in the world frame are

$$
P_w =
\begin{bmatrix}
X_w \\
Y_w \\
Z_w
\end{bmatrix}.
$$

Let the camera have center $$C_w$$, expressed in world coordinates, and orientation $$R_{cw}$$, which rotates a vector from the world frame into the camera frame. The same physical point expressed in the camera frame is

$$
\boxed{P_c = R_{cw}(P_w - C_w)}.
$$

Write

$$
P_c =
\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix}.
$$

Therefore:

- $$P_w$$ is the point expressed in the world frame;

- $$P_c$$ is the same physical point expressed in the camera frame;

- the interaction-matrix derivation uses $$P_c$$, because perspective projection depends on camera-relative coordinates.

The pinhole projection

$$
x = \frac{X}{Z},
\qquad
y = \frac{Y}{Z}
$$

must use camera-frame coordinates, because $$Z$$ is depth along the camera optical axis.

## ▪ Camera-frame coordinates for perspective projection
{: #camera-frame-coordinates-for-perspective-projection }

An image depends on where the point lies relative to the camera, not where it lies relative to an arbitrary world origin. Knowing only

$$
P_w =
\begin{bmatrix}
10 \\
3 \\
2
\end{bmatrix}
$$

does not determine the pixel location. The camera pose is also required.

After transforming the point into the camera frame,

$$
P_c =
\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix},
$$

the coordinates have direct image-formation meanings:

- $$X$$: horizontal displacement relative to the camera;

- $$Y$$: vertical displacement relative to the camera;

- $$Z$$: depth along the optical axis.

Only then can the normalized projection be formed:

$$
x = \frac{X}{Z},
\qquad
y = \frac{Y}{Z}.
$$

## ▪ Derivation of the point-motion equation
{: #derivation-of-the-point-motion-equation }

Start from

$$
P_c = R_{cw}(P_w - C_w).
$$

Assume that the scene point is fixed in the world:

$$
\dot{P}_w = 0.
$$

Differentiate:

$$
\dot{P}_c
=
\dot{R}_{cw}(P_w-C_w)
-
R_{cw}\dot{C}_w.
$$

Define the camera translational velocity expressed in the camera frame as

$$
\mathbf{v}_c = R_{cw}\dot{C}_w.
$$

For a rotating camera frame,

$$
\dot{R}_{cw}
=
-[\omega_c]_\times R_{cw},
$$

where

$$
[\omega_c]_\times
=
\begin{bmatrix}
0 & -\omega_z & \omega_y \\
\omega_z & 0 & -\omega_x \\
-\omega_y & \omega_x & 0
\end{bmatrix}
$$

is the skew-symmetric matrix representing the cross product.

Because

$$
R_{cw}(P_w-C_w)=P_c,
$$

we obtain

$$
\dot{P}_c
=
-[\omega_c]_\times P_c
-
\mathbf{v}_c.
$$

Since

$$
[\omega_c]_\times P_c
=
\omega_c \times P_c,
$$

the point-motion equation becomes

$$
\boxed{
\dot{P}_c
=
-\mathbf{v}_c
-
\omega_c \times P_c
}.
$$

Thus, the ambiguous $$P$$ on the lecture slide means

$$
\boxed{
P = P_c = [X,Y,Z]^T
}.
$$

Specifically:

$$
\omega_c \times P_c
$$

where

$$
\omega_c =
\begin{bmatrix}
\omega_x \\
\omega_y \\
\omega_z
\end{bmatrix}
$$

is the camera angular velocity, and

$$
P_c =
\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix}
$$

is the point position in the camera frame.

The skew-symmetric matrix is simply a matrix representation of the cross product.

Instead of writing:

$$
\omega_c \times P_c,
$$

we write:

$$
[\omega_c]_\times P_c,
$$

where

$$
[\omega_c]_\times
=
\begin{bmatrix}
0 & -\omega_z & \omega_y \\
\omega_z & 0 & -\omega_x \\
-\omega_y & \omega_x & 0
\end{bmatrix},
$$

because:

$$
[\omega_c]_\times P_c
=
\omega_c \times P_c.
$$

Let's verify:

$$
\begin{bmatrix}
0 & -\omega_z & \omega_y \\
\omega_z & 0 & -\omega_x \\
-\omega_y & \omega_x & 0
\end{bmatrix}
\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix}.
$$

This gives:

First row:

$$
-\omega_zY+\omega_yZ,
$$

which is:

$$
\omega_yZ-\omega_zY.
$$

Second row:

$$
\omega_zX-\omega_xZ.
$$

Third row:

$$
-\omega_yX+\omega_xY.
$$

Therefore:

$$
[\omega_c]_\times P_c
=
\begin{bmatrix}
\omega_yZ-\omega_zY \\
\omega_zX-\omega_xZ \\
\omega_xY-\omega_yX
\end{bmatrix},
$$

which is exactly:

$$
\omega_c \times P_c.
$$

---

## ▪ Rotational motion and the cross product
{: #rotational-motion-and-the-cross-product }

This comes from rigid-body kinematics.

For a rotating coordinate frame:

$$
\dot{P}=-\omega \times P.
$$

Intuition:

Imagine a camera rotating around its center.

The point itself does not move.

But the coordinate axes attached to the camera rotate.

Therefore, the coordinates of the point change.

For example, if the camera rotates around $$z$$:

$$
\omega =
\begin{bmatrix}
0 \\
0 \\
\omega_z
\end{bmatrix},
$$

then:

$$
\omega \times P
=
\begin{bmatrix}
-\omega_zY \\
\omega_zX \\
0
\end{bmatrix}.
$$

The point moves in a circular pattern in the camera coordinate system.

This is exactly what the cross product describes.

---

## ▪ Associativity and order of matrix multiplication
{: #associativity-and-order-of-matrix-multiplication }

You wrote:

> I got the part where $$R_{cw}(P_w-C_w)=P_c$$, but there is a cross product operator in front of $$R_{cw}$$. Is it okay to do the vector multiplication $$R_{cw}(P_w-C_w)$$ first?

Yes. It is not only valid, it is exactly what we do.

Let's carefully look at the term:

$$
\dot{R}_{cw}(P_w-C_w)
$$

and substitute:

$$
\dot{R}_{cw}
=
-[\omega_c]_\times R_{cw}.
$$

Then:

$$
\dot{R}_{cw}(P_w-C_w)
$$

becomes:

$$
\left(-[\omega_c]_\times R_{cw}\right)(P_w-C_w).
$$

By matrix associativity:

$$
\left(-[\omega_c]_\times R_{cw}\right)(P_w-C_w)
=
-[\omega_c]_\times
\left(R_{cw}(P_w-C_w)\right).
$$

Now:

$$
R_{cw}(P_w-C_w)=P_c,
$$

therefore:

$$
-[\omega_c]_\times
\left(R_{cw}(P_w-C_w)\right)
=
-[\omega_c]_\times P_c,
$$

or:

$$
-[\omega_c]_\times P_c
=
-\omega_c \times P_c.
$$

So your reasoning:

> First calculate $$R_{cw}(P_w-C_w)$$

is exactly correct.

The important point:

Matrix multiplication is associative:

$$
ABC=A(BC)=(AB)C,
$$

but not commutative:

$$
AB \neq BA.
$$

So you can regroup:

$$
([\omega]_\times R)(P_w-C)
$$

into:

$$
[\omega]_\times\left(R(P_w-C)\right),
$$

but you cannot swap:

$$
R[\omega]_\times
$$

and

$$
[\omega]_\times R.
$$

## ▪ Connection between normalized and pixel interaction matrices
{: #connection-between-normalized-and-pixel-interaction-matrices }

The normalized feature is

$$
s_n=
\begin{bmatrix}
x \\
y
\end{bmatrix},
$$

while the pixel feature is

$$
s_p=
\begin{bmatrix}
u \\
v
\end{bmatrix}
=
\begin{bmatrix}
f_xx+c_x \\
f_yy+c_y
\end{bmatrix}.
$$

Differentiate:

$$
\dot{u}=f_x\dot{x},
\qquad
\dot{v}=f_y\dot{y}.
$$

Therefore,

$$
\begin{bmatrix}
\dot{u} \\
\dot{v}
\end{bmatrix}
=
\begin{bmatrix}
f_x & 0 \\
0 & f_y
\end{bmatrix}
\begin{bmatrix}
\dot{x} \\
\dot{y}
\end{bmatrix}.
$$

If

$$
\dot{s}_n=L_n\nu_c,
$$

then

$$
\dot{s}_p
=
\begin{bmatrix}
f_x & 0 \\
0 & f_y
\end{bmatrix}
L_n\nu_c.
$$

Hence,

$$
\boxed{
L_{\mathrm{pixel}}
=
\begin{bmatrix}
f_x & 0 \\
0 & f_y
\end{bmatrix}
L_n
}.
$$

With nonzero skew, the multiplier becomes

$$
\begin{bmatrix}
f_x & s \\
0 & f_y
\end{bmatrix}.
$$

This is why focal lengths appear when the lecture moves from normalized coordinates to pixel coordinates.

## ▪ References
{: #references }

- <i class="fab fa-youtube" aria-hidden="true"></i> [Video 1 (YouTube, starts at 0:22)](https://www.youtube.com/watch?v=s_0DdxHjrfA&t=22s).
- <i class="fab fa-youtube" aria-hidden="true"></i> [Video 2 (YouTube, playlist item 61)](https://www.youtube.com/watch?v=XDE6oxEJn3c&list=PLjoIYgWzjQHK8G2O56jsu56dmjWiipguv&index=61).
