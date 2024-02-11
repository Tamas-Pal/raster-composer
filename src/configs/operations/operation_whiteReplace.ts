import hsl_Shift180_inverted_40 from '../../lib/attributeFunctions/colorFunctions/hsl_Shift180_inverted_40';
import justRed from '../../lib/attributeFunctions/colorFunctions/justRed';
import brighterThan from '../../lib/attributeFunctions/conditionFunctions/brighterThan';
import darkerThan from '../../lib/attributeFunctions/conditionFunctions/darkerThan';
import noisePattern from '../../lib/attributeFunctions/patternFunctions/noisePattern';
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
    rasterSizeX: 16,
    rasterSizeY: 96,
    sampleRadius: 0,
    stepFX: undefined,
    stepFY: undefined,
    conditionF: brighterThan,
    threshold: [200],
    samplerF: simpleSample,
    samplerFParams: [],
  },
  renderer: pixelRenderer,
  rendererConfig: {
    colorParams: { colorF: hsl_Shift180_inverted_40, inputColor: undefined },
    shapeF: pixelRects,
    transformParams: undefined,
    channels: [true, false, false, false],
    patternParams: undefined,
    metaballParams: undefined,
  },
};
