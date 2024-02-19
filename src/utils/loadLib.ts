import {
  ColorFunction,
  ConditionFunction,
  PatternFunction,
  Renderer,
  SamplerFunction,
  ShapeFunction,
  TransformFunction,
} from '../p5/types';

export type Lib = {
  attributeFunctions: {
    colorFunctions: ColorFunction[];
    conditionFunctions: ConditionFunction[];
    patternFunctions: PatternFunction[];
    samplerFunctions: SamplerFunction[];
    shapeFunctions: ShapeFunction[];
    transformFunctions: TransformFunction[];
  };
  renderers: Renderer[];
} | null;

type ResolvedModule = {
  default:
    | ColorFunction
    | ConditionFunction
    | PatternFunction
    | SamplerFunction
    | ShapeFunction
    | TransformFunction
    | Renderer;
};

export async function loadLib() {
  const colorModules = import.meta.glob(
    '../p5/lib/attributeFunctions/colorFunctions/*.ts'
  );
  const conditionModules = import.meta.glob(
    '../p5/lib/attributeFunctions/conditionFunctions/*.ts'
  );
  const patternModules = import.meta.glob(
    '../p5/lib/attributeFunctions/patternFunctions/*.ts'
  );
  const samplerModules = import.meta.glob(
    '../p5/lib/attributeFunctions/samplerFunctions/*.ts'
  );
  const shapeModules = import.meta.glob(
    '../p5/lib/attributeFunctions/shapeFunctions/*.ts'
  );
  const transformModules = import.meta.glob(
    '../p5/lib/attributeFunctions/transformFunctions/*.ts'
  );
  const rendererModules = import.meta.glob('../p5/lib/renderers/*.ts');

  //console.log(modules);

  const lib: Lib = {
    attributeFunctions: {
      colorFunctions: [],
      conditionFunctions: [],
      patternFunctions: [],
      samplerFunctions: [],
      shapeFunctions: [],
      transformFunctions: [],
    },
    renderers: [],
  };

  for (const path in colorModules) {
    const resolvedModule = (await colorModules[path]()) as ResolvedModule;
    lib.attributeFunctions.colorFunctions.push(
      resolvedModule.default as ColorFunction
    );
  }
  for (const path in conditionModules) {
    const resolvedModule = (await conditionModules[path]()) as ResolvedModule;
    lib.attributeFunctions.conditionFunctions.push(
      resolvedModule.default as ConditionFunction
    );
  }
  for (const path in patternModules) {
    const resolvedModule = (await patternModules[path]()) as ResolvedModule;
    lib.attributeFunctions.patternFunctions.push(
      resolvedModule.default as PatternFunction
    );
  }
  for (const path in samplerModules) {
    const resolvedModule = (await samplerModules[path]()) as ResolvedModule;
    lib.attributeFunctions.samplerFunctions.push(
      resolvedModule.default as SamplerFunction
    );
  }
  for (const path in shapeModules) {
    const resolvedModule = (await shapeModules[path]()) as ResolvedModule;
    lib.attributeFunctions.shapeFunctions.push(
      resolvedModule.default as ShapeFunction
    );
  }
  for (const path in transformModules) {
    const resolvedModule = (await transformModules[path]()) as ResolvedModule;
    lib.attributeFunctions.transformFunctions.push(
      resolvedModule.default as TransformFunction
    );
  }
  for (const path in rendererModules) {
    const resolvedModule = (await rendererModules[path]()) as ResolvedModule;
    lib.renderers.push(resolvedModule.default as Renderer);
  }
  return lib;
}
