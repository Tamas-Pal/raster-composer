import { Config } from '../types';

import pixelRenderer from '../lib/renderers/pixelRenderer';

import basicSample from '../lib/attributeFunctions/samplerFunctions/basicSample';

import brightnessRange from '../lib/attributeFunctions/conditionFunctions/brightnessRange';

import rasterDots from '../lib/attributeFunctions/shapeFunctions/rasterDots';
import pixelRects from '../lib/attributeFunctions/shapeFunctions/pixelRects';
import metaballParticles from '../lib/attributeFunctions/shapeFunctions/metaballParticles';

import hsl_Shift120_100_50 from '../lib/attributeFunctions/colorFunctions/hsl_Shift120_100_50';
import rgb from '../lib/attributeFunctions/colorFunctions/rgb';
import khakiGradient from '../lib/attributeFunctions/colorFunctions/khakiGradient';

import translateRandom from '../lib/attributeFunctions/transformFunctions/translateRandom';

import noisePattern from '../lib/attributeFunctions/patternFunctions/noisePattern';

import channelToSaturation from '../lib/attributeFunctions/colorFunctions/channelToSaturation';
import blueRange from '../lib/attributeFunctions/conditionFunctions/blueRange';

export const config: Config = {
  images: [
    'images/assets/' + 'IMG_20200928_151250.jpg',
    'images/assets/' + 'HauntedHouse6.png',
  ],
  outputMultiplier: 0.5,
  resolutionX: 0,
  resolutionY: 0,
  outputGridUnitX: 0,
  outputGridUnitY: 0,
};

export const preset = {
  backgroundColor: [63, 127, 127],
  operations: [
    {
      samplerConfig: {
        imageIndex: 0,
        rasterSizeX: 16,
        rasterSizeY: 8,
        sampleRadius: 0,
        conditionF: blueRange,
        threshold: [175, 255],
        samplerF: basicSample,
        samplerFFreq: [1, 1],
      },
      renderer: pixelRenderer,
      rendererConfig: {
        blendMode: 'normal',
        colorConfig: {
          colorF: channelToSaturation,
          inputColor: [160, 160, 127, 255],
        },
        shapeF: metaballParticles,
        transformConfig: undefined,
        /*
      {
        transformF: translateRandom,
        transformScaleXY: [4, 4],
      },
      */
        channels: [false, true, false, false],
        patternConfig: {
          patternF: noisePattern,
          patternResolutionXY: [2, 2],
          patternColor: {
            patternColorF: khakiGradient,
            inputColor: [255, 255, 255, 255],
          },
        },
        metaballConfig: {
          metaballRasterSizeXY: [4, 4],
          evaluationDistanceRatio: 0.42,
        },
      },
    },
    {
      samplerConfig: {
        imageIndex: 0,
        rasterSizeX: 4,
        rasterSizeY: 4,
        sampleRadius: 0,
        conditionF: brightnessRange,
        threshold: [0, 127],
        samplerF: basicSample,
        samplerFFreq: [1, 1],
      },
      renderer: pixelRenderer,
      rendererConfig: {
        blendMode: 'normal',
        colorConfig: { colorF: rgb, inputColor: [192, 127, 0, 255] },
        shapeF: pixelRects,
        transformConfig: undefined,
        channels: [true, false, false, false],
        patternConfig: undefined,
        metaballConfig: {
          metaballRasterSizeXY: [2, 4],
          evaluationDistanceRatio: 0.55,
        },
      },
    },
    {
      samplerConfig: {
        imageIndex: 0,
        rasterSizeX: 4,
        rasterSizeY: 4,
        sampleRadius: 0,
        conditionF: brightnessRange,
        threshold: [127, 255],
        samplerF: basicSample,
        samplerFFreq: [1, 1],
      },
      renderer: pixelRenderer,
      blendMode: 'multiply',
      rendererConfig: {
        colorConfig: {
          colorF: hsl_Shift120_100_50,
          inputColor: [192, 160, 32, 255],
        },
        shapeF: rasterDots,
        transformConfig: {
          transformF: translateRandom,
          transformScaleXY: [4, 4],
        },
        channels: [true, true, true, false],
        patternConfig: undefined,
        metaballConfig: {
          metaballRasterSizeXY: [2, 4],
          evaluationDistanceRatio: 0.55,
        },
      },
    },
  ],
};
