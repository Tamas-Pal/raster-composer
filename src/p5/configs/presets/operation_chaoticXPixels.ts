import rgb from '../../lib/attributeFunctions/colorFunctions/rgb';
import brighterThan from '../../lib/attributeFunctions/conditionFunctions/brighterThan';
import chaoticXSample from '../../lib/attributeFunctions/samplerFunctions/chaoticXSample';
import pixelRects from '../../lib/attributeFunctions/shapeFunctions/pixelRects';
import pixelRenderer from '../../lib/renderers/pixelRenderer';

export const operation_chaoticXPixels = {
  samplerConfig: {
    rasterSizeX: 8,
    rasterSizeY: 1,
    sampleRadius: 0,
    stepFX: undefined,
    stepFY: undefined,
    conditionF: brighterThan,
    threshold: [127],
    samplerF: chaoticXSample,
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
