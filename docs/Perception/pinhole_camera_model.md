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
  <figcaption style="margin-top: 0.5rem; font-style: italic;">Perspective projection using physical and virtual image planes. Source: <a href="https://csundergrad.science.uoit.ca/courses/cv-notes/notebooks/01-image-formation.html">Image formation and pinhole camera model</a>, Faisal Qureshi, Ontario Tech University.</figcaption>
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
  <figcaption style="margin-top: 0.5rem; font-style: italic;">Ideal pinhole-camera geometry.<br>Source: <a href="https://csundergrad.science.uoit.ca/courses/cv-notes/notebooks/01-image-formation.html">Image formation and pinhole camera model</a>, Faisal Qureshi, Ontario Tech University.</figcaption>
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

### Focal Length and Pixel Units

The physical focal length $$f_{\mathrm{physical}}$$ is measured in length units, typically millimetres, while $$f_x,f_y$$ express it in horizontal and vertical pixels. For pixel pitches $$d_x,d_y$$ measured in millimetres per pixel,

$$
\boxed{
f_x=\frac{f_{\mathrm{physical}}}{d_x}
},
\qquad
\boxed{
f_y=\frac{f_{\mathrm{physical}}}{d_y}
}.
$$

Different pixel pitches or unequal image scaling can give $$f_x\ne f_y$$. Resizing changes both the focal lengths and principal-point coordinates in **pixel units**, so the intrinsic matrix must be updated accordingly. In practice, calibration estimates $$f_x,f_y$$ from image measurements; for nominally square pixels without unequal resizing, they are usually close but need not be forced equal.

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

## ▪ Image Planes and Coordinate Conventions
{: #image-planes-and-coordinate-conventions }

In the ideal pinhole geometry, the physical sensor lies behind the camera center and receives an inverted image. With $$f=f_{\mathrm{physical}}>0$$, the physical and virtual planes lie at axial positions $$-f$$ and $$+f$$. The line through $$P_c=[X,Y,Z]^T$$ and the camera center intersects them at

$$
\underbrace{\left(-f\frac{X}{Z},-f\frac{Y}{Z},-f\right)}_{\text{physical plane}},
\qquad
\underbrace{\left(f\frac{X}{Z},f\frac{Y}{Z},f\right)}_{\text{virtual plane}}.
$$

These points lie on opposite sides of the camera center. The virtual plane changes the representation of projection; light is still recorded on the physical sensor. With OpenCV's camera axes ($$X$$ right, $$Y$$ down, $$Z$$ forward), a scene point in front has depth $$Z>0$$ regardless of which image plane represents its projection.

The virtual plane makes the standard coordinate convention convenient:

- **Simple projection equations:** its coordinates are $$(fX/Z,fY/Z)$$, without inversion signs, and division by $$f$$ gives the normalized coordinates $$x=X/Z,y=Y/Z$$.
- **Consistent pixel directions:** with zero skew and positive $$f_x,f_y$$, a point with $$X>0$$ projects to $$u>c_x$$, and one with $$Y>0$$ projects to $$v>c_y$$, for $$Z>0$$.

The same positive-sign pixel equations are compatible with the inverted physical image. For the zero-skew model, let $$x_{\mathrm{sensor}}=-fX/Z$$ measure horizontal position on the sensor along the camera's $$X$$ direction. Choosing pixel columns to increase in the opposite direction on the sensor gives

$$
u=c_x-\frac{x_{\mathrm{sensor}}}{d_x}
=c_x+\frac{f}{d_x}\frac{X}{Z}
=c_x+f_x\frac{X}{Z}.
$$

The vertical relation follows similarly. The coordinate definitions account for the sign change without requiring an explicit firmware image flip. Calibration estimates $$K$$ for the final image coordinates, so the camera model must match the pixel convention of the images being used.

----
## ▪ References
{: #references }

- Faisal Qureshi. [Image formation and pinhole camera model](https://csundergrad.science.uoit.ca/courses/cv-notes/notebooks/01-image-formation.html). *[Computer Vision lecture notes](https://csundergrad.science.uoit.ca/courses/cv-notes/)*, Ontario Tech University.

- OpenCV. [Perspective-n-Point (PnP) pose computation](https://docs.opencv.org/4.13.0/d5/d1f/calib3d_solvePnP.html). *OpenCV 4.13.0 documentation*.

- [Imaging](https://visionbook.mit.edu/imaging.html). *Foundations of Computer Vision*, Chapter 5.

- <i class="fab fa-youtube" aria-hidden="true"></i> [Computer Vision: The Camera Matrix](https://www.youtube.com/watch?v=Hz8kz5aeQ44&t=20s).

- <i class="fab fa-youtube" aria-hidden="true"></i> [Class 11 - Camera Models](https://www.youtube.com/watch?v=e4kr9DKBfMk).
