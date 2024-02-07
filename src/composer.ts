import { config, operations } from './configs/config00.js';
import matrixSampler from './operations/samplers/matrixSampler.js';
import channelIterator from './operations/samplers/channelIterator.js';
import dotRenderer from './operations/renderers/dotRenderer.js';

export default composer = () => {
  operations.map((operation) => {
    let sampler;
    let renderer;
    if ((operation.renderConfig.function = 'dotRenderer')) {
        renderer = dotRenderer;
    }
    if ((operation.samplerConfig.function = 'matrixSampler')) {
      sampler = (channel?: number) => (matrixSampler(
        config.outputGridUnitX,
        config.outputGridUnitY,
        sampleRange,
        channel,
        pixels,
        renderFunction));
        
      }
      if (channelIterator) {
        sampler = channelIterator(sampler())
      }
  });
};
