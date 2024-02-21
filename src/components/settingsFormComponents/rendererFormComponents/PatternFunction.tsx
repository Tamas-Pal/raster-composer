import { useState } from 'react';
import { Lib } from '../../../utils/loadLib';

export default function PatternFunction({ lib }: { lib: Lib }) {
  const [hasPattern, setHasPattern] = useState(false);
  const [hasInputColor, setHasInputColor] = useState(false);

  function handleColorFSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    e.currentTarget.value === 'channelToSaturation' ||
    e.currentTarget.value === 'singleColor'
      ? setHasInputColor(true)
      : setHasInputColor(false);
  }


  function handlePatternFSelect() {
    setHasPattern(!hasPattern);
  }

  return (
    <label>
      <h4>
        <input
          type='checkbox'
          className='checkbox-input'
          name='has-pattern'
          id='has-pattern'
          onChange={handlePatternFSelect}
          checked={hasPattern}
        />
        Pattern Function
      </h4>
      {hasPattern && (
        <>
          Function
          <select
            name='patternf'
            id='patternf'
            defaultValue='checkerboardPattern'
          >
            {lib ? (
              lib.attributeFunctions.patternFunctions.map((patternF) => {
                return (
                  <option key={patternF.name} value={patternF.name}>
                    {patternF.name}
                  </option>
                );
              })
            ) : (
              <option>Data is being fetched...</option>
            )}
          </select>
          Resolution 
          <span className='field-label'>X</span>
          <input
            className='number-input'
            type='number'
            name='pattern-resolution-0'
            id='pattern-resolution-0'
            min='1'
            defaultValue='1'
            required
          />
          <span className='field-label'>Y</span>
          <input
            className='number-input'
            type='number'
            name='pattern-resolution-1'
            id='pattern-resolution-1'
            min='1'
            defaultValue='1'
            required
          />
          <div>
            Color Function
            <select
              name='pattern-colorF'
              id='pattern-colorF'
              defaultValue='rgb'
              onChange={handleColorFSelect}
            >
              <option key='rgb' value='rgb'>
          {'rgb'}
        </option>

        {lib ? (
          lib.attributeFunctions.colorFunctions.map((patternColorF) => {
            if (patternColorF.name !== 'rgb') {
              return (
                <option key={patternColorF.name} value={patternColorF.name}>
                  {patternColorF.name}
                </option>
              );
            }
          })
        ) : (
          <option>Data is being fetched...</option>
        )}
            </select>
          </div>
          {hasInputColor && (

          <div>
            Input Color 
            <span className='field-label'>R</span>
            <input
              className='number-input'
              type='number'
              name='pattern-input-color-r'
              id='pattern-input-color-r'
              min='0'
              max='255'
              defaultValue='255'
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
              defaultValue='0'
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
              defaultValue='0'
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
              defaultValue='255'
              required
            />
          </div>)}
        </>
      )}
    </label>
  );
}
