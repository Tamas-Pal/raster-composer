import { Config, Operations } from '../types';

import matrixSampler from '../lib/samplers/matrixSampler';

import dotRenderer from '../lib/renderers/dotRenderer';
import pixelRenderer from '../lib/renderers/pixelRenderer';
import metaballRenderer from '../lib/renderers/metaballRenderer';

import simpleSample from '../lib/attributeFunctions/samplerFunctions/simpleSample';
import repeatSample from '../lib/attributeFunctions/samplerFunctions/repeatSample';
import chaoticXSample from '../lib/attributeFunctions/samplerFunctions/chaoticXSample';
import chaoticYSample from '../lib/attributeFunctions/samplerFunctions/chaoticYSample';

import darkerThan from '../lib/attributeFunctions/conditionFunctions/darkerThan';
import lessOpaqueThan from '../lib/attributeFunctions/conditionFunctions/lessOpaqueThan';
import brightnessRange from '../lib/attributeFunctions/conditionFunctions/brightnessRange';
import brighterThan from '../lib/attributeFunctions/conditionFunctions/brighterThan';

import rasterDots from '../lib/attributeFunctions/shapeFunctions/rasterDots';
import pixelRects from '../lib/attributeFunctions/shapeFunctions/pixelRects';
import metaballParticles from '../lib/attributeFunctions/shapeFunctions/metaballParticles';

import singleColor from '../lib/attributeFunctions/colorFunctions/singleColor';
import channelToGrayscale from '../lib/attributeFunctions/colorFunctions/channelToGrayscale';
import channelToHue from '../lib/attributeFunctions/colorFunctions/channelToHue';
import hsl_Shift180_inverted_40 from '../lib/attributeFunctions/colorFunctions/hsl_Shift180_inverted_40';
import hsl_Shift120_100_50 from '../lib/attributeFunctions/colorFunctions/hsl_Shift120_100_50';
import rgb from '../lib/attributeFunctions/colorFunctions/rgb';
import transparent from '../lib/attributeFunctions/colorFunctions/transparent';
import khakiGradient from '../lib/attributeFunctions/colorFunctions/khakiGradient';

import translateRandom from '../lib/attributeFunctions/transformFunctions/translateRandom';

import noisePattern from '../lib/attributeFunctions/patternFunctions/noisePattern';
import checkerboardPattern from '../lib/attributeFunctions/patternFunctions/checkerboardPattern';

import { operation_noisyDots } from './operations/operation_noisyDots';
import { operation_whiteReplace } from './operations/operation_whiteReplace';
import { operation_chaoticYPixels } from './operations/operation_chaoticYPixels';
import { operation_chaoticXPixels } from './operations/operation_chaoticXPixels';

export let config: Config = {
  images: [
    'images/assets/' + '20130614129.jpg',
    'images/assets/' + 'HauntedHouse6.png',
  ],
  //backgroundColor: [127, 63, 63],
  backgroundColor: [63, 127, 127],
  outputMultiplier: 2,
  resolutionX: 0,
  resolutionY: 0,
  outputGridUnitX: 0,
  outputGridUnitY: 0,
};

export let operations: Operations = [
  //operation_chaoticYPixels,

  //operation_chaoticXPixels,

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
      samplerFParams: [],
    },
    renderer: pixelRenderer,
    rendererConfig: {
      colorParams: { colorF: singleColor, inputColor: [255,0,0,255]},
      shapeF: pixelRects,
      transformParams: undefined,
      
     // {
     //   transformF: translateRandom,
     //   transformScaleXY: [32, 8],
     // },
      
      channels: [true, false, false, false],
      patternParams: {
        patternF: noisePattern,
        patternResolutionXY: [8, 8],
        patternColor: { patternColorF: hsl_Shift180_inverted_40, inputColor: [255,0,0,255]},
      },
    },
  },*/

  //operation_whiteReplace,

  {
    sampler: matrixSampler,
    samplerConfig: {
      imageIndex: 0,
      rasterSizeX: 32,
      rasterSizeY: 32,
      sampleRadius: 0,
      conditionF: darkerThan,
      threshold: [40],
      samplerF: simpleSample,
      samplerFParams: [],
    },
    renderer: metaballRenderer,
    rendererConfig: {
      colorParams: { colorF: khakiGradient, inputColor: undefined },
      shapeF: metaballParticles,
      transformParams: undefined,
      channels: [true, false, false, false],
      patternParams: undefined,
      metaballParams: {
        metaballRasterSizeXY: [32, 8],
        evaluationDistanceRatio: 0.5,
      },
    },
  },

  {
    sampler: matrixSampler,
    samplerConfig: {
      imageIndex: 1,
      rasterSizeX: 62,
      rasterSizeY: 32,
      sampleRadius: 0,
      conditionF: brightnessRange,
      threshold: [120, 224],
      samplerF: repeatSample,
      samplerFParams: [1, 2],
    },
    renderer: metaballRenderer,
    rendererConfig: {
      colorParams: { colorF: singleColor, inputColor: [255, 0, 0, 255] },
      shapeF: metaballParticles,
      transformParams: {
        transformF: translateRandom,
        transformScaleXY: [4, 4],
      },
      channels: [true, false, false, false],
      patternParams: undefined,
      metaballParams: {
        metaballRasterSizeXY: [4, 4],
        evaluationDistanceRatio: 0.41,
      },
    },
  },

  {
    sampler: matrixSampler,
    samplerConfig: {
      imageIndex: 0,
      rasterSizeX: 4,
      rasterSizeY: 4,
      sampleRadius: 0,
      conditionF: brightnessRange,
      threshold: [0, 95],
      samplerF: repeatSample,
      samplerFParams: [1, 2],
    },
    renderer: pixelRenderer,
    rendererConfig: {
      colorParams: { colorF: rgb, inputColor: undefined },
      shapeF: pixelRects,
      transformParams: undefined,
      channels: [true, false, false, false],
      patternParams: {
        patternF: noisePattern,
        patternResolutionXY: [2, 2],
        patternColor: {
          patternColorF: singleColor,
          inputColor: [255, 255, 255, 255],
        },
      },
      metaballParams: undefined,
    },
  },
  {
    sampler: matrixSampler,
    samplerConfig: {
      imageIndex: 1,
      rasterSizeY: 4,
      rasterSizeX: 4,
      sampleRadius: 1,
      conditionF: brightnessRange,
      threshold: [0, 255],
      samplerF: repeatSample,
      samplerFParams: [2, 1],
    },
    renderer: pixelRenderer,
    rendererConfig: {
      colorParams: { colorF: singleColor, inputColor: [255, 255, 255, 255] },
      shapeF: rasterDots,
      transformParams: undefined,
      channels: [true, true, false, false],
      patternParams: undefined,
      metaballParams: undefined,
    },
  },

  //operation_noisyDots,
];
