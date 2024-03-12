---
# Raster-Composer

#### *An image processing tool for remixing photos and graphics into new creative compositions.*
---

## Introduction

### Wait, What?

Raster-Composer is an ongoing passion project that processes images on a pixel by pixel basis
to create lofi-ish artwork in a manner that is prevalent throughout history. From mosaics to knitting
patterns, pointillism, printmaking or early computer graphics.

### Basic Mechanism

It takes a source image and samples all or some of its pixels based on configurable criteria
and renders them in custom shapes, colors with different possible patterns and transformations.

The library of operation functions is not extensive so far, but its simplicity
still creates a sea of possiblities. Doing multiple passes with the use of layers, the ability
to save and load presets gives the user a handy toolset for creating graphic artworks.

### Technical Overview

Raster-Composer is written in **TypeScript** and uses the **p5** library to produce the images.
It sacrifices speed and live operability to be able to handle large images with heaps of pixel data.

The UI is made using **React** and **Vite**.

---

## Using Raster-Composer

### Interface Structure

#### Files

The top left section of the UI is for file operations:

- **Loading the source image** - any p5 recognized image type.
- **Saving the output** - .png.
- **Loading previous presets** - .json.
- **Saving the current preset** - .json. Also available with **hitting 's' on the keyboard**.

#### Output Image

To the right is the output image. It is a 1:1 rendering to be able to observe details.  
For now, use the browser's built in zoom.  
**Update:** Implement your changes with the update button or **hit 'u' on the keyboard**.

#### Main Settings

It is for configuration that takes effect not in relation to layers:

- **Output Width:** determines resolution of the output image in pixels.  
  (Height is computed through aspect ration of source image.)
- **Background Color** in RGBA values. Use 0 Alpha (A) to achieve transparent background.
- **Add Layer** button to introduce new layers to your composition.

### Operations (Layer Settings)

#### Sampler

- **Raster Size X and Y**: width and height of a single "raster". This is the X and Y
  distance between two points of sampling, and the base size of the rendered stand-in shape
  in a common scenario.
- **Sample Radius:** is the number of pixels to be mean averaged in each direction with each step
  the sampler is taking through the source image. This means: the sampler position is determined
  by Raster Size, but the Sample Radius is in source image pixel units. If Sample Radius is 2,
  25 pixels will be sampled (2 pixels before, 2 pixels after and the origin pixel in both dimensions,
  creating a 5 x 5 matrix).
- **Condition Function:** filters the pixels to be rendered with a _Threshold_ range of 0-255.
- **Sampler Function:** the default basic sampler function goes through each raster (defined by
  Raster Size). Changing _Sample Frequency_ below 1 will cut from the image, values above one will make
  the image repeat. Different versions of the Sampler Functions change up this method for the lulz.

#### Renderer

- **Renderer** is the function responsible for drawing things on the canvas. Takes in the data for
  the sampled pixel (x and y position + RGBA color values).  
  The base case is pixelRenderer: it draws a shape for each sampled pixel. 
  MarchBlobsRenderer is a feature in experimental stage, based on the marching squares algorithm (actual marching squares is planned), that takes into consideration neighboring rasters to create a curved look.
  _Use MarchBlobsRenderer with MarchBlobs ShapeFunction for intended results!_
  MetaballRenderer is creating metaballs (or isosurfaces) with the sampled pixels being used as the seed center points.
  _Use metaballRenderer with metaballParticles ShapeFunction for intended results!_
- **Blend Mode**: decides the how to blend drawn shapes with the existing graphics. Screen "adds to",
  Multiply "subtracts from" the underlying image, difference "inverts". All according to individual
  their channel values.
- **Passes:** Allows for multiple passes for each pixel. Useful for achieving a traditional halftone
  look. Default is red, but most Color Functions are not affected by the choice of channel.
- **Color Function:** Computing colors for rendered shapes. Rgb and rgba returns original colors while
  the rest alters them. Some of these require an Input Color to base calculations off of.
- **Shape Function:** Defines the shape rendered for each raster. MetaballParticles is to be used with
  the metaballRenderer.
- **Transform Function:** alters pixel sizes, positions, rotation. _Scale_ refers to the magnitude of
  the transformation.
- **Pattern Function:** adds pattern to the raster. It typically has no background, just is added
  "on top" as a graphic element. Increasing _Resolution_ gives detail, and _Color Function_ acts like its
  main counterpart.
- **Metaball:** provides settings for the metaballRenderer. _Metaball Raster Size_ acts like the common
  Raster Size. (Introduced to be able to separate density of the original raster points, since they are
  used for seeding the isosurfaces.) _Evaluation Distance Ratio_ defines the longest distance where a
  raster is influenced by seed point. It is basically a multiplier for the largest distance in the image,
  hence the fractional number.
  _Only appears if Renderer is set to metaballRenderer._
