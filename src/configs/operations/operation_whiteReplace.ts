import hsl_Shift180_inverted_40 from '../../lib/attributeFunctions/colorFunctions/hsl_Shift180_inverted_40';
import justRed from '../../lib/attributeFunctions/colorFunctions/justRed';
import brighterThan from '../../lib/attributeFunctions/conditionFunctions/brighterThan';
import darkerThan from '../../lib/attributeFunctions/conditionFunctions/darkerThan';
import simpleSample from '../../lib/attributeFunctions/samplerFunctions/simpleSample';
import pixelRects from '../../lib/attributeFunctions/shapeFunctions/pixelRects';
import rasterDots from '../../lib/attributeFunctions/shapeFunctions/rasterDots';
import translateRandom from '../../lib/attributeFunctions/transformFunctions/translateRandom';
import dotRenderer from '../../lib/renderers/dotRenderer';
import pixelRenderer from '../../lib/renderers/pixelRenderer';
import matrixSampler from '../../lib/samplers/matrixSampler';

export const operation_whiteReplace = {
  sampler: matrixSampler,
  samplerConfig: {
    rasterSizeX: 12,
    rasterSizeY: 12,
    sampleRadius: 0,
    stepFX: undefined,
    stepFY: undefined,
    conditionF: brighterThan,
    threshold: 223,
    samplerF: simpleSample,
  },
  renderer: pixelRenderer,
  rendererConfig: {
    colorF: justRed,
    shapeF: pixelRects,
    transformF: undefined,
    patternColorF: undefined,
    patternF: undefined,
    patternResolution: 8,
    channels: [true, false, false, false],
  },
};
