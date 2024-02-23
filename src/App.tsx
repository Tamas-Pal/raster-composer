import { useState } from 'react';
import './App.css';
import { Config, Preset } from './p5/types';
import { defaultConfig } from './p5/configs/config-default';
import Sketch from './components/Sketch';
import { SettingsForm } from './components/SettingsForm';
import brightnessRange from './p5/lib/attributeFunctions/conditionFunctions/brightnessRange';
import basicSample from './p5/lib/attributeFunctions/samplerFunctions/basicSample';
import rgb from './p5/lib/attributeFunctions/colorFunctions/rgb';
import pixelRenderer from './p5/lib/renderers/pixelRenderer';
import pixelRects from './p5/lib/attributeFunctions/shapeFunctions/pixelRects';
import { handleDownload, handleImageUpload, handlePresetUpload } from './handlers/formHandlers';

function App() {
  const [config, setConfig] = useState(defaultConfig as Config);
  const [preset, setPreset] = useState({
    backgroundColor: [0, 0, 0, 0],
    operations: [
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
    ],
  } as Preset);

  // Create a new FileReader instance
  /*   const reader = new FileReader();

    // Define the callback function for the FileReader's onload event
    reader.onload = (e) => {
      // The result attribute contains the Data URL of the file
      if (e.target != null && e.target.result != null) {
        setSrcImg(e.target.result as string);
        setConfig((prevState => ({...prevState, images: [e.target?.result as string, prevState.images[1]]})))
      }
      // Now you can use the imageDataUrl to display the image or store it in your component's state
      // For example, if you have a state variable called imageDataUrl, you can update it like this:
      // setImageDataUrl(imageDataUrl);
    };

    // Read the contents of the file as a Data URL
    reader.readAsDataURL(file);
    */

  return (
    <>
      <section className='files'>
        <h3>{'Load Image'}</h3>
        <div>
          <input
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
            type='file'
            accept='.json'
            onChange={(e) => handlePresetUpload(e, setPreset)}
          />
        </div>
        <h3>{'Save Preset'}</h3>
        <button type='button' onClick={()=>handleDownload(preset)}>Download</button>
      </section>
      <section className='preset'>
        <SettingsForm preset={preset} setPreset={setPreset} />
      </section>
      <section className='output-image'>
        <Sketch config={config} preset={preset} />
        {/* <button>Update</button> */}
      </section>
    </>
  );
}

export default App;
