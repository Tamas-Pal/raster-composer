import { Config } from '../types';

import pixelRenderer from '../lib/renderers/pixelRenderer';

import basicSample from '../lib/attributeFunctions/samplerFunctions/basicSample';

import brightnessRange from '../lib/attributeFunctions/conditionFunctions/brightnessRange';

import pixelRects from '../lib/attributeFunctions/shapeFunctions/pixelRects';

import rgb from '../lib/attributeFunctions/colorFunctions/rgb';

export const defaultConfig: Config = {
  images: [''],
  outputMultiplier: 0.5,
  resolutionX: 0,
  resolutionY: 0,
  outputGridUnitX: 0,
  outputGridUnitY: 0,
};

export const defaultPreset = {
  outputWidth: 512,
  backgroundColor: [0, 0, 0, 0],
  operations: [
    {
      layerName: `Layer_0`,
      samplerConfig: {
        imageIndex: 0,
        rasterSizeX: 1,
        rasterSizeY: 1,
        sampleRadius: 0,
        conditionF: brightnessRange,
        threshold: [0, 255],
        samplerF: basicSample,
        samplerFFreq: [1, 1],
      },
      renderer: pixelRenderer,
      rendererConfig: {
        blendMode: 'normal',
        colorConfig: {
          colorF: rgb,
          inputColor: [255, 0, 0, 255],
        },
        shapeF: pixelRects,
        transformConfig: undefined,

        channels: [true, false, false, false],
        patternConfig: undefined,
        metaballConfig: undefined,
      },
    },
  ],
};
