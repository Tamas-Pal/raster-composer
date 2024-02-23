import { Dispatch, SetStateAction } from 'react';
import { Lib } from '../../../utils/loadLib';
import { Preset, RendererConfig } from '../../../p5/types';
import {
  LibList,
  LibListItem,
  handleSelect,
} from '../../../handlers/formHandlers';
import pixelRects from '../../../p5/lib/attributeFunctions/shapeFunctions/pixelRects';

export default function ShapeFunction({
  lib,
  rendererConfig,
  setPreset,
  index,
}: {
  lib: Lib;
  rendererConfig: RendererConfig;
  setPreset: Dispatch<SetStateAction<Preset>>;
  index: number;
}) {
  return (
    lib && (
      <label>
        <h4>Shape Function</h4>
        Function
        <select
          name='shapef'
          id='shapef'
          onChange={(e) =>
            handleSelect(
              e,
              `operations[${index}].rendererConfig.shapeF`,
              lib!.attributeFunctions.shapeFunctions as LibList,
              pixelRects as LibListItem,
              setPreset
            )
          }
          value={rendererConfig.shapeF.name}
        >
          <option key='pixelRects' value='pixelRects'>
            {'pixelRects'}
          </option>
          {lib.attributeFunctions.shapeFunctions.map((shapeF) => {
            if (shapeF.name !== 'pixelRects') {
              return (
                <option key={shapeF.name} value={shapeF.name}>
                  {shapeF.name}
                </option>
              );
            }
          })}
        </select>
      </label>
    )
  );
}
