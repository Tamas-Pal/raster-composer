import { Dispatch, SetStateAction } from 'react';
import { handleNumberInput } from '../../../handlers/formHandlers';
import { Preset, RendererConfig } from '../../../p5/types';
export default function MetaballConfig({
  metaballConfig,
  setPreset,
  index,
}: {
  metaballConfig: RendererConfig['metaballConfig'];
  setPreset: Dispatch<SetStateAction<Preset>>;
  index: number;
}) {
  const pathStub = `operations[${index}].rendererConfig.metaballConfig`;
  return (
    <label>
      <h4>Metaball</h4>
      <div className='flex-line'>
        <span className='field-title'>Metaball Raster Size</span>
        <span className='field-label'>X</span>
        <input
          className='number-input'
          type='number'
          name='metaball-raster-size-0'
          id='metaball-raster-size-0'
          min='1'
          onChange={(e) =>
            handleNumberInput(
              e,
              `${pathStub}.metaballRasterSizeXY[0]`,
              setPreset
            )
          }
          value={metaballConfig ? metaballConfig.metaballRasterSizeXY[0] : 16}
          required
        />
        <span className='field-label'>Y</span>
        <input
          className='number-input'
          type='number'
          name='metaball-raster-size-1'
          id='metaball-raster-size-1'
          min='1'
          onChange={(e) =>
            handleNumberInput(
              e,
              `${pathStub}.metaballRasterSizeXY[1]`,
              setPreset
            )
          }
          value={metaballConfig ? metaballConfig.metaballRasterSizeXY[1] : 16}
          required
        />
      </div>
      <div className='flex-line'>
        <span className='field-title'>Evaluation Distance Ratio</span>
        <input
          className='number-input'
          type='number'
          name='evaluation-distance-ratio'
          id='evaluation-distance-ratio'
          min='0.01'
          max='1.00'
          step='0.01'
          onChange={(e) =>
            handleNumberInput(
              e,
              `${pathStub}.evaluationDistanceRatio`,
              setPreset
            )
          }
          value={metaballConfig ? metaballConfig.evaluationDistanceRatio : 0.5}
          required
        />
      </div>
    </label>
  );
}
