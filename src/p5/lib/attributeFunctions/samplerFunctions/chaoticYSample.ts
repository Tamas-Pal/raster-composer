import { SamplerFParams } from '../../../types';

export default function chaoticYSample(samplerFParams: SamplerFParams) {
  const { resolutionX, resolutionY, x, y, samplerFFreq } = samplerFParams;
  const simpleSample = x * 4 * samplerFFreq[0] + y * resolutionX * 2 * samplerFFreq[1] * -x;
  return simpleSample % (resolutionX * resolutionY * 4);
}
