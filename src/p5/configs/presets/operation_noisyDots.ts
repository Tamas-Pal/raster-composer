import hsl_Shift180_inverted_40 from '../../lib/attributeFunctions/colorFunctions/hsl_Shift180_inverted_40';
import darkerThan from '../../lib/attributeFunctions/conditionFunctions/darkerThan';
import basicSample from '../../lib/attributeFunctions/samplerFunctions/basicSample';
import rasterDots from '../../lib/attributeFunctions/shapeFunctions/rasterDots';
import translateRandom from '../../lib/attributeFunctions/transformFunctions/translateRandom';
import pixelRenderer from '../../lib/renderers/pixelRenderer';


export const operation_noisyDots = {
  samplerConfig: {
    rasterSizeX: 8,
    rasterSizeY: 8,
    sampleRadius: 0,
    stepFX: undefined,
    stepFY: undefined,
    conditionF: darkerThan,
    threshold: [223],
    samplerF: basicSample,
    samplerFFreq: [1,1],
  },
  renderer: pixelRenderer,
  rendererConfig: {
    blendMode: 'multiply',
    colorConfig: { colorF: hsl_Shift180_inverted_40, inputColor: undefined },
    shapeF: rasterDots,
    transformConfig: { transformF: translateRandom, transformScaleXY: [4, 4] },
    channels: [true, true, true, false],
    patternConfig: undefined,
    metaballConfig: undefined,
  },
};
