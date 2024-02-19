import rgb from '../../lib/attributeFunctions/colorFunctions/rgb';
import brighterThan from '../../lib/attributeFunctions/conditionFunctions/brighterThan';
import chaoticYSample from '../../lib/attributeFunctions/samplerFunctions/chaoticYSample';
import pixelRects from '../../lib/attributeFunctions/shapeFunctions/pixelRects';
import pixelRenderer from '../../lib/renderers/pixelRenderer';

export const operation_chaoticYPixels = {
  samplerConfig: {
    rasterSizeX: 16,
    rasterSizeY: 1,
    sampleRadius: 0,
    stepFX: undefined,
    stepFY: undefined,
    conditionF: brighterThan,
    threshold: [127],
    samplerF: chaoticYSample,
    samplerFFreq: [],
  },
  renderer: pixelRenderer,
  rendererConfig: {
    blendMode: 'normal',
    colorConfig: { colorF: rgb, inputColor: undefined },
    shapeF: pixelRects,
    transformConfig: undefined,
    channels: [true, false, false, false],
    patternConfig: undefined,
    metaballConfig: undefined,
  },
};
