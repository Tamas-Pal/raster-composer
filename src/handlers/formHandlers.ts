import { Dispatch, SetStateAction } from 'react';
import {
  ColorFunction,
  ConditionFunction,
  Config,
  MetaballConfig,
  Operation,
  PatternConfig,
  PatternFunction,
  Preset,
  RendererConfig,
  SamplerConfig,
  SamplerFunction,
  ShapeFunction,
  TransformConfig,
  TransformFunction,
} from '../p5/types';
import set from 'lodash.set';
import { Renderer } from 'p5';
import cloneDeep from 'lodash.clonedeep';
import { Lib } from '../utils/loadLib';

// Library import types

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
  | string
  | string[];

export type LibListFunction =
  | ConditionFunction
  | ColorFunction
  | PatternFunction
  | SamplerFunction
  | ShapeFunction
  | TransformFunction
  | Renderer;

export type LibList =
  | ConditionFunction[]
  | ColorFunction[]
  | PatternFunction[]
  | SamplerFunction[]
  | ShapeFunction[]
  | TransformFunction[]
  | Renderer[]
  | string[];

// recursive lookup type

type PresetPart = {
  [key: string]:
    | number[]
    | Operation[]
    | Operation
    | RendererConfig
    | SamplerConfig
    | number
    | string
    | ConditionFunction
    | ColorFunction
    | PatternFunction
    | SamplerFunction
    | ShapeFunction
    | TransformFunction
    | Renderer
    | PatternConfig
    | TransformConfig
    | MetaballConfig
    | boolean[]
    | boolean
    | undefined;
};

// File Operation Handlers

export function handleImageUpload(
  event: React.ChangeEvent<HTMLInputElement>,
  setConfig: Dispatch<SetStateAction<Config>>
) {
  let file: File;
  if (event.target.files != null) {
    file = event.target.files[0];
    if (file) {
      setConfig((prevState) => ({
        ...prevState,
        images: [URL.createObjectURL(file) as string, prevState.images[1]],
      }));
    }
  } else {
    return;
  }
}

export function handlePresetUpload(
  event: React.ChangeEvent<HTMLInputElement>,
  lib: Lib,
  setPreset: Dispatch<SetStateAction<Preset>>
): void {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    function findInLib(lib: Lib | LibList, functionName: string) {
      let result = undefined;
      for (const key in lib) {
        if (
          typeof lib[key as keyof typeof lib] === 'function' &&
          lib[key as keyof typeof lib]['name'] === functionName
        ) {
          result = lib[key as keyof typeof lib];
          break;
        } else if (typeof lib[key as keyof typeof lib] === 'object') {
          // Recursive call for nested objects
          const nestedResult = findInLib(
            lib[key as keyof typeof lib],
            functionName
          ) as LibListFunction;
          if (nestedResult !== undefined) {
            result = nestedResult;
            break;
          }
        }
      }
      return result;
    }

    function stringsToFunctions(thing: PresetPart) {
      if (typeof thing === 'object') {
        for (const key in thing) {
          if (
            typeof thing[key as keyof typeof thing] === 'string' &&
            (thing[key as keyof typeof thing] as string).split('-')[0] === 'f'
          ) {
            const libResult = findInLib(
              lib,
              (thing[key as keyof typeof thing] as string).split('-')[1]
            );
            if (libResult !== undefined)
              thing[key as keyof typeof thing] = libResult;
          } else if (
            typeof thing[key as keyof typeof thing] === 'object' &&
            thing[key as keyof typeof thing] !== null
          ) {
            stringsToFunctions(thing[key as keyof typeof thing] as PresetPart);
          }
        }
      }
    }

    // Update state with the loaded preset
    if (typeof e.target?.result === 'string') {
      try {
        const loadedPreset: Preset = JSON.parse(e.target.result);
        if (loadedPreset) {
          stringsToFunctions(loadedPreset);
          setPreset(loadedPreset);
        }
      } catch (error) {
        console.error('Error parsing JSON', error);
      }
    }
  };
  reader.readAsText(file);
}

export function handlePresetDownload(preset: Preset) {
  const presetCopy = cloneDeep(preset);

  function functionsToStrings(thing: PresetPart) {
    for (const key in thing) {
      if (
        typeof thing[key] === 'function' &&
        thing !== undefined &&
        thing[key] !== undefined
      ) {
        thing[key] = `f-${(thing[key] as PresetPart).name}`;
      } else if (typeof thing[key] === 'object' && thing[key] !== null) {
        functionsToStrings(thing[key] as PresetPart);
      }
    }
  }
  functionsToStrings(presetCopy);

  const jsonString = JSON.stringify(presetCopy);
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
    return stateCopy;
  });
}

// Input and Submit Handlers

export function handleNumberInput(
  e: React.FormEvent<HTMLInputElement>,
  path: string,
  setPreset: Dispatch<SetStateAction<Preset>>
) {
  e.preventDefault;
  e.stopPropagation()
  setPreset((prevState) => {
    const stateCopy = { ...prevState };
    set(stateCopy, path, Number((e.target as HTMLInputElement).value));
    return stateCopy;
  });
}

export function handleToggle(
  e: React.ChangeEvent<HTMLInputElement>,
  path: string,
  defaultValue: LibListItem,
  setPreset: Dispatch<SetStateAction<Preset>>
) {
  e.preventDefault;
  console.log(e);
  
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
  e.stopPropagation()
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
