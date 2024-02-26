import { Dispatch, SetStateAction } from 'react';
import { Operation, Preset } from '../p5/types';
import { Lib } from '../utils/loadLib';
import SamplerForm from './settingsFormComponents/SamplerForm';
import RendererForm from './settingsFormComponents/RendererForm';
import {
  handleNewLayer,
  handleDeleteLayer,
  onSubmit,
  handleMoveLayer,
} from '../handlers/formHandlers';
import brightnessRange from '../p5/lib/attributeFunctions/conditionFunctions/brightnessRange';
import basicSample from '../p5/lib/attributeFunctions/samplerFunctions/basicSample';
import rgb from '../p5/lib/attributeFunctions/colorFunctions/rgb';
import pixelRenderer from '../p5/lib/renderers/pixelRenderer';
import pixelRects from '../p5/lib/attributeFunctions/shapeFunctions/pixelRects';
import MainSettings from './settingsFormComponents/MainSettings';

export function SettingsForm({
  lib,
  preset,
  setPreset,
}: {
  lib: Lib;
  preset: Preset;
  setPreset: Dispatch<SetStateAction<Preset>>;
}) {
  const formOperations = preset.operations.map(
    (operation: Operation, index: number) => {
      console.log('preset', preset);

      return (
        <div key={index} className={`operation`}>
          <div className='layer-title'>
            <h3>{operation.layerName}</h3>
            <div className='layer-buttons'>
              {index > 0 && (
                <button
                  className='layer-button arrow-button'
                  type='button'
                  id={`move-layer-up-${index}`}
                  onClick={() => handleMoveLayer(-1, index, setPreset)}
                >
                <span className='arrow'>←</span>
                </button>
              )}
              {index < preset.operations.length - 1 && (
                <button
                  className='layer-button arrow-button'
                  type='button'
                  id={`move-layer--down--${index}`}
                  onClick={() => handleMoveLayer(1, index, setPreset)}
                >
                 <span className='arrow'>→</span>
                </button>
              )}
              <button
                type='button'
                className='layer-button'
                id={`delete-layer-${index}`}
                onClick={(e) => handleDeleteLayer(e, setPreset)}
              >
                X
              </button>
            </div>
          </div>

          <SamplerForm
            lib={lib}
            samplerConfig={operation.samplerConfig}
            setPreset={setPreset}
            index={index}
          />
          <RendererForm
            lib={lib}
            renderer={operation.renderer}
            rendererConfig={operation.rendererConfig}
            setPreset={setPreset}
            index={index}
          />
        </div>
      );
    }
  );

  return (
    <>
      {lib ? (
        <form id='form' onSubmit={onSubmit}>
          <div className='main-settings'>
            <h2>Settings</h2>
            <MainSettings preset={preset} setPreset={setPreset} />
            <button
              type='button'
              className='add-layer'
              onClick={() =>
                handleNewLayer(
                  // add default operation deep copy
                  {
                    layerName: `Layer_${preset.operations.length}`,
                    samplerConfig: {
                      imageIndex: 0,
                      rasterSizeX: 1,
                      rasterSizeY: 1,
                      sampleRadius: 0,
                      conditionF: brightnessRange,
                      threshold: [0, 255],
                      samplerF: basicSample,
                      samplerFFreq: [1, 1],
                    },
                    renderer: pixelRenderer,
                    rendererConfig: {
                      blendMode: 'normal',
                      colorConfig: {
                        colorF: rgb,
                        inputColor: [0, 0, 0, 0],
                      },
                      shapeF: pixelRects,
                      transformConfig: undefined,

                      channels: [true, false, false, false],
                      patternConfig: undefined,
                      metaballConfig: undefined,
                    },
                  },
                  // state setter
                  setPreset
                )
              }
            >
              Add Layer
            </button>
          </div>

          {formOperations}
        </form>
      ) : (
        <h3>Loading library...</h3>
      )}
    </>
  );
}
