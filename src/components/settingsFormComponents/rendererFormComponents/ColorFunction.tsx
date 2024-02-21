import { useState } from 'react';
import { Lib } from '../../../utils/loadLib';

export default function ColorFunction({ lib }: { lib: Lib }) {
  const [hasInputColor, setHasInputColor] = useState(false);

  function handleColorFSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    e.currentTarget.value === 'channelToSaturation' ||
    e.currentTarget.value === 'singleColor'
      ? setHasInputColor(true)
      : setHasInputColor(false);
  }

  return (
    <label>
      <h4>Color Function</h4>
      Function
      <select
        name='colorF'
        id='colorF'
        defaultValue='rgb'
        onChange={handleColorFSelect}
      >
        <option key='rgb' value='rgb'>
          {'rgb'}
        </option>

        {lib ? (
          lib.attributeFunctions.colorFunctions.map((colorF) => {
            if (colorF.name !== 'rgb') {
              return (
                <option key={colorF.name} value={colorF.name}>
                  {colorF.name}
                </option>
              );
            }
          })
        ) : (
          <option>Data is being fetched...</option>
        )}
      </select>
      {hasInputColor && (
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
            defaultValue='255'
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
            defaultValue='0'
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
            defaultValue='0'
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
            defaultValue='255'
            required
          />
        </div>
      )}
    </label>
  );
}
