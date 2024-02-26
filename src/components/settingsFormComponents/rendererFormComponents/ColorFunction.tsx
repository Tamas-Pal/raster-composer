import { Dispatch, SetStateAction } from 'react';
import { Lib } from '../../../utils/loadLib';
import { Preset, RendererConfig } from '../../../p5/types';
import {
  LibList,
  LibListItem,
  handleNumberInput,
  handleSelect,
} from '../../../handlers/formHandlers';
import rgb from '../../../p5/lib/attributeFunctions/colorFunctions/rgb';

export default function ColorFunction({
  lib,
  colorConfig,
  setPreset,
  index,
}: {
  lib: Lib;
  colorConfig: RendererConfig['colorConfig'];
  setPreset: Dispatch<SetStateAction<Preset>>;
  index: number;
}) {
  const pathStub = `operations[${index}].rendererConfig.colorConfig`;

  return (
    lib && (
      <label>
        <h4>Color Function</h4>
        Function
        <select
          name='colorF'
          id='colorF'
          onChange={(e) =>
            handleSelect(
              e,
              `operations[${index}].rendererConfig.colorConfig.colorF`,
              lib.attributeFunctions.colorFunctions as LibList,
              rgb as LibListItem,
              setPreset
            )
          }
          value={colorConfig.colorF.name}
        >
          <option key='rgb' value='rgb'>
            {'rgb'}
          </option>

          {lib.attributeFunctions.colorFunctions.map((colorF) => {
            if (colorF.name !== 'rgb') {
              return (
                <option key={colorF.name} value={colorF.name}>
                  {colorF.name}
                </option>
              );
            }
          })}
        </select>
        {['channelToSaturation', 'singleColor'].includes(
          colorConfig.colorF.name
        ) && (
          <div>
            Input Color
            <span className='field-label'>R</span>
            <input
              className='number-input'
              type='number'
              name='input-color-r'
              id='input-color-r'
              min='0'
              max='255'
              onChange={(e) =>
                handleNumberInput(e, `${pathStub}.inputColor[0]`, setPreset)
              }
              value={colorConfig.inputColor ? colorConfig.inputColor[0] : 255}
              required
            />
            <span className='field-label'>G</span>
            <input
              className='number-input'
              type='number'
              name='input-color-g'
              id='input-color-g'
              min='0'
              max='255'
              onChange={(e) =>
                handleNumberInput(e, `${pathStub}.inputColor[1]`, setPreset)
              }
              value={colorConfig.inputColor ? colorConfig.inputColor[1] : 0}
              required
            />
            <span className='field-label'>B</span>
            <input
              className='number-input'
              type='number'
              name='input-color-b'
              id='input-color-b'
              min='0'
              max='255'
              onChange={(e) =>
                handleNumberInput(e, `${pathStub}.inputColor[2]`, setPreset)
              }
              value={colorConfig.inputColor ? colorConfig.inputColor[2] : 0}
              required
            />
            <span className='field-label'>A</span>
            <input
              className='number-input'
              type='number'
              name='input-color-a'
              id='input-color-a'
              min='0'
              max='255'
              onChange={(e) =>
                handleNumberInput(e, `${pathStub}.inputColor[3]`, setPreset)
              }
              value={colorConfig.inputColor ? colorConfig.inputColor[3] : 255}
              required
            />
          </div>
        )}
      </label>
    )
  );
}
