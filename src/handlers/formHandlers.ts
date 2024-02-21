import { Dispatch, SetStateAction } from "react";
import { Preset } from "../p5/types";

function handleNewLayer(
    defaultPreset: Preset,
    setPreset: Dispatch<SetStateAction<Preset>>
  ) {
    setPreset((prevState) => {
      const prevStateCopy = { ...prevState };
      prevStateCopy.operations.push(defaultPreset.operations[0]);
      console.log(prevStateCopy);
      return prevStateCopy;
    });
  }

  function handleDeleteLayer(
    e: React.MouseEvent<Element, MouseEvent>,
    setPreset: Dispatch<SetStateAction<Preset>>
  ) {
    const index = Number(e.currentTarget.id.split('delete-layer-')[1]);
    setPreset((prevState) => {
      const prevStateCopy = { ...prevState };
      prevStateCopy.operations = prevStateCopy.operations
        .slice(0, index)
        .concat(prevStateCopy.operations.slice(index + 1));
      return prevStateCopy;
    });
  }

  function handleNumberInput( e: React.FormEvent<HTMLInputElement>, path: string,
    setPreset: Dispatch<SetStateAction<Preset>>) {
     setPreset((prevState)=>({...prevState, [path]: Number(e.currentTarget.value)}))        
  }

  export const formHandlers = {
    handleNewLayer,
    handleDeleteLayer
  }