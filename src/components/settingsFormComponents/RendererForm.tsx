import { Dispatch, SetStateAction } from 'react';
import { Lib } from '../../utils/loadLib';
import PatternFunction from './rendererFormComponents/PatternFunction';
import TransformFunction from './rendererFormComponents/TransformFunction';
import ColorFunction from './rendererFormComponents/ColorFunction';
import MetaballConfig from './rendererFormComponents/MetaballConfig';
import ShapeFunction from './rendererFormComponents/ShapeFunction';
import pixelRenderer from '../../p5/lib/renderers/pixelRenderer';
import { Operation, Preset } from '../../p5/types';
import {
  LibList,
  LibListItem,
  handleSelect,
  handleToggle,
} from '../../handlers/formHandlers';

export default function RendererForm({
  lib,
  renderer,
  rendererConfig,
  setPreset,
  index,
}: {
  lib: Lib;
  renderer: Operation['renderer'];
  rendererConfig: Operation['rendererConfig'];
  setPreset: Dispatch<SetStateAction<Preset>>;
  index: number;
}) {
  function initMetaball(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'metaballRenderer') {
      setPreset((prevState) => {
        const stateCopy = { ...prevState };
        stateCopy.operations[index].rendererConfig.metaballConfig = {
          metaballRasterSizeXY: [16, 16],
          evaluationDistanceRatio: 0.5,
        };
        return stateCopy;
      });
    }
  }

  return (
    lib && (
      <fieldset>
        <legend>
          <h3>Renderer</h3>
        </legend>
        <label>
          Renderer
          <select
            name='renderer'
            id='renderer'
            onChange={(e) => {
              initMetaball(e)
              handleSelect(
                e,
                `operations[${index}].renderer`,
                lib.renderers as LibList,
                pixelRenderer as LibListItem,
                setPreset
              );
            }}
            value={renderer.name}
          >
            <option key='pixelRenderer' value='pixelRenderer'>
              {'pixelRenderer'}
            </option>
            {lib.renderers.map((renderer) => {
              if (renderer.name !== 'pixelRenderer') {
                return (
                  <option key={renderer.name} value={renderer.name}>
                    {renderer.name}
                  </option>
                );
              }
            })}
          </select>
          Blend Mode
          <select
            name='blend-mode'
            id='blend-mode'
            onChange={(e) =>
              handleSelect(
                e,
                `operations[${index}].rendererConfig.blendMode`,
                ['normal', 'screen', 'multiply', 'difference'] as LibList,
                pixelRenderer as LibListItem,
                setPreset
              )
            }
            value={rendererConfig.blendMode}
          >
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
              checked={rendererConfig.channels[0]}
              onChange={(e) =>
                handleToggle(
                  e,
                  `operations[${index}].rendererConfig.channels[0]`,
                  true,
                  setPreset
                )
              }
            />
            <span className='field-label'>G</span>
            <input
              className='checkbox-input'
              type='checkbox'
              name='channels-g'
              id='channels-g'
              checked={rendererConfig.channels[1]}
              onChange={(e) =>
                handleToggle(
                  e,
                  `operations[${index}].rendererConfig.channels[1]`,
                  true,
                  setPreset
                )
              }
            />
            <span className='field-label'>B</span>
            <input
              className='checkbox-input'
              type='checkbox'
              name='channels-b'
              id='channels-b'
              checked={rendererConfig.channels[2]}
              onChange={(e) =>
                handleToggle(
                  e,
                  `operations[${index}].rendererConfig.channels[2]`,
                  true,
                  setPreset
                )
              }
            />
            <span className='field-label'>A</span>
            <input
              className='checkbox-input'
              type='checkbox'
              name='channels-a'
              id='channels-a'
              checked={rendererConfig.channels[3]}
              onChange={(e) =>
                handleToggle(
                  e,
                  `operations[${index}].rendererConfig.channels[3]`,
                  true,
                  setPreset
                )
              }
            />
          </div>
        </label>
        <ColorFunction
          lib={lib}
          colorConfig={rendererConfig.colorConfig}
          setPreset={setPreset}
          index={index}
        />
        <ShapeFunction
          lib={lib}
          rendererConfig={rendererConfig}
          setPreset={setPreset}
          index={index}
        />
        <TransformFunction
          lib={lib}
          transformConfig={rendererConfig.transformConfig}
          setPreset={setPreset}
          index={index}
        />
        <PatternFunction
          lib={lib}
          patternConfig={rendererConfig.patternConfig}
          setPreset={setPreset}
          index={index}
        />
        {renderer.name === 'metaballRenderer' && (
          <MetaballConfig
            metaballConfig={rendererConfig.metaballConfig}
            setPreset={setPreset}
            index={index}
          />
        )}
      </fieldset>
    )
  );
}
