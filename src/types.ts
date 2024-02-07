export type Config = {
  rasterSize: number;
  outputMultiplier: number;
  resX: number;
  resY: number;
};

export type BufferXY = [number,number];
export type BufferColor = [number, number, number, number]
export type BufferXYs = BufferXY[];
export type BufferColors = BufferColor[];
export type Buffer = {
  xYs: BufferXYs;
  cols: BufferColors;
};

export type StepFunction = (n: number) => number;
export type ColorFunction = (col: BufferColor) => BufferColor;
export type ShapeFunction = (xY: BufferXY, col: BufferColor) => BufferXYs;
export type PatternColorFunction = (col: BufferColor) => BufferColor;
export type PatternFunction = (xY: BufferXY, col: BufferColor) => BufferColor;


export type SamplerConfig = [
  inputGridUnitX: number,
  inputGridUnitY: number,
  sampleRange: number,
  stepFunctionX: StepFunction,
  stepFunctionY: StepFunction
];


export type OperatorConfig = {
 colorFunction: ColorFunction;
 patternFunction: PatternColorFunction;
};

export type RenderConfig = {
  function: string;
  arguments: [outputGridUnitX: number, outputGridUnitY: number];
};

export type Operation = {
  samplerConfig: SamplerConfig;
  renderConfig: RenderConfig;
};

export type Operations = Operation[];
