import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { Operation, Preset } from '../p5/types';
import { loadLib, Lib } from '../utils/loadLib';
import SamplerForm from './settingsFormComponents/SamplerForm';
import RendererForm from './settingsFormComponents/RendererForm';
import {
  handleNewLayer,
  handleDeleteLayer,
  handleNumberInput,
} from '../handlers/formHandlers';
import { preset as defaultPreset } from '../p5/configs/config-default';

export function SettingsForm({
  preset,
  setPreset,
}: //  formHandlers,
{
  preset: Preset;
  setPreset: Dispatch<SetStateAction<Preset>>;
  // formHandlers: {
  //   handleNewLayer: React.MouseEventHandler;
  //   handleDeleteLayer: React.MouseEventHandler;
  // };
}) {
  const [lib, setLib] = useState(null as Lib);
  useEffect(() => {
    const importLib = async () => {
      const libRes = await loadLib();
      setLib(libRes);
    };
    importLib();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const formOperations = preset.operations.map(
    (operation: Operation, index: number) => {
      console.log('preset', preset);

      return (
        <Fragment key={index}>
          <h3>{`Layer_${index + 1}`}</h3>
          <button
            type='button'
            id={`delete-layer-${index}`}
            onClick={(e) => handleDeleteLayer(e, setPreset)}
          >
            X
          </button>
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
        </Fragment>
      );
    }
  );

  return (
    <>
      <h2>Settings</h2>
      {lib ? (
        <form id='form' onSubmit={onSubmit}>
          <label>
            <h4>Background Color</h4>
            <span className='field-label'>R</span>
            <input
              className='number-input'
              type='number'
              name='background-r'
              id='background-r'
              min='0'
              max='255'
              required
              onChange={(e) =>
                handleNumberInput(e, 'backgroundColor[0]', setPreset)
              }
              value={preset.backgroundColor[0]}
            />
            <span className='field-label'>G</span>
            <input
              className='number-input'
              type='number'
              name='background-g'
              id='background-g'
              min='0'
              max='255'
              required
              onChange={(e) =>
                handleNumberInput(e, 'backgroundColor[1]', setPreset)
              }
              value={preset.backgroundColor[1]}
            />
            <span className='field-label'>B</span>
            <input
              className='number-input'
              type='number'
              name='background-b'
              id='background-b'
              min='0'
              max='255'
              required
              onChange={(e) =>
                handleNumberInput(e, 'backgroundColor[2]', setPreset)
              }
              value={preset.backgroundColor[2]}
            />
            <span className='field-label'>A</span>
            <input
              className='number-input'
              type='number'
              name='background-a'
              id='background-a'
              min='0'
              max='255'
              required
              onChange={(e) =>
                handleNumberInput(e, 'backgroundColor[3]', setPreset)
              }
              value={preset.backgroundColor[3]}
            />
          </label>
          {formOperations}

          <button
            type='button'
            onClick={() => handleNewLayer(defaultPreset, setPreset)}
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
