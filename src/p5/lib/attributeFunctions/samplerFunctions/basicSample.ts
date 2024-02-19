import { SamplerFParams } from '../../../types';

export default function basicSample(samplerFParams: SamplerFParams) {
  const {
    resolutionX,
    resolutionY,
    x,
    y,
    samplerFFreq = [1, 1],
  } = samplerFParams;
  const simpleSample =
    x * 4 * samplerFFreq[0] + y * resolutionX * 4 * samplerFFreq[1];
  return simpleSample % (resolutionX * resolutionY * 4);
}
