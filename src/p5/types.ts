import p5 from 'p5';

// Main configurations

export type Config = {
  images: string[];
  outputMultiplier: number;
  resolutionX: number;
  resolutionY: number;
  outputGridUnitX: number;
  outputGridUnitY: number;
};

// Primitives

export type BufferXY = [number, number];
export type BufferColor = [number, number, number, number];
export type BufferXYs = BufferXY[];
export type BufferColors = BufferColor[];
export type Pixel = [number, number, number, number, number, number];
export type Pixels = Pixel[];
export type Buffer = {
  resolutionY: number;
  resolutionX: number;
  rasterSizeX: number;
  rasterSizeY: number;
  pixels: Pixels;
};

// Function building blocks

//  Sampler:
//    Modify pixel by pixel route of sampler through the source image
export type SamplerFParams = {
  resolutionX: number;
  resolutionY: number;
  x: number;
  y: number;
  samplerFFreq: number[];
};
export type SamplerFunction = (samplerFParams: SamplerFParams) => number;
//    Compute color based on input color
export type ColorParams = {
  pixel?: Pixel;
  pixelIndex?: number;
  inputColor?: number[];
};
export type ColorFunction = (colorParams: ColorParams) => string;
//    Decide if pixel should be included in buffer based on computed color
export type ConditionFunction = (
  outputColor: BufferColor,
  threshold: number[]
) => boolean;

//  Renderer:
//    Transform individual raster
export type TransformFunction = (
  p: p5,
  transformScale: number,
  pixel?: Pixel
) => number;
//    Create raster shape
export type ShapeParams = {
  outputGridUnitX: number;
  outputGridUnitY: number;
  rasterSizeX: number;
  rasterSizeY: number;
  pixel: Pixel;
  pixelIndex?: number;
  transformConfig?: TransformConfig;
  metaballRasterSizeXY?: [number, number];
};
export type ShapeFunction = (p: p5, shapeParams: ShapeParams) => void;
//    Add raster pattern to shape
export type PatternParams = {
  outputGridUnitX: number;
  outputGridUnitY: number;
  rasterSizeX: number;
  rasterSizeY: number;
  pixel: Pixel;
  channelIndex: number;
  patternResolutionXY: number[];
  patternColor: {
    patternColorF: ColorFunction;
    inputColor?: number[];
  };
};
export type PatternFunction = (p: p5, patternParams: PatternParams) => void;

// Sampler parameters
//  Parameters received from config file
export type SamplerConfig = {
  imageIndex: number;
  rasterSizeX: number;
  rasterSizeY: number;
  sampleRadius: number;
  conditionF: ConditionFunction;
  threshold: number[];
  samplerF: SamplerFunction;
  samplerFFreq?: number[];
};
//  Function
export type Sampler = (
  resolutionX: number,
  resolutionY: number,
  pixels: number[],
  samplerConfig: SamplerConfig
) => Buffer;

// Renderer parameters
//  Modifier parameters passed from operation presets

//    Transform individual raster
export type TransformConfig = {
  transformF: TransformFunction;
  transformScaleXY: number[];
};
//    Add pattern to raster
export type PatternConfig = {
  patternF: PatternFunction;
  patternResolutionXY: number[];
  patternColor: {
    patternColorF: ColorFunction;
    inputColor?: number[];
  };
};
//    Parameters only for metaballRenderer
export type MetaballConfig = {
  metaballRasterSizeXY: number[];
  evaluationDistanceRatio: number;
};
//    Generic renderer parameters
export type RendererConfig = {
  blendMode: string;
  colorConfig: { colorF: ColorFunction; inputColor?: number[] };
  shapeF: ShapeFunction;
  transformConfig?: TransformConfig;
  channels?: boolean[];
  patternConfig?: PatternConfig;
  metaballConfig?: MetaballConfig;
};

//  Renderer function with the utility p5 and main config outputGridUnit parameters
//  + buffer from computed by sampler function, containing pixel info
//  + renderer parameters from above

export type Renderer = (
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  buffer: Buffer,
  rendererConfig: RendererConfig
) => void;

// Operation types

export type Operation = {
  samplerConfig: SamplerConfig;
  renderer: Renderer;
  rendererConfig: RendererConfig;
};
export type Preset = {
  backgroundColor: number[];
  operations: Operation[];
};
