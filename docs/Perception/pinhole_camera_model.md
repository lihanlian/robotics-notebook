---
title: Pinhole Camera Model
parent: Computer Vision
nav_order: 1
---

# Pinhole Camera Model
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

The pinhole camera model describes perspective projection from a 3D point to a 2D image. Let a point expressed in the <span style="color:red">**camera frame**</span> be $$P_c=[X,Y,Z]^T$$, with the camera center at the origin and the optical axis aligned with the positive $$Z$$-axis. Although a physical sensor lies behind the pinhole and forms an inverted image, an equivalent virtual image plane at $$Z=f$$ is usually placed in front of it to simplify the geometry.

<figure style="margin: 1.5rem auto; width: 70%; text-align: center;">
  <img src="{{ '/assets/images/perception/pinhole-camera/pinhole4.png' | relative_url }}" alt="A 3D point projected through a pinhole onto physical and virtual image planes" style="display: block; width: 100%; height: auto;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">Perspective projection using physical and virtual image planes. Source: <a href="https://csundergrad.science.uoit.ca/courses/cv-notes/notebooks/01-image-formation.html">Image Formation</a>.</figcaption>
</figure>

By similar triangles, the ray from $$P_c$$ through the camera center intersects the virtual image plane at

$$
\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix}
\longmapsto
\begin{bmatrix}
fX/Z \\
fY/Z \\
f
\end{bmatrix}.
$$

Dropping the fixed third coordinate gives the image-plane location $$(fX/Z,fY/Z)$$. Dividing it by $$f$$ gives the normalized image coordinates used later in this chapter:

$$
x=\frac{X}{Z},
\qquad
y=\frac{Y}{Z}.
$$

<figure style="margin: 1.5rem auto; width: 75%; text-align: center;">
  <img src="{{ '/assets/images/perception/pinhole-camera/camera-geometry.png' | relative_url }}" alt="Pinhole camera geometry showing the camera center, image plane, principal axis, and principal point" style="display: block; width: 100%; height: auto;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">Ideal pinhole-camera geometry. Image from <cite>Multiple View Geometry in Computer Vision</cite>, Second Edition, via <a href="https://csundergrad.science.uoit.ca/courses/cv-notes/notebooks/01-image-formation.html">Image Formation</a>.</figcaption>
</figure>

In this geometry:

- the **camera center** $$C$$ is the center of projection;

- the **image plane** is the plane at $$Z=f$$;

- the **principal axis** is perpendicular to the image plane and passes through $$C$$;

- the **principal point** $$p$$ is where the principal axis intersects the image plane;

- the **principal plane** passes through $$C$$ and is parallel to the image plane.

## ▪ Homogeneous Coordinates
{: #homogeneous-coordinates }

Homogeneous coordinates give us a common matrix notation for translations, rotations, and perspective projection. The added coordinate also lets us represent an image point independently of the scale of its coordinate vector.

For a pixel location $$(u,v)$$, a homogeneous representation is

$$
\begin{bmatrix}
u \\
v \\
1
\end{bmatrix}.
$$

Multiplying every component by the same nonzero number represents the same pixel:

$$
\begin{bmatrix}
u \\
v \\
1
\end{bmatrix}
\sim
\begin{bmatrix}
\lambda u \\
\lambda v \\
\lambda
\end{bmatrix},
\qquad \lambda\ne0.
$$

Here, $$\sim$$ means that the vectors represent the same point up to a nonzero scale. To recover the Cartesian pixel coordinates, divide the first two components by the last:

$$
\left(\frac{\lambda u}{\lambda},\frac{\lambda v}{\lambda}\right)=(u,v).
$$

For example, $$[3,2,1]^T$$, $$[6,4,2]^T$$, and $$[9,6,3]^T$$ all represent the pixel $$(3,2)$$. The last component records scale; it is not another image dimension.

This representation fits perspective projection naturally. From the normalized coordinates $$x=X/Z$$ and $$y=Y/Z$$, we have

$$
P_c=
\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix}
=
Z\begin{bmatrix}
x \\
y \\
1
\end{bmatrix},
\qquad Z\ne0.
$$

