import { Dispatch, SetStateAction } from 'react';
import { Lib } from '../../../utils/loadLib';
import { Preset, RendererConfig } from '../../../p5/types';
import {
  LibList,
  LibListItem,
  handleNumberInput,
  handleSelect,
  handleToggle,
} from '../../../handlers/formHandlers';
import translateRandom from '../../../p5/lib/attributeFunctions/transformFunctions/translateRandom';

export default function TransformFunction({
  lib,
  transformConfig,
  setPreset,
  index,
}: {
  lib: Lib;
  transformConfig: RendererConfig['transformConfig'];
  setPreset: Dispatch<SetStateAction<Preset>>;
  index: number;
}) {
  const pathStub = `operations[${index}].rendererConfig.transformConfig`;

  return (
    lib && (
      <label>
        <h4>
          <input
            type='checkbox'
            className='checkbox-input'
            name='has-transform'
            id='has-transform'
            checked={transformConfig !== undefined}
            onChange={(e) =>
              handleToggle(
                e,
                pathStub,
                {
                  transformF: translateRandom,
                  transformScaleXY: [0, 0],
                },
                setPreset
              )
            }
          />
          Transform Function
        </h4>
        {transformConfig !== undefined && (
          <>
            Function
            <select
              name='transformf'
              id='transformf'
              onChange={(e) =>
                handleSelect(
                  e,
                  `operations[${index}].rendererConfig.transformConfig.transformF`,
                  lib.attributeFunctions.transformFunctions as LibList,
                  translateRandom as LibListItem,
                  setPreset
                )
              }
              value={transformConfig.transformF.name}
            >
              {lib.attributeFunctions.transformFunctions.map((transformF) => {
                return (
                  <option key={transformF.name} value={transformF.name}>
                    {transformF.name}
                  </option>
                );
              })}
            </select>
            Scale <span className='field-label'>X</span>
            <input
              className='number-input'
              type='number'
              name='transform-scale-0'
              id='transform-scale-0'
              onChange={(e) =>
                handleNumberInput(
                  e,
                  `${pathStub}.transformScaleXY[0]`,
                  setPreset
                )
              }
              value={transformConfig ? transformConfig.transformScaleXY[0] : 0}
              required
            />
            <span className='field-label'>Y</span>
            <input
              className='number-input'
              type='number'
              name='transform-scale-1'
              id='transform-scale-1'
              onChange={(e) =>
                handleNumberInput(
                  e,
                  `${pathStub}.transformScaleXY[1]`,
                  setPreset
                )
              }
              value={transformConfig ? transformConfig.transformScaleXY[1] : 0}
              required
            />
          </>
        )}
      </label>
    )
  );
}
