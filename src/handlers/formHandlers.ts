import { Dispatch, SetStateAction } from 'react';
import {
  ColorFunction,
  ConditionFunction,
  Config,
  Operation,
  PatternConfig,
  PatternFunction,
  Preset,
  SamplerFunction,
  ShapeFunction,
  TransformConfig,
  TransformFunction,
} from '../p5/types';
import set from 'lodash.set';
import { Renderer } from 'p5';

// File Operation Handlers

export function handleImageUpload(
  event: React.ChangeEvent<HTMLInputElement>,
  setConfig: Dispatch<SetStateAction<Config>>
) {
  let file: File;
  if (event.target.files != null) {
    file = event.target.files[0];
    setConfig((prevState) => ({
      ...prevState,
      images: [URL.createObjectURL(file) as string, prevState.images[1]],
    }));
  } else {
    return;
  }
}

export function handlePresetUpload(
  event: React.ChangeEvent<HTMLInputElement>,
  setPreset: Dispatch<SetStateAction<Preset>>
): void {
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
}

export function handleDownload(preset: Preset) {
  const jsonString = JSON.stringify(preset);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.download = `preset.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Layer Operation Handlers

export function handleNewLayer(
  defaultOperation: Operation,
  setPreset: Dispatch<SetStateAction<Preset>>
) {
  setPreset((prevState) => {
    const stateCopy = { ...prevState };
    stateCopy.operations.push(defaultOperation);
    //console.log(stateCopy);
    return stateCopy;
  });
}

export function handleDeleteLayer(
  e: React.MouseEvent<Element, MouseEvent>,
  setPreset: Dispatch<SetStateAction<Preset>>
) {
  const index = Number(
    (e.target as HTMLButtonElement).id.split('delete-layer-')[1]
  );
  setPreset((prevState) => {
    const stateCopy = { ...prevState };
    stateCopy.operations = stateCopy.operations
      .slice(0, index)
      .concat(stateCopy.operations.slice(index + 1));
    return stateCopy;
  });
}

export function handleMoveLayer(
  direction: number,
  index: number,
  setPreset: Dispatch<SetStateAction<Preset>>
) {
  const insertIndex = index + 1 * direction;
  setPreset((prevState) => {
    const stateCopy = { ...prevState };
    const toInsert = stateCopy.operations.splice(index, 1);
    stateCopy.operations.splice(insertIndex, 0, toInsert[0]);
    //console.log(index, insertIndex, stateCopy);

    return stateCopy;
  });
}

// Input and Submit Handlers

export function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}

export function handleNumberInput(
  e: React.FormEvent<HTMLInputElement>,
  path: string,
  setPreset: Dispatch<SetStateAction<Preset>>
) {
  setPreset((prevState) => {
    const stateCopy = { ...prevState };
    set(stateCopy, path, Number((e.target as HTMLInputElement).value));

    return stateCopy;
  });
}

export type LibListItem =
  | ConditionFunction
  | ColorFunction
  | PatternFunction
  | SamplerFunction
  | ShapeFunction
  | TransformFunction
  | Renderer
  | PatternConfig
  | TransformConfig
  | boolean
  | string[];

export type LibList =
  | ConditionFunction[]
  | ColorFunction[]
  | PatternFunction[]
  | SamplerFunction[]
  | ShapeFunction[]
  | TransformFunction[]
  | Renderer[]
  | string[];

export function handleToggle(
  e: React.ChangeEvent<HTMLInputElement>,
  path: string,
  defaultValue: LibListItem,
  setPreset: Dispatch<SetStateAction<Preset>>
) {
  e.preventDefault;
  const unchecked = typeof defaultValue === 'boolean' ? false : undefined;
  setPreset((prevState) => {
    const stateCopy = { ...prevState };
    e.target.checked
      ? set(stateCopy, path, defaultValue)
      : set(stateCopy, path, unchecked);
    return stateCopy;
  });
}

export function handleSelect(
  e: React.ChangeEvent<HTMLSelectElement>,
  path: string,
  libList: LibList,
  defaultValue: LibListItem,
  setPreset: Dispatch<SetStateAction<Preset>>
) {
  e.preventDefault();
  setPreset((prevState) => {
    const getFromLib = () => {
      if (libList) {
        for (const item of libList) {
          if (typeof item === 'function' && 'name' in item) {
            if (item.name === e.target.value) return item;
          } else {
            if (item === e.target.value) return item;
          }
        }
      }
      return defaultValue;
    };
    const stateCopy = { ...prevState };
    set(stateCopy, path, getFromLib());
    return stateCopy;
  });
}
/*
export const formHandlers = {
  handleNewLayer,
  handleDeleteLayer,
  handleNumberInput,
};
*/
