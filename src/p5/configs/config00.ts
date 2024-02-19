import { Config } from '../types';

import pixelRenderer from '../lib/renderers/pixelRenderer';
import metaballRenderer from '../lib/renderers/metaballRenderer';

import basicSample from '../lib/attributeFunctions/samplerFunctions/basicSample';

import brightnessRange from '../lib/attributeFunctions/conditionFunctions/brightnessRange';

import rasterDots from '../lib/attributeFunctions/shapeFunctions/rasterDots';
import pixelRects from '../lib/attributeFunctions/shapeFunctions/pixelRects';
import metaballParticles from '../lib/attributeFunctions/shapeFunctions/metaballParticles';

import singleColor from '../lib/attributeFunctions/colorFunctions/singleColor';

import rgb from '../lib/attributeFunctions/colorFunctions/rgb';

import translateRandom from '../lib/attributeFunctions/transformFunctions/translateRandom';

import noisePattern from '../lib/attributeFunctions/patternFunctions/noisePattern';

export const config: Config = {
  images: [
    'images/assets/' + 'IMG_20200926_123011.jpg',
    'images/assets/' + 'HauntedHouse6.png',
  ],
  //backgroundColor: [127, 63, 63],
  outputMultiplier: 0.5,
  resolutionX: 0,
  resolutionY: 0,
  outputGridUnitX: 0,
  outputGridUnitY: 0,
};

export const preset = {
  backgroundColor: [63, 127, 127],
  operations: [
    /*
  {
    sampler: matrixSampler,
    samplerConfig: {
      rasterSizeX: 64,
      rasterSizeY: 64,
      sampleRadius: 0,
      conditionF: brighterThan,
      threshold: 127,
      samplerF: simpleSample,
      samplerFFreq: [],
    },
    renderer: pixelRenderer,
    rendererConfig: {
      colorConfig: { colorF: singleColor, inputColor: [255,0,0,255]},
      shapeF: pixelRects,
      transformConfig: undefined,
      
     // {
     //   transformF: translateRandom,
     //   transformScaleXY: [32, 8],
     // },
      
      channels: [true, false, false, false],
      patternConfig: {
        patternF: noisePattern,
        patternResolutionXY: [8, 8],
        patternColor: { patternColorF: hsl_Shift180_inverted_40, inputColor: [255,0,0,255]},
      },
    },
  },*/

    //operation_whiteReplace,

    {
      samplerConfig: {
        imageIndex: 1,
        rasterSizeX: 62,
        rasterSizeY: 32,
        sampleRadius: 0,
        conditionF: brightnessRange,
        threshold: [120, 224],
        samplerF: basicSample,
        samplerFFreq: [1, 2],
      },
      renderer: metaballRenderer,
      rendererConfig: {
        blendMode: 'normal',
        colorConfig: { colorF: singleColor, inputColor: [255, 0, 0, 255] },
        shapeF: metaballParticles,
        transformConfig: {
          transformF: translateRandom,
          transformScaleXY: [4, 4],
        },
        channels: [true, false, false, false],
        patternConfig: {
          patternF: noisePattern,
          patternResolutionXY: [2, 2],
          patternColor: {
            patternColorF: singleColor,
            inputColor: [255, 255, 255, 255],
          },
        },
        metaballConfig: {
          metaballRasterSizeXY: [4, 4],
          evaluationDistanceRatio: 0.41,
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
        threshold: [0, 95],
        samplerF: basicSample,
        samplerFFreq: [1, 2],
      },
      renderer: pixelRenderer,
      rendererConfig: {
        blendMode: 'normal',
        colorConfig: { colorF: rgb, inputColor: undefined },
        shapeF: pixelRects,
        transformConfig: undefined,
        channels: [true, false, false, false],
        patternConfig: {
          patternF: noisePattern,
          patternResolutionXY: [2, 2],
          patternColor: {
            patternColorF: singleColor,
            inputColor: [255, 255, 255, 255],
          },
        },
        metaballConfig: undefined,
      },
    },
    {
      samplerConfig: {
        imageIndex: 1,
        rasterSizeY: 4,
        rasterSizeX: 4,
        sampleRadius: 1,
        conditionF: brightnessRange,
        threshold: [0, 255],
        samplerF: basicSample,
        samplerFFreq: [2, 1],
      },
      renderer: pixelRenderer,
      rendererConfig: {
        blendMode: 'normal',
        colorConfig: { colorF: singleColor, inputColor: [255, 255, 255, 255] },
        shapeF: rasterDots,
        transformConfig: undefined,
        channels: [true, true, false, false],
        patternConfig: undefined,
        metaballConfig: undefined,
      },
    },

    //operation_noisyDots,
  ],
};
