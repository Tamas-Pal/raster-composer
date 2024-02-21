export default function MetaballConfig() {

  return (
    <label>
    <h4>Metaball</h4>
    <div>
      Metaball Raster Size
      <span className='field-label'>X</span>
      <input
        className='number-input'
        type='number'
        name='metaball-raster-size-0'
        id='metaball-raster-size-0'
        min='1'
        defaultValue='8'
        required
      />
      <span className='field-label'>Y</span>
      <input
        className='number-input'
        type='number'
        name='metaball-raster-size-1'
        id='metaball-raster-size-1'
        min='1'
        defaultValue='8'
        required
      />
    </div>
    <div>
      Evaluation Distance Ratio
      <input
        className='number-input'
        type='number'
        name='evaluation-distance-ratio'
        id='evaluation-distance-ratio'
        min='0.01'
        max='1.00'
        step='0.01'
        defaultValue='0.50'
        required
      />
    </div>
  </label>
  );
}
