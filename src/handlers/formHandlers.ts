import { Dispatch, SetStateAction } from 'react';
import {
  ColorFunction,
  ConditionFunction,
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

export function handleNewLayer(
  defaultPreset: Preset,
  setPreset: Dispatch<SetStateAction<Preset>>
) {
  setPreset((prevState) => {
    const stateCopy = { ...prevState };
    stateCopy.operations.push(defaultPreset.operations[0]);
    console.log(stateCopy);
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
  const unchecked = typeof defaultValue === "boolean" ? false : undefined
  setPreset((prevState) => {
    const stateCopy = { ...prevState };
    e.target.checked ? set(stateCopy, path, defaultValue) : set(stateCopy, path, unchecked)
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
