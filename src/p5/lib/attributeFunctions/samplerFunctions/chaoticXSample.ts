import { SamplerFParams } from '../../../types';

export default function chaoticXSample(samplerFParams: SamplerFParams) {
  const { resolutionX, resolutionY, x, y, samplerFFreq } = samplerFParams;
  const simpleSample = (x * 2 * y * samplerFFreq[0] + y * resolutionX * 4 * samplerFFreq[1]) * 4;
  return simpleSample % (resolutionX * resolutionY * 4);
}
