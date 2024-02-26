import p5 from 'p5';
import sketch from './p5/sketch';
//const p5 = await import(`p5`)
//const sketch = await import(`./p5/sketch`)

new p5(sketch, document.getElementById('p5'));
