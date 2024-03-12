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
  // State controlling form
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

          passes: [true, false, false, false],
          patternConfig: undefined,
          metaballConfig: undefined,
        },
      },
    ],
  } as Preset);
  // State controlling output image
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

          passes: [true, false, false, false],
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
      <section id='files' className='files'>
        <h1>
          <div className='logo'></div>
          raster-composer
        </h1>
        <h4>{'Load Image'}</h4>
        <div>
          <input
            className='input-file'
            type='file'
            accept='image/*'
            onChange={(e) => handleImageUpload(e, setConfig)}
          />
        </div>

        <div className='display'>
          {config.images[0] && (
            <img
              className='src-image'
              alt='source image'
              src={config.images[0]}
            />
          )}
        </div>

        <h4>{'Load Preset'}</h4>
        <div>
          <input
            className='input-file'
            type='file'
            accept='.json'
            onChange={(e) => handlePresetUpload(e, lib, setPreset)}
          />
        </div>

        <div className='files-flex-line'>
          <h4>{'Save Preset'}</h4>
          <button
            className='download'
            type='button'
            onClick={() => handlePresetDownload(preset)}
          >
            Download
          </button>
        </div>

        <div id='save-output' className='files-flex-line'>
          <h4>Save Image</h4>
          {!config.images[0] && (
            <button
              className='download'
              type='button'
              style={{
                fontWeight: '600',
                letterSpacing: '0.05rem',
                color: 'var(--bg-color)',
              }}
            >
              Load Source Image First!
            </button>
          )}
        </div>
          <a className='guide-link' href='https://github.com/Tamas-Pal/raster-composer/blob/main/README.md' target='_blank'>
            {`< User Guide >`}
          </a>
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
