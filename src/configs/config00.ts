import { Config, Operations } from '../types';

export let config: Config = {
  rasterSize: 2,
  outputMultiplier: 1,
  resX: 0,
  resY: 0,
  inputGridUnitX: 0,
  inputGridUnitY: 0,
  outputGridUnitX: 0,
  outputGridUnitY: 0,
};

export let operations: Operations = [
  {
    samplerConfig: {
      function: '',
      arguments: [],
    },
    renderConfig: {
      function: '',
      arguments: [],
    },
  },
];
