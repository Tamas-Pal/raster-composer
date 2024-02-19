import hsl_Shift180_inverted_40 from '../../lib/attributeFunctions/colorFunctions/hsl_Shift180_inverted_40';
import brighterThan from '../../lib/attributeFunctions/conditionFunctions/brighterThan';
import basicSample from '../../lib/attributeFunctions/samplerFunctions/basicSample';
import pixelRects from '../../lib/attributeFunctions/shapeFunctions/pixelRects';
import pixelRenderer from '../../lib/renderers/pixelRenderer';

export const operation_whiteReplace = {
  samplerConfig: {
    rasterSizeX: 16,
    rasterSizeY: 96,
    sampleRadius: 0,
    stepFX: undefined,
    stepFY: undefined,
    conditionF: brighterThan,
    threshold: [200],
    samplerF: basicSample,
    samplerFFreq: [1,1],
  },
  renderer: pixelRenderer,
  rendererConfig: {
    blendMode: 'normal',
    colorConfig: { colorF: hsl_Shift180_inverted_40, inputColor: undefined },
    shapeF: pixelRects,
    transformConfig: undefined,
    channels: [true, false, false, false],
    patternConfig: undefined,
    metaballConfig: undefined,
  },
};
