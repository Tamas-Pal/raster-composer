import { Fragment, useEffect, useState } from 'react';
import { Operation, Preset } from '../p5/types';
import { loadLib, Lib } from '../utils/loadLib';
import SamplerForm from './settingsFormComponents/SamplerForm';
import RendererForm from './settingsFormComponents/RendererForm';

export function SettingsForm({ preset }: { preset: Preset }) {
  const [lib, setLib] = useState(null as Lib);
  useEffect(() => {
    const importLib = async () => {
      const libRes = await loadLib();
      setLib(libRes);
    };
    importLib();
  }, []);
  const formElements = preset.operations.map(
    (operation: Operation, index: number) => {
      console.log(lib);
      return (
        <Fragment key={index}>
          <h3>{`Layer_${index + 1}`}</h3>
          <SamplerForm
            lib={lib}
            operation={operation}
            //conditionFunctions={lib!.attributeFunctions.conditionFunctions}
            //samplerFunctions={lib!.attributeFunctions.samplerFunctions}
          />
          <RendererForm lib={lib} operation={operation} />
        </Fragment>
      );
    }
  );

  return (
    <>
      <h2>Settings</h2>
      <form>
        <label>
          <h4>Background Color</h4>R{' '}
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
          G{' '}
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
          B{' '}
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
          A{' '}
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
        {formElements}
      </form>
      <button>Add Layer</button>

    </>
  );
}
