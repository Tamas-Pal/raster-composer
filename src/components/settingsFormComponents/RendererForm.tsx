import channelToSaturation from '../../p5/lib/attributeFunctions/colorFunctions/channelToSaturation';
import singleColor from '../../p5/lib/attributeFunctions/colorFunctions/singleColor';
import { Operation } from '../../p5/types';
import { Lib } from '../../utils/loadLib';

export default function RendererForm({
  lib,
  operation,
}: {
  lib: Lib;
  operation: Operation;
}) {
  // TODO - toggle options
  const hasInputColor =
    operation.rendererConfig.colorConfig.colorF === channelToSaturation &&
    operation.rendererConfig.colorConfig.colorF === singleColor;
  const hasTransformF = true;
  const hasPatternF = true;
  const isMetaball = true;

  return (
    <fieldset>
      <legend>
        <h3>Renderer</h3>
      </legend>
      <label>
        Renderer
        <select name='renderer' id='renderer' defaultValue='pixelRenderer'>
          {lib ? (
            lib.renderers.map((renderer) => {
              return (
                <option key={renderer.name} value={renderer.name}>
                  {renderer.name}
                </option>
              );
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
        <div>
          Channels R{' '}
          <input
            className='checkbox-input'
            type='checkbox'
            name='channels-r'
            id='channels-r'
            checked
          />
          G{' '}
          <input
            className='checkbox-input'
            type='checkbox'
            name='channels-g'
            id='channels-g'
          />
          B{' '}
          <input
            className='checkbox-input'
            type='checkbox'
            name='channels-b'
            id='channels-b'
          />
          A{' '}
          <input
            className='checkbox-input'
            type='checkbox'
            name='channels-a'
            id='channels-a'
          />
        </div>
      </label>
      <label>
        <h4>Color Function</h4>
        Function
        <select name='colorF' id='colorF' defaultValue='rgb'>
          {lib ? (
            lib.attributeFunctions.colorFunctions.map((colorF) => {
              return (
                <option key={colorF.name} value={colorF.name}>
                  {colorF.name}
                </option>
              );
            })
          ) : (
            <option>Data is being fetched...</option>
          )}
        </select>
        <div>
          Input Color R{' '}
          <input
            className='number-input'
            type='number'
            name='input-color-r'
            id='input-color-r'
            min='0'
            max='255'
            defaultValue='255'
            disabled={!hasInputColor}
            required
          />
          G{' '}
          <input
            className='number-input'
            type='number'
            name='input-color-g'
            id='input-color-g'
            min='0'
            max='255'
            defaultValue='0'
            disabled={!hasInputColor}
            required
          />
          B{' '}
          <input
            className='number-input'
            type='number'
            name='input-color-b'
            id='input-color-b'
            min='0'
            max='255'
            defaultValue='0'
            disabled={!hasInputColor}
            required
          />
          A{' '}
          <input
            className='number-input'
            type='number'
            name='input-color-a'
            id='input-color-a'
            min='0'
            max='255'
            defaultValue='255'
            disabled={!hasInputColor}
            required
          />
        </div>
      </label>
      <label>
        <h4>Shape Function</h4>
        Function
        <select name='shapef' id='shapef' defaultValue='pixelRects'>
          {lib ? (
            lib.attributeFunctions.shapeFunctions.map((shapeF) => {
              return (
                <option key={shapeF.name} value={shapeF.name}>
                  {shapeF.name}
                </option>
              );
            })
          ) : (
            <option>Data is being fetched...</option>
          )}
        </select>
      </label>
      <label>
        <h4>
        <input
          type='checkbox'
          className='checkbox-input'
          name='has-transform'
          id='has-transform'
        />
          Transform Function</h4>
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
        Scale X
        <input
          className='number-input'
          type='number'
          name='transform-scale-0'
          id='transform-scale-0'
          defaultValue='0'
          disabled={!hasTransformF}
          required
        />
        Y
        <input
          className='number-input'
          type='number'
          name='transform-scale-1'
          id='transform-scale-1'
          defaultValue='0'
          disabled={!hasTransformF}
          required
        />
      </label>
      <label>
        <h4>
        <input
          type='checkbox'
          className='checkbox-input'
          name='has-pattern'
          id='has-pattern'
        />
          Pattern Function</h4>
        Function
        <select
          name='patternf'
          id='patternf'
          defaultValue='checkerboardPattern'
          disabled={!hasPatternF}
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
        Resolution X
        <input
          className='number-input'
          type='number'
          name='pattern-resolution-0'
          id='pattern-resolution-0'
          min='1'
          defaultValue='1'
          disabled={!hasPatternF}
          required
        />
        Y
        <input
          className='number-input'
          type='number'
          name='pattern-resolution-1'
          id='pattern-resolution-1'
          min='1'
          defaultValue='1'
          disabled={!hasPatternF}
          required
        />
        <div>

        Color Function
        <select
          name='pattern-colorF'
          id='pattern-colorF'
          defaultValue='rgb'
          disabled={!hasPatternF}
        >
          {lib ? (
            lib.attributeFunctions.colorFunctions.map((patternColorF) => {
              return (
                <option key={patternColorF.name} value={patternColorF.name}>
                  {patternColorF.name}
                </option>
              );
            })
          ) : (
            <option>Data is being fetched...</option>
          )}
        </select>
        </div>
        <div>
          Input Color R{' '}
          <input
            className='number-input'
            type='number'
            name='pattern-input-color-r'
            id='pattern-input-color-r'
            min='0'
            max='255'
            defaultValue='255'
            disabled={!hasPatternF}
            required
          />
          G{' '}
          <input
            className='number-input'
            type='number'
            name='pattern-input-color-g'
            id='pattern-input-color-g'
            min='0'
            max='255'
            defaultValue='0'
            disabled={!hasPatternF}
            required
          />
          B{' '}
          <input
            className='number-input'
            type='number'
            name='pattern-input-color-b'
            id='pattern-input-color-b'
            min='0'
            max='255'
            defaultValue='0'
            disabled={!hasPatternF}
            required
          />
          A{' '}
          <input
            className='number-input'
            type='number'
            name='pattern-input-color-a'
            id='pattern-input-color-a'
            min='0'
            max='255'
            defaultValue='255'
            disabled={!hasPatternF}
            required
          />
        </div>
      </label>
      <label>
        <h4>Metaball</h4>
        <div>
          Metaball Raster Size X
          <input
            className='number-input'
            type='number'
            name='metaball-raster-size-0'
            id='metaball-raster-size-0'
            min='1'
            defaultValue='8'
            disabled={!isMetaball}
            required
          />
          Y
          <input
            className='number-input'
            type='number'
            name='metaball-raster-size-1'
            id='metaball-raster-size-1'
            min='1'
            defaultValue='8'
            disabled={!isMetaball}
            required
          />
        </div>
        <div>
          Evaluation Distance Ratio
          <input
            className='number-input'
            type='number'
            name='evaluation-distance-ratio'
            id='evaluation-distance-ratio'
            min='0.01'
            max='1'
            defaultValue='0.5'
            disabled={!isMetaball}
            required
          />
        </div>
      </label>
    </fieldset>
  );
}
