import p5 from 'p5';

export type Config = {
  image: string;
  backgroundColor: number[];
  outputMultiplier: number;
  resolutionX: number;
  resolutionY: number;
  outputGridUnitX: number;
  outputGridUnitY: number;
};

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

export type StepFunction = (resolution: number, rasterSize: number) => number;
export type SamplerFunction = (
  resolutionX: number,
  resolutionY: number,
  x: number,
  y: number,
  samplerFParams: number[]
) => number;
export type ConditionFunction = (
  outputColor: BufferColor,
  threshold: number
) => boolean;

export type ColorFunction = (pixel: Pixel, pixelIndex?: number) => string;
export type TransformFunction = (
  p: p5,
  transformScale: number,
  pixel?: Pixel
) => number;
export type ShapeFunction = (
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  rasterSizeX: number,
  rasterSizeY: number,
  pixel: Pixel,
  pixelIndex: number | undefined,
  transformParams: TransformParams | undefined
) => void;
export type PatternFunction = (
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  rasterSizeX: number,
  rasterSizeY: number,
  pixel: Pixel,
  channelIndex: number,
  patternParams: [patternResolutionXY: number[], patternColorF: ColorFunction]
) => void;

export type SamplerConfig = {
  rasterSizeX: number;
  rasterSizeY: number;
  sampleRadius: number;
  stepFX: StepFunction | undefined;
  stepFY: StepFunction | undefined;
  conditionF: ConditionFunction | undefined;
  threshold: number;
  samplerF: SamplerFunction;
  samplerFParams: number[] | undefined;
};

export type Sampler = (
  resolutionX: number,
  resolutionY: number,
  pixels: number[],
  samplerConfig: SamplerConfig
) => Buffer;

export type TransformParams = {
  transformF: TransformFunction;
  transformScaleXY: number[];
};
export type PatternParams = {
  patternF: PatternFunction;
  patternResolutionXY: number[];
  patternColorF: ColorFunction;
};
export type RendererConfig = {
  colorF: ColorFunction;
  shapeF: ShapeFunction;
  transformParams: TransformParams | undefined;
  channels: boolean[] | undefined;
  patternParams: PatternParams | undefined;
};

export type Renderer = (
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  buffer: Buffer,
  rendererConfig: RendererConfig
) => void;

export type Operation = {
  sampler: Sampler;
  samplerConfig: SamplerConfig;
  renderer: Renderer;
  rendererConfig: RendererConfig;
};
export type Operations = Operation[];
