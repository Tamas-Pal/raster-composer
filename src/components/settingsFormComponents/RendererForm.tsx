import { useState } from 'react';
import { Lib } from '../../utils/loadLib';
import PatternFunction from './rendererFormComponents/PatternFunction';
import TransformFunction from './rendererFormComponents/TransformFunction';
import ColorFunction from './rendererFormComponents/ColorFunction';
import MetaballConfig from './rendererFormComponents/MetaballConfig';
import ShapeFunction from './rendererFormComponents/ShapeFunction';

export default function RendererForm({
  lib
}: {
  lib: Lib;
}) {
  const [isMetaballRenderer, setIsMetaballRenderer] = useState(false);

  function handleRendererSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    e.currentTarget.value === 'metaballRenderer'
      ? setIsMetaballRenderer(true)
      : setIsMetaballRenderer(false);
  }

  return (
    <fieldset>
      <legend>
        <h3>Renderer</h3>
      </legend>
      <label>
        Renderer
        <select
          name='renderer'
          id='renderer'
          defaultValue='pixelRenderer'
          onChange={handleRendererSelect}
        >
          <option key='pixelRenderer' value='pixelRenderer'>
            {'pixelRenderer'}
          </option>
          {lib ? (
            lib.renderers.map((renderer) => {
              if (renderer.name !== 'pixelRenderer') {
                return (
                  <option key={renderer.name} value={renderer.name}>
                    {renderer.name}
                  </option>
                );
              }
            })
          ) : (
            <option>Data is being fetched...</option>
          )}
        </select>
        Blend Mode
        <select name='blend-mode' id='blend-mode'>
          <option value='normal'>normal</option>
          <option value='screen'>screen</option>
          <option value='multiply'>multiply</option>
          <option value='difference'>difference</option>
        </select>
        <div>
          Channels
          <span className='field-label'>R</span>
          <input
            className='checkbox-input'
            type='checkbox'
            name='channels-r'
            id='channels-r'
            defaultChecked
          />
          <span className='field-label'>G</span>
          <input
            className='checkbox-input'
            type='checkbox'
            name='channels-g'
            id='channels-g'
          />
          <span className='field-label'>B</span>
          <input
            className='checkbox-input'
            type='checkbox'
            name='channels-b'
            id='channels-b'
          />
          <span className='field-label'>A</span>
          <input
            className='checkbox-input'
            type='checkbox'
            name='channels-a'
            id='channels-a'
          />
        </div>
      </label>
      <ColorFunction lib={lib} />
      <ShapeFunction lib={lib} />
      <TransformFunction lib={lib} />
      <PatternFunction lib={lib} />
      {isMetaballRenderer && <MetaballConfig />}
    </fieldset>
  );
}
