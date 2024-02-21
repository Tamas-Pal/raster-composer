import { Fragment, useEffect, useState } from 'react';
import { Operation, Preset } from '../p5/types';
import { loadLib, Lib } from '../utils/loadLib';
import SamplerForm from './settingsFormComponents/SamplerForm';
import RendererForm from './settingsFormComponents/RendererForm';

export function SettingsForm({
  preset,
  handleNewLayer,
  handleDeleteLayer,
}: {
  preset: Preset;
  handleNewLayer: React.MouseEventHandler;
  handleDeleteLayer: React.MouseEventHandler;
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
    const formData = new FormData(e.currentTarget);
    console.log(e.currentTarget, formData);
  };

  const formOperations = preset.operations.map(
    (operation: Operation, index: number) => {
      console.log('preset', preset);

      return (
        <Fragment key={index}>
          <h3>{`Layer_${index + 1}`}</h3>
          <button type='button' id={`delete-layer-${index}`} onClick={handleDeleteLayer}>
            X
          </button>
          <SamplerForm lib={lib} />
          <RendererForm lib={lib} />
        </Fragment>
      );
    }
  );

  return (
    <>
      <h2>Settings</h2>
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
            defaultValue='255'
            required
          />
          <span className='field-label'>G</span>
          <input
            className='number-input'
            type='number'
            name='background-g'
            id='background-g'
            min='0'
            max='255'
            defaultValue='0'
            required
          />
          <span className='field-label'>B</span>
          <input
            className='number-input'
            type='number'
            name='background-b'
            id='background-b'
            min='0'
            max='255'
            defaultValue='0'
            required
          />
          <span className='field-label'>A</span>
          <input
            className='number-input'
            type='number'
            name='background-a'
            id='background-a'
            min='0'
            max='255'
            defaultValue='255'
            required
          />
        </label>
        {formOperations}

        <button type='button' onClick={handleNewLayer}>
          Add Layer
        </button>
        <button type='submit'>Update</button>
      </form>
    </>
  );
}