Here, $$P_c$$ is still a Cartesian 3D point, while $$[x,y,1]^T$$ represents <span style="color:red"> a normalized 2D image point.  Points at different depths along the same viewing ray have the same ratios $$X/Z$$ and $$Y/Z$$, so they project to the same image location. </span>

Homogeneous coordinates let us postpone the division by depth until after the matrix multiplications. They do not remove that division: the final Cartesian image coordinates still come from dividing by the last component. Their other benefit, <span style="color:red">putting rotation and translation into one matrix multiplication</span>, is developed in the extrinsic-parameter subsection below.

## ▪ Camera Parameters
{: #camera-parameters }

Intrinsic parameters describe how a viewing ray maps to the pixel coordinate system. Extrinsic parameters describe the change of coordinates from the world frame to the camera frame.

### Intrinsic Parameters

The general intrinsic matrix is

$$
K=
\begin{bmatrix}
f_x & s & c_x \\
0 & f_y & c_y \\
0 & 0 & 1
\end{bmatrix},
$$

where:

- $$f_x,f_y$$ are focal lengths in **pixels**;

- $$c_x,c_y$$ are the principal point in **pixels**;

- $$s$$ is the skew coefficient.

Using homogeneous image coordinates, the conversion from the normalized image point to a pixel is

$$
\begin{bmatrix}
u \\
v \\
1
\end{bmatrix}
=
K\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}
=
\begin{bmatrix}
f_xx+sy+c_x \\
f_yy+c_y \\
1
\end{bmatrix}.
$$

The third input component allows the principal-point offsets $$c_x,c_y$$ to be included in the same multiplication as the focal-length scaling and skew. These offsets describe the pixel coordinate system; the camera's position and orientation are described by the extrinsic parameters.

Substituting $$x=X/Z$$ and $$y=Y/Z$$ and multiplying by $$Z$$ gives

$$
Z\begin{bmatrix}
u \\
v \\
1
\end{bmatrix}
=
K\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix}
=
\begin{bmatrix}
f_xX+sY+c_xZ \\
f_yY+c_yZ \\
Z
\end{bmatrix}.
$$

The result is $$[Zu,Zv,Z]^T$$, a homogeneous representation of the pixel. Dividing by its third component gives

<div markdown="1" style="border: 1px solid currentColor; border-radius: 4px; padding: 1rem; margin: 1.5rem 0;">

$$
u=f_x\frac{X}{Z}+s\frac{Y}{Z}+c_x,
\qquad
v=f_y\frac{Y}{Z}+c_y.
$$

</div>

This is why the last row of $$K$$ is $$[0,0,1]$$: it preserves the depth as the homogeneous scale when multiplying $$P_c$$. <span style="text-decoration: underline;">There is no need to put a point-dependent $$1/Z$$ inside $$K$$; the division is performed after multiplication.</span>

For the common zero-skew model, set $$s=0$$:

$$
K=
\begin{bmatrix}
f_x & 0 & c_x \\
0 & f_y & c_y \\
0 & 0 & 1
\end{bmatrix}.
$$

The projection then simplifies to

$$
\boxed{
u=f_x\frac{X}{Z}+c_x
},
\qquad
\boxed{
v=f_y\frac{Y}{Z}+c_y
}.
$$

### Extrinsic Parameters

A point may initially be expressed in a world coordinate frame. Following the notation used here, its homogeneous representation is

$$
P_w=\begin{bmatrix}
X_w \\
Y_w \\
Z_w \\
1
\end{bmatrix}.
$$

The extrinsic parameters convert its world coordinates into camera coordinates:

$$
P_c=
\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix}
=
R\begin{bmatrix}
X_w \\
Y_w \\
Z_w
\end{bmatrix}+t.
$$

Here, $$R$$ is a $$3\times3$$ rotation matrix that expresses world-frame directions in the camera frame, and $$t$$ is a $$3\times1$$ translation vector. With this world-to-camera convention, $$t$$ is the location of the world origin expressed in camera coordinates.

An ordinary $$3\times3$$ matrix always maps the zero vector to the zero vector, so it cannot express a nonzero translation by itself. Appending a coordinate of $$1$$ gives the translation column something to multiply, allowing both operations to be written as one matrix product:

$$
\begin{bmatrix}
P_c \\
1
\end{bmatrix}
=
\begin{bmatrix}
R & t \\
0_{1\times3} & 1
\end{bmatrix}P_w.
$$

