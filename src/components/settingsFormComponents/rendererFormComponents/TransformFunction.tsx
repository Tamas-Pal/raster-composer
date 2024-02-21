import { useState } from 'react';
import { Lib } from '../../../utils/loadLib';

export default function TransformFunction({ lib }: { lib: Lib }) {
  const [hasTransform, setHasTransform] = useState(false);

  function handleChange() {
    setHasTransform(!hasTransform)
  }

  return (
    <label>
        <h4>
          <input
            type='checkbox'
            className='checkbox-input'
            name='has-transform'
            id='has-transform'
            checked={hasTransform}
            onChange={handleChange}
          />
          Transform Function
        </h4>
        {hasTransform && (
<>
Function
<select
  name='transformf'
  id='transformf'
  defaultValue='translateRandom'
>
  <option key='no-transform' value={undefined}>
    no transform
  </option>
  {lib ? (
    lib.attributeFunctions.transformFunctions.map((transformF) => {
      return (
        <option key={transformF.name} value={transformF.name}>
          {transformF.name}
        </option>
      );
    })
  ) : (
    <option>Data is being fetched...</option>
  )}
</select>
Scale <span className='field-label'>X</span>
<input
  className='number-input'
  type='number'
  name='transform-scale-0'
  id='transform-scale-0'
  defaultValue='0'
  required
/>
<span className='field-label'>Y</span>
<input
  className='number-input'
  type='number'
  name='transform-scale-1'
  id='transform-scale-1'
  defaultValue='0'
  required
/>
</>
        )}
      </label>
  );
}
