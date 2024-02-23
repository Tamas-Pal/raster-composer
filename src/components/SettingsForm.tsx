import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Operation, Preset } from '../p5/types';
import { loadLib, Lib } from '../utils/loadLib';
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
import BackgroundColor from './settingsFormComponents/BackgroundColor';

export function SettingsForm({
  preset,
  setPreset,
}: {
  preset: Preset;
  setPreset: Dispatch<SetStateAction<Preset>>;
}) {
  const [lib, setLib] = useState(null as Lib);
  useEffect(() => {
    const importLib = async () => {
      const libRes = await loadLib();
      setLib(libRes);
    };
    importLib();
  }, []);

  const formOperations = preset.operations.map(
    (operation: Operation, index: number) => {
      console.log('preset', preset);

      return (
        <div key={index} className={`operation`}>
          <h3>{`Layer_${index + 1}`}</h3>
          <button
            type='button'
            id={`delete-layer-${index}`}
            onClick={(e) => handleDeleteLayer(e, setPreset)}
          >
            X
          </button>
          {index > 0 && (
            <button
              type='button'
              id={`move-layer-up-${index}`}
              onClick={() => handleMoveLayer(-1, index, setPreset)}
            >
              ↑
            </button>
          )}
          {index < preset.operations.length - 1 && (
            <button
              type='button'
              id={`move-layer--down--${index}`}
              onClick={() => handleMoveLayer(1, index, setPreset)}
            >
              ↓
            </button>
          )}

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
      <h2>Settings</h2>
      {lib ? (
        <form id='form' onSubmit={onSubmit}>
          <BackgroundColor preset={preset} setPreset={setPreset} />
          {formOperations}

          <button
            type='button'
            onClick={() =>
              handleNewLayer(
                // add default operation deep copy
                {
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
          <button type='submit'>Update</button>
        </form>
      ) : (
        <h3>Loading library...</h3>
      )}
    </>
  );
}