This $$4\times4$$ homogeneous transformation maps a homogeneous 3D point from the world frame to the camera frame. Its upper three rows give

$$
\boxed{
P_c=[R\mid t]P_w,
}
$$

where $$[R\mid t]$$ is $$3\times4$$. The full $$4\times4$$ form preserves the final coordinate of $$1$$, so successive changes of frame can be combined by multiplying their transformation matrices in the order they are applied, with the first transformation on the right.

The intrinsic matrix $$K$$ has a different role: **it maps normalized image coordinates into pixel coordinates**. Both operations use homogeneous coordinates, but **only the extrinsic transformation describes the rotation and translation between 3D frames.**

## ▪ Complete Camera Projection
{: #complete-camera-projection }

If the same point is initially expressed in the world frame as $$P_w=[X_w,Y_w,Z_w,1]^T$$, the extrinsic matrix $$[R\mid t]$$ first rotates and translates it into the camera frame. The intrinsic matrix $$K$$ then converts the camera-frame coordinates into homogeneous pixel coordinates:

$$
P_c
=
\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix}
=
[R\mid t]P_w,
$$

$$
\boxed{
Z
\begin{bmatrix}
u \\
v \\
1
\end{bmatrix}
=
KP_c
=
K[R\mid t]P_w
=
PP_w,
\qquad
P=K[R\mid t].
}
$$

Thus, $$[R\mid t]$$ determines where the point is relative to the camera, while $$K$$ determines where its viewing ray appears in the pixel coordinate system. Together they form the $$3\times4$$ camera projection matrix $$P$$.

The dimensions make the composition explicit: $$K$$ is $$3\times3$$, $$[R\mid t]$$ is $$3\times4$$, and $$P_w$$ is $$4\times1$$. Their product is the $$3\times1$$ homogeneous pixel vector $$[Zu,Zv,Z]^T$$.

The camera projection matrix $$P$$ combines the world-to-camera transformation and the intrinsic mapping. Multiplying $$P$$ by $$P_w$$ produces the vector $$[Zu,Zv,Z]^T$$. To obtain the pixel coordinates $$(u,v)$$, divide the first two entries, $$Zu$$ and $$Zv$$, by the depth $$Z$$ stored in the third entry. This final perspective division is defined for $$Z\ne0$$; visible points in front of the camera have $$Z>0$$.

## ▪ Physical and virtual image planes
{: #physical-and-virtual-image-planes }

This is the key idea:

A camera image is fundamentally a set of rays.

The 3D point:

$$
P_c=
\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix}
$$

creates a ray:

$$
\lambda
\begin{bmatrix}
X \\
Y \\
Z
\end{bmatrix}
$$

The physical sensor and virtual plane are just two different ways of selecting a point on this same ray.

---

Physical plane:

$$
Z=-f
$$

gives:

$$
x=-f\frac{X}{Z}
$$

Virtual plane:

$$
Z=f
$$

gives:

$$
x=f\frac{X}{Z}
$$

They differ only by a sign.

The ray itself did not change.

### OpenCV coordinate conventions

This coordinate convention has the following properties:

### Positive depth

Points in front of the camera have:

$$
Z>0
$$

instead of:

$$
Z<0
$$

### Horizontal pixel direction

A point on the right gives:

$$
u>c_x
$$

which matches image intuition.

### Positive focal lengths

The intrinsic matrix contains positive focal lengths:

$$
f_x>0
$$

instead of negative values.

This makes optimization and calibration much easier.

