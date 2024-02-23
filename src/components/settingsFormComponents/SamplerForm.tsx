import { Lib } from '../../utils/loadLib';
import {
  LibList,
  LibListItem,
  handleNumberInput,
  handleSelect,
} from '../../handlers/formHandlers';
import { Operation, Preset } from '../../p5/types';
import { Dispatch, SetStateAction } from 'react';
import brightnessRange from '../../p5/lib/attributeFunctions/conditionFunctions/brightnessRange';
import basicSample from '../../p5/lib/attributeFunctions/samplerFunctions/basicSample';

export default function SamplerForm({
  lib,
  samplerConfig,
  setPreset,
  index,
}: {
  lib: Lib;
  samplerConfig: Operation['samplerConfig'];
  setPreset: Dispatch<SetStateAction<Preset>>;
  index: number;
}) {
  const pathStub = `operations[${index}].samplerConfig`;
  return (
    lib && (
      <fieldset>
        <legend>
          <h3>Sampler</h3>
        </legend>
        <div>
          Raster Size <span className='field-label'>X</span>
          <input
            className='number-input'
            type='number'
            name='raster-size-0'
            id='raster-size-0'
            min='1'
            //max='255' TODO
            required
            onChange={(e) =>
              handleNumberInput(e, `${pathStub}.rasterSizeX`, setPreset)
            }
            value={samplerConfig.rasterSizeX}
          />
          <span className='field-label'>Y</span>
          <input
            className='number-input'
            type='number'
            name='raster-size-1'
            id='raster-size-1'
            min='1'
            //max='255' TODO
            required
            onChange={(e) =>
              handleNumberInput(e, `${pathStub}.rasterSizeY`, setPreset)
            }
            value={samplerConfig.rasterSizeY}
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
            required
            onChange={(e) =>
              handleNumberInput(e, `${pathStub}.sampleRadius`, setPreset)
            }
            value={samplerConfig.sampleRadius}
          />
        </div>
        <label>
          <h4>Condition Function</h4>
          Function
          <select
            name='conditionf'
            id='conditionf'
            onChange={(e) =>
              handleSelect(
                e,
                `operations[${index}].samplerConfig.conditionF`,
                lib!.attributeFunctions.conditionFunctions as LibList,
                brightnessRange as LibListItem,
                setPreset
              )
            }
            value={samplerConfig.conditionF.name}
          >
            <option key='brightnessRange' value='brightnessRange'>
              {'brightnessRange'}
            </option>
            {lib.attributeFunctions.conditionFunctions.map((conditionF) => {
              if (conditionF.name !== 'brightnessRange') {
                return (
                  <option key={conditionF.name} value={conditionF.name}>
                    {conditionF.name}
                  </option>
                );
              }
            })}
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
              required
              onChange={(e) =>
                handleNumberInput(e, `${pathStub}.threshold[0]`, setPreset)
              }
              value={samplerConfig.threshold[0]}
            />
            <input
              className='number-input'
              type='number'
              name='threshold-1'
              id='threshold-1'
              min='0'
              max='255'
              required
              onChange={(e) =>
                handleNumberInput(e, `${pathStub}.threshold[1]`, setPreset)
              }
              value={samplerConfig.threshold[1]}
            />
          </div>
        </label>
        <label>
          <h3>Sampler Function</h3>
          Function
          <select
            name='samplerf'
            id='samplerf'
            onChange={(e) =>
              handleSelect(
                e,
                `operations[${index}].samplerConfig.samplerF`,
                lib!.attributeFunctions.samplerFunctions as LibList,
                basicSample as LibListItem,
                setPreset
              )
            }
            value={samplerConfig.samplerF.name}
          >
            <option key='basicSample' value='basicSample'>
              {'basicSample'}
            </option>
            {lib.attributeFunctions.samplerFunctions.map((samplerF) => {
              return (
                <option key={samplerF.name} value={samplerF.name}>
                  {samplerF.name}
                </option>
              );
            })}
          </select>
          <div>
            Sampler Frequency <span className='field-label'>X</span>
            <input
              className='number-input'
              type='number'
              name='samplerf-freq-0'
              id='samplerf-freq-0'
              required
              onChange={(e) =>
                handleNumberInput(e, `${pathStub}.samplerFFreq[0]`, setPreset)
              }
              value={
                samplerConfig.samplerFFreq ? samplerConfig.samplerFFreq[0] : 0
              }
            />
            <span className='field-label'>Y</span>
            <input
              className='number-input'
              type='number'
              name='samplerf-freq-1'
              id='samplerf-freq-1'
              required
              onChange={(e) =>
                handleNumberInput(e, `${pathStub}.samplerFFreq[1]`, setPreset)
              }
              value={
                samplerConfig.samplerFFreq ? samplerConfig.samplerFFreq[1] : 0
              }
            />
          </div>
        </label>
      </fieldset>
    )
  );
}
