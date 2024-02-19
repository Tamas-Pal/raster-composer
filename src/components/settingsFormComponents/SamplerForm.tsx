import { Operation } from '../../p5/types';
import { Lib } from '../../utils/loadLib';

export default function SamplerForm({
  lib,
  operation,
}: {
  lib: Lib;
  operation: Operation;
}) {
  return (
    <fieldset>
      <legend><h3>Sampler</h3></legend>
      <div>
        Raster Size XY
        <input
          className='number-input'
          type='number'
          name='raster-size-0'
          id='raster-size-0'
          min='1'
          //max='255' TODO
          defaultValue='16'
          required
        />
        <input
          className='number-input'
          type='number'
          name='raster-size-1'
          id='raster-size-1'
          min='1'
          //max='255' TODO
          defaultValue='16'
          required
        />
        </div>
        <div>
        Sample Radius
        <input
          className='number-input'
          type='number'
          name='raster-size-0'
          id='raster-size-0'
          min='0'
          //max='255' TODO
          defaultValue='0'
          required
        />
        </div>
      <label>
        <h4>Condition Function</h4>
        Function
        <select name='conditionf' id='conditionf' defaultValue='brightnessRange'>
          {lib ? (
            lib.attributeFunctions.conditionFunctions.map((conditionF) => {
              return (
                <option key={conditionF.name} value={conditionF.name}>
                  {conditionF.name}
                </option>
              );
            })
          ) : (
            <option>Data is being fetched...</option>
          )}
        </select>
        <div>
        Threshold
        <input
          className='number-input'
          type='number'
          name='threshold-0'
          id='threshold-0'
          min='0'
          max='255'
          defaultValue='0'
          required
        />
        <input
          className='number-input'
          type='number'
          name='threshold-1'
          id='threshold-1'
          min='0'
          max='255'
          defaultValue='255'
          required
        />
        </div>
      </label>
      <label>
        <h3>Sampler Function</h3>
        Function
        <select name='samplerf' id='samplerf' defaultValue='basicSample'>
          {lib ? (
            lib.attributeFunctions.samplerFunctions.map((samplerF) => {
              return (
                <option key={samplerF.name} value={samplerF.name}>
                  {samplerF.name}
                </option>
              );
            })
          ) : (
            <option>Data is being fetched...</option>
          )}
        </select>
        <div>
        Sampler Frequency XY
        <input
          className='number-input'
          type='number'
          name='samplerf-freq-0'
          id='samplerf-freq-0'
          defaultValue='1'
          required
        />
        <input
          className='number-input'
          type='number'
          name='samplerf-freq-1'
          id='samplerf-freq-1'
          defaultValue='1'
          required
        />
        </div>
      </label>
    </fieldset>
  );
}