## ▪ Optical inversion and digital image conventions
{: #optical-inversion-and-digital-image-conventions }

Optical image formation and digital image representation are separate stages:

### Optical formation

The lens physically forms an inverted image.

### Digital image representation

The camera electronics output an image array.

The camera driver chooses:

- where pixel $$(0,0)$$ is,

- whether rows increase downward,

- whether columns increase rightward.

The final digital image coordinate system is what OpenCV sees.

So the manufacturer or camera firmware may indeed perform operations like:

- flipping,

- rotating,

- demosaicing,

- correcting sensor orientation.

But the important point is:

**OpenCV calibration is performed on the final digital image coordinates.**

The intrinsic matrix $$K$$ already describes the mapping between 3D rays and those pixels.


## ▪ Physical focal length $$f$$
{: #physical-focal-length-f }

The physical focal length is a length, commonly measured in millimetres:

$$
f_{\mathrm{physical}}
\quad [\mathrm{mm}].
$$

For example,

$$
f_{\mathrm{physical}}=4\ \mathrm{mm}.
$$

Pixel coordinates $$u$$ and $$v$$ are measured in pixels, so a focal length expressed in millimetres cannot be inserted directly into

$$
u=f_x\frac{X}{Z}+c_x.
$$

It must first be converted into pixel units.

## ▪ Focal lengths in pixels
{: #focal-lengths-in-pixels }

The quantities $$f_x$$ and $$f_y$$ are focal lengths measured in horizontal and vertical pixels:

$$
f_x\quad[\mathrm{pixels}],
\qquad
f_y\quad[\mathrm{pixels}].
$$

Let the physical pixel pitches be

$$
d_x\quad[\mathrm{mm/pixel}],
\qquad
d_y\quad[\mathrm{mm/pixel}].
$$

Then

$$
\boxed{
f_x=\frac{f_{\mathrm{physical}}}{d_x}
},
\qquad
\boxed{
f_y=\frac{f_{\mathrm{physical}}}{d_y}
}.
$$

Equivalently, define pixel densities

$$
m_x=\frac{1}{d_x}
\quad[\mathrm{pixels/mm}],
\qquad
m_y=\frac{1}{d_y}
\quad[\mathrm{pixels/mm}].
$$

Then

$$
\boxed{
f_x=f_{\mathrm{physical}}m_x
},
\qquad
\boxed{
f_y=f_{\mathrm{physical}}m_y
}.
$$

Some texts use $$\alpha_x$$ and $$\alpha_y$$ instead of $$f_x$$ and $$f_y$$:

$$
\alpha_x=fm_x,
\qquad
\alpha_y=fm_y.
$$

These quantities have the same role as the OpenCV notation $$f_x,f_y$$.

### Numerical conversion example

Suppose

$$
f_{\mathrm{physical}}=4\ \mathrm{mm},
$$

with pixel pitches

$$
d_x=0.005\ \mathrm{mm/pixel},
\qquad
d_y=0.0048\ \mathrm{mm/pixel}.
$$

Then

$$
f_x=\frac{4}{0.005}=800\ \mathrm{pixels},
$$

and

$$
f_y=\frac{4}{0.0048}\approx833.33\ \mathrm{pixels}.
$$

The pixel projection is therefore

$$
u=800\frac{X}{Z}+c_x,
$$

$$
v=833.33\frac{Y}{Z}+c_y.
$$

Because $$X$$ and $$Z$$ use the same length unit,

$$
\frac{X}{Z}
$$

is dimensionless. Consequently, $$f_x(X/Z)$$ has units of pixels, matching $$u$$.

## ▪ Independent horizontal and vertical focal lengths
{: #independent-horizontal-and-vertical-focal-lengths }

There are several practical reasons.

### Different pixel pitch

The horizontal and vertical physical pixel spacing can differ:

$$
d_x\neq d_y.
$$

Then

$$
f_x\neq f_y.
$$

### Image resizing

If an image is resized with horizontal and vertical scale factors $$r_x,r_y$$, the intrinsic parameters change as

$$
f_x'=r_xf_x,
\qquad
f_y'=r_yf_y,
$$

$$
c_x'=r_xc_x,
\qquad
c_y'=r_yc_y.
$$

### Calibration estimates the pixel geometry directly

In practice, $$f_x$$ and $$f_y$$ are normally estimated directly through calibration, rather than reconstructed from nominal lens focal length and sensor pitch. This captures small manufacturing and processing differences. For nominally square pixels,

$$
f_x\approx f_y,
$$

but they need not be forced to be exactly equal.


----
## ▪ References
{: #references }

- <i class="fab fa-youtube" aria-hidden="true"></i> [Computer Vision: The Camera Matrix](https://www.youtube.com/watch?v=Hz8kz5aeQ44&t=20s).

- <i class="fab fa-youtube" aria-hidden="true"></i> [Class 11 - Camera Models](https://www.youtube.com/watch?v=e4kr9DKBfMk).
