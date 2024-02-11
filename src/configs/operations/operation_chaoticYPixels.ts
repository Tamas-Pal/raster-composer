import hsl_Shift180_inverted_40 from '../../lib/attributeFunctions/colorFunctions/hsl_Shift180_inverted_40';
import justRed from '../../lib/attributeFunctions/colorFunctions/justRed';
import rgb from '../../lib/attributeFunctions/colorFunctions/rgb';
import brighterThan from '../../lib/attributeFunctions/conditionFunctions/brighterThan';
import darkerThan from '../../lib/attributeFunctions/conditionFunctions/darkerThan';
import chaoticXSample from '../../lib/attributeFunctions/samplerFunctions/chaoticXSample';
import chaoticYSample from '../../lib/attributeFunctions/samplerFunctions/chaoticYSample';
import repeatSample from '../../lib/attributeFunctions/samplerFunctions/repeatSample';
import simpleSample from '../../lib/attributeFunctions/samplerFunctions/simpleSample';
import pixelRects from '../../lib/attributeFunctions/shapeFunctions/pixelRects';
import rasterDots from '../../lib/attributeFunctions/shapeFunctions/rasterDots';
import translateRandom from '../../lib/attributeFunctions/transformFunctions/translateRandom';
import dotRenderer from '../../lib/renderers/dotRenderer';
import pixelRenderer from '../../lib/renderers/pixelRenderer';
import matrixSampler from '../../lib/samplers/matrixSampler';

export const operation_chaoticYPixels = {
  sampler: matrixSampler,
  samplerConfig: {
    rasterSizeX: 16,
    rasterSizeY: 1,
    sampleRadius: 0,
    stepFX: undefined,
    stepFY: undefined,
    conditionF: brighterThan,
    threshold: [127],
    samplerF: chaoticYSample,
    samplerFParams: [],
  },
  renderer: pixelRenderer,
  rendererConfig: {
    colorParams: { colorF: rgb, inputColor: undefined },
    shapeF: pixelRects,
    transformParams: undefined,
    channels: [true, false, false, false],
    patternParams: undefined,
    metaballParams: undefined,
  },
};
