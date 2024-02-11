import hsl_Shift180_inverted_40 from '../../lib/attributeFunctions/colorFunctions/hsl_Shift180_inverted_40';
import darkerThan from '../../lib/attributeFunctions/conditionFunctions/darkerThan';
import simpleSample from '../../lib/attributeFunctions/samplerFunctions/simpleSample';
import rasterDots from '../../lib/attributeFunctions/shapeFunctions/rasterDots';
import translateRandom from '../../lib/attributeFunctions/transformFunctions/translateRandom';
import dotRenderer from '../../lib/renderers/dotRenderer';
import matrixSampler from '../../lib/samplers/matrixSampler';

export const operation_noisyDots = {
  sampler: matrixSampler,
  samplerConfig: {
    rasterSizeX: 8,
    rasterSizeY: 8,
    sampleRadius: 0,
    stepFX: undefined,
    stepFY: undefined,
    conditionF: darkerThan,
    threshold: [223],
    samplerF: simpleSample,
    samplerFParams: [],
  },
  renderer: dotRenderer,
  rendererConfig: {
    colorParams: { colorF: hsl_Shift180_inverted_40, inputColor: undefined },
    shapeF: rasterDots,
    transformParams: { transformF: translateRandom, transformScaleXY: [4, 4] },
    channels: [true, true, true, false],
    patternParams: undefined,
    metaballParams: undefined,
  },
};
