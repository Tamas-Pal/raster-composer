import { useEffect, useRef, useState } from 'react';
import { Config, Preset } from './p5/types';
import { defaultConfig } from './p5/configs/config-default';
import Sketch from './components/Sketch';
import { SettingsForm } from './components/SettingsForm';
import brightnessRange from './p5/lib/attributeFunctions/conditionFunctions/brightnessRange';
import basicSample from './p5/lib/attributeFunctions/samplerFunctions/basicSample';
import rgb from './p5/lib/attributeFunctions/colorFunctions/rgb';
import pixelRenderer from './p5/lib/renderers/pixelRenderer';
import pixelRects from './p5/lib/attributeFunctions/shapeFunctions/pixelRects';
import {
  handlePresetDownload,
  handleImageUpload,
  handlePresetUpload,
} from './handlers/formHandlers';
import { Lib, loadLib } from './utils/loadLib';

function App() {
  const [config, setConfig] = useState(defaultConfig as Config);
  const [preset, setPreset] = useState({
    outputWidth: 512,
    backgroundColor: [0, 0, 0, 0],
    operations: [
      {
        layerName: `Layer_0`,
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
    ],
  } as Preset);
  const [imagePreset, setImagePreset] = useState({
    outputWidth: 512,
    backgroundColor: [0, 0, 0, 0],
    operations: [
      {
        layerName: `Layer_0`,
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
    ],
  } as Preset);
  const [lib, setLib] = useState(null as Lib);
  useEffect(() => {
    const importLib = async () => {
      const libRes = await loadLib();
      setLib(libRes);
    };
    importLib();
  }, []);
  const updateRef = useRef<HTMLButtonElement>(null);
  function triggerUpdate() {
    updateRef.current?.click();
  }
  return (
    <>
      <section className='files'>
        <h1>raster-composer</h1>
        <h3>{'Load Image'}</h3>
        <div>
          <input
            className='input-file'
            type='file'
            accept='image/*'
            onChange={(e) => handleImageUpload(e, setConfig)}
          />
        </div>
        <div className='display'>
          {config.images[0] && <img src={config.images[0]} />}
        </div>
        <h3>{'Load Preset'}</h3>
        <div>
          <input
            className='input-file'
            type='file'
            accept='.json'
            onChange={(e) => handlePresetUpload(e, lib, setPreset)}
          />
        </div>
        <h3>{'Save Preset'}</h3>
        <button type='button' onClick={() => handlePresetDownload(preset)}>
          Download
        </button>
      </section>
      <section className='output-image'>
        <button
          id='update'
          ref={updateRef}
          onClick={() => setImagePreset(preset)}
        >
          Update
        </button>
        <Sketch
          config={config}
          preset={imagePreset}
          triggerUpdate={triggerUpdate}
        />
      </section>
      <section className='preset'>
        <SettingsForm lib={lib} preset={preset} setPreset={setPreset} />
      </section>
    </>
  );
}

export default App;
