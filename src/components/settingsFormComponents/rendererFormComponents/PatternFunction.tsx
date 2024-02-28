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
import rgb from '../../../p5/lib/attributeFunctions/colorFunctions/rgb';
import checkerboardPattern from '../../../p5/lib/attributeFunctions/patternFunctions/checkerboardPattern';
import crossPattern from '../../../p5/lib/attributeFunctions/patternFunctions/crossPattern.';

export default function PatternFunction({
  lib,
  patternConfig,
  setPreset,
  index,
}: {
  lib: Lib;
  patternConfig: RendererConfig['patternConfig'];
  setPreset: Dispatch<SetStateAction<Preset>>;
  index: number;
}) {
  const pathStub = `operations[${index}].rendererConfig.patternConfig`;

  return (
    lib && (
      <>
          <h4>
          <input
            type='checkbox'
            className='checkbox-input'
            name='has-pattern'
            id='has-pattern'
            onChange={(e) =>
              handleToggle(
                e,
                pathStub,
                {
                  patternF: checkerboardPattern,
                  patternResolutionXY: [1, 1],
                  patternColor: {
                    patternColorF: rgb,
                    inputColor: [255, 0, 0, 255],
                  },
                },
                setPreset
              )
            }
            checked={patternConfig !== undefined}
          />
            Pattern Function</h4>
        <label>
          {patternConfig !== undefined && (
            <>
              <div className='flex-line'>
                <span className='field-title'>Function</span>
                <select
                  name='patternf'
                  id='patternf'
                  onChange={(e) =>
                    handleSelect(
                      e,
                      `operations[${index}].rendererConfig.patternConfig.patternF`,
                      lib.attributeFunctions.patternFunctions as LibList,
                      crossPattern as LibListItem,
                      setPreset
                    )
                  }
                  value={patternConfig.patternF.name}
                >
                  {lib.attributeFunctions.patternFunctions.map((patternF) => {
                    return (
                      <option key={patternF.name} value={patternF.name}>
                        {patternF.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='flex-line'>
                <span className='field-title'>Resolution</span>
                <span className='field-label'>X</span>
                <input
                  className='number-input'
                  type='number'
                  name='pattern-resolution-0'
                  id='pattern-resolution-0'
                  min='1'
                  onChange={(e) =>
                    handleNumberInput(
                      e,
                      `${pathStub}.patternResolutionXY[0]`,
                      setPreset
                    )
                  }
                  value={
                    patternConfig ? patternConfig.patternResolutionXY[0] : 1
                  }
                  required
                />
                <span className='field-label'>Y</span>
                <input
                  className='number-input'
                  type='number'
                  name='pattern-resolution-1'
                  id='pattern-resolution-1'
                  min='1'
                  onChange={(e) =>
                    handleNumberInput(
                      e,
                      `${pathStub}.patternResolutionXY[1]`,
                      setPreset
                    )
                  }
                  value={
                    patternConfig ? patternConfig.patternResolutionXY[1] : 1
                  }
                  required
                />
              </div>
              <div className='flex-line'>
                <span className='field-title'>Color Function</span>
                <select
                  name='pattern-colorF'
                  id='pattern-colorF'
                  onChange={(e) =>
                    handleSelect(
                      e,
                      `operations[${index}].rendererConfig.patternConfig.patternColor.patternColorF`,
                      lib.attributeFunctions.colorFunctions as LibList,
                      rgb as LibListItem,
                      setPreset
                    )
                  }
                  value={patternConfig.patternColor.patternColorF.name}
                >
                  <option key='rgb' value='rgb'>
                    {'rgb'}
                  </option>

                  {lib.attributeFunctions.colorFunctions.map(
                    (patternColorF) => {
                      if (patternColorF.name !== 'rgb') {
                        return (
                          <option
                            key={patternColorF.name}
                            value={patternColorF.name}
                          >
                            {patternColorF.name}
                          </option>
                        );
                      }
                    }
                  )}
                </select>
              </div>
              {['channelToSaturation', 'singleColor'].includes(
                patternConfig.patternColor.patternColorF.name
              ) && (
                <div className='flex-line'>
                  <span className='field-title'>Input Color</span>
                  <span className='field-label'>R</span>
                  <input
                    className='number-input'
                    type='number'
                    name='pattern-input-color-r'
                    id='pattern-input-color-r'
                    min='0'
                    max='255'
                    onChange={(e) =>
                      handleNumberInput(
                        e,
                        `${pathStub}.patternColor.inputColor[0]`,
                        setPreset
                      )
                    }
                    value={
                      patternConfig && patternConfig.patternColor.inputColor
                        ? patternConfig.patternColor.inputColor[0]
                        : 0
                    }
                    required
                  />
                  <span className='field-label'>G</span>
                  <input
                    className='number-input'
                    type='number'
                    name='pattern-input-color-g'
                    id='pattern-input-color-g'
                    min='0'
                    max='255'
                    onChange={(e) =>
                      handleNumberInput(
                        e,
                        `${pathStub}.patternColor.inputColor[1]`,
                        setPreset
                      )
                    }
                    value={
                      patternConfig && patternConfig.patternColor.inputColor
                        ? patternConfig.patternColor.inputColor[1]
                        : 0
                    }
                    required
                  />
                  <span className='field-label'>B</span>
                  <input
                    className='number-input'
                    type='number'
                    name='pattern-input-color-b'
                    id='pattern-input-color-b'
                    min='0'
                    max='255'
                    onChange={(e) =>
                      handleNumberInput(
                        e,
                        `${pathStub}.patternColor.inputColor[2]`,
                        setPreset
                      )
                    }
                    value={
                      patternConfig && patternConfig.patternColor.inputColor
                        ? patternConfig.patternColor.inputColor[2]
                        : 0
                    }
                    required
                  />
                  <span className='field-label'>A</span>
                  <input
                    className='number-input'
                    type='number'
                    name='pattern-input-color-a'
                    id='pattern-input-color-a'
                    min='0'
                    max='255'
                    onChange={(e) =>
                      handleNumberInput(
                        e,
                        `${pathStub}.patternColor.inputColor[3]`,
                        setPreset
                      )
                    }
                    value={
                      patternConfig && patternConfig.patternColor.inputColor
                        ? patternConfig.patternColor.inputColor[3]
                        : 0
                    }
                    required
                  />
                </div>
              )}
            </>
          )}
        </label>
      </>
    )
  );
}
