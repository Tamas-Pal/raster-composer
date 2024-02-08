import p5 from 'p5';

export type Config = {
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
  inputGridUnitX: number;
  inputGridUnitY: number;
  rasterSize: number;
  pixels: Pixels;
};

export type StepFunction = (
  resolution: number,
  inputGridUnit: number,
  rasterSize: number
) => number;
export type ColorFunction = (pixel: Pixel, pixelIndex?: number) => string;
export type TransformFunction = (p: p5, scale: number, pixel?: Pixel) => number;
export type ShapeFunction = (
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  rasterSize: number,
  pixel: Pixel,
  pixelIndex?: number,
  transformF?: TransformFunction
) => void;
export type PatternFunction = (
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  pixel: Pixel,
  patternResolution: number,
  channelIndex: number
) => void;

export type SamplerConfig = {
  inputGridUnitX: number;
  inputGridUnitY: number;
  rasterSize: number;
  sampleRange: number;
  stepFX: StepFunction | undefined;
  stepFY: StepFunction | undefined;
};

export type Sampler = (
  resolutionX: number,
  resolutionY: number,
  pixels: number[],
  samplerConfig: SamplerConfig
) => Buffer;

export type RendererConfig = {
  colorF: ColorFunction;
  shapeF: ShapeFunction;
  transformF: TransformFunction | undefined;
  patternColorF: ColorFunction | undefined;
  patternF: PatternFunction | undefined;
  patternResolution: number | undefined;
  channels: boolean[] | undefined;
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
