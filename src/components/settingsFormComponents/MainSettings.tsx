import { Dispatch, SetStateAction } from 'react';
import { handleNumberInput } from '../../handlers/formHandlers';
import { Preset } from '../../p5/types';

export default function MainSettings({
  preset,
  setPreset,
}: {
  preset: Preset;
  setPreset: Dispatch<SetStateAction<Preset>>;
}) {
  return (
    <fieldset>
      <legend>
        <h3>Main Settings</h3>
      </legend>
      <label>
        <h4>Output Width</h4>
        <input
          className='number-input'
          type='number'
          name='output-width'
          id='output-width'
          min='1'
          required
          onChange={(e) => handleNumberInput(e, 'outputWidth', setPreset)}
          value={preset.outputWidth}
        />
      </label>
      <label>
        <h4>Background Color</h4>
        <span className='field-label'>R</span>
        <input
          className='number-input'
          type='number'
          name='background-r'
          id='background-r'
          min='0'
          max='255'
          required
          onChange={(e) =>
            handleNumberInput(e, 'backgroundColor[0]', setPreset)
          }
          value={preset.backgroundColor[0]}
        />
        <span className='field-label'>G</span>
        <input
          className='number-input'
          type='number'
          name='background-g'
          id='background-g'
          min='0'
          max='255'
          required
          onChange={(e) =>
            handleNumberInput(e, 'backgroundColor[1]', setPreset)
          }
          value={preset.backgroundColor[1]}
        />
        <span className='field-label'>B</span>
        <input
          className='number-input'
          type='number'
          name='background-b'
          id='background-b'
          min='0'
          max='255'
          required
          onChange={(e) =>
            handleNumberInput(e, 'backgroundColor[2]', setPreset)
          }
          value={preset.backgroundColor[2]}
        />
        <span className='field-label'>A</span>
        <input
          className='number-input'
          type='number'
          name='background-a'
          id='background-a'
          min='0'
          max='255'
          required
          onChange={(e) =>
            handleNumberInput(e, 'backgroundColor[3]', setPreset)
          }
          value={preset.backgroundColor[3]}
        />
      </label>
      
    </fieldset>
  );
}
