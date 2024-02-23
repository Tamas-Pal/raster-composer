import { useState } from 'react';
import './App.css';
import { Config, Preset } from './p5/types';
import {
  config as defaultConfig,
  preset as defaultPreset,
} from './p5/configs/config-default';
import Sketch from './components/Sketch';
import { SettingsForm } from './components/SettingsForm';

function App() {
  const [config, setConfig] = useState(defaultConfig as Config);
  const [preset, setPreset] = useState(defaultPreset as Preset);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    let file: File;
    if (event.target.files != null) {
      file = event.target.files[0];
      setConfig((prevState) => ({
        ...prevState,
        images: [URL.createObjectURL(file) as string, prevState.images[1]],
      }));
    } else {
      return;
    } // No file was selected

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
  }

  const handlePresetUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (typeof e.target?.result === 'string') {
        try {
          const loadedPreset: Preset = JSON.parse(e.target.result);
          // Update state with the loaded preset
          setPreset(loadedPreset);
        } catch (error) {
          console.error('Error parsing JSON', error);
        }
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <section className='src-image'>
        <h2>{'Load an Image'}</h2>
        <div>
          <input type='file' accept='image/*' onChange={handleImageUpload} />
        </div>
        <div className='display'>
          {config.images[0] && <img src={config.images[0]} />}
        </div>
      </section>
      <section className='preset'>
        <h2>{'Load a Preset'}</h2>
        <div>
          <input type='file' accept='.json' onChange={handlePresetUpload} />
        </div>
        <div className='display'>
          {/* {preset && <p>{JSON.stringify(preset)}</p>} */}
          <SettingsForm
            preset={preset}
            setPreset={setPreset}
            //formHandlers={formHandlers}
            //handleNewLayer={() => handleNewLayer(defaultPreset, setPreset)}
            //handleDeleteLayer={(e) => handleDeleteLayer(e, setPreset)}
            //handleNumberInput={()}
          />
        </div>
      </section>
      <section className='output-image'>
        <Sketch config={config} preset={preset} />
        {/* <button>Update</button> */}
      </section>
    </>
  );
}

export default App;
