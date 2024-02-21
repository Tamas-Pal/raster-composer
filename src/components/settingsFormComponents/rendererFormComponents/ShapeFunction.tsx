import { Lib } from "../../../utils/loadLib";

export default function ShapeFunction({lib}: {lib: Lib}) {

  return (
    <label>
        <h4>Shape Function</h4>
        Function
        <select name='shapef' id='shapef' defaultValue='pixelRects'>
          <option key='pixelRects' value='pixelRects'>
            {'pixelRects'}
          </option>
          {lib ? (
            lib.attributeFunctions.shapeFunctions.map((shapeF) => {
              if (shapeF.name !== 'pixelRects') {
                return (
                  <option key={shapeF.name} value={shapeF.name}>
                    {shapeF.name}
                  </option>
                );
              }
            })
          ) : (
            <option>Data is being fetched...</option>
          )}
        </select>
      </label>
  );
}
