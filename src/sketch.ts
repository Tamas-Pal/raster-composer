import p5, { Image } from 'p5';
import { config, operations } from './configs/config00.js';
import { Config } from './types.js';

let fileIndex = 0;
let sampleNeighbour = 0;
let img: Image;

export default function sketch(p: p5) {
  p.preload = () => {
    //img = loadImage('assets/StateCraft01.png');
    img = p.loadImage('images/assets/' + '00.png');
  };

  p.setup = () => {
    config.resX = img.width / config.rasterSize;
    config.resY = img.height / config.rasterSize;
    p.createCanvas(
      img.width * config.outputMultiplier,
      img.height * config.outputMultiplier
    );
    p.image(img, 0, 0, p.width, p.height);
    p.loadPixels();
    config.outputGridUnitX = p.width / config.resX;
    config.outputGridUnitY = p.height / config.resY;

    //background(0);

    //rasterRGBBlur(outputGridUnitX, outputGridUnitY, rasterSize, rasterSize);
    /*
    rasterBrick(
      outputGridUnitX,
      outputGridUnitY,
      rasterSize,
      rasterSize,
      2,
      1,
      96,
      40,
      1,
      true
    );
    */
    /*
    rasterBrick(
      outputGridUnitX,
      outputGridUnitY,
      rasterSize,
      rasterSize,
      6,
      0,
      144,
      10,
      0,
      false
    );
    */
    /*
    findBlobs(
      config.resX,
      config.resY,
      config.outputGridUnitX,
      config.outputGridUnitY,
      config.rasterSize,
      8
    );
    */
  };

  p.keyPressed = () => {
    if (p.keyCode === 83) {
      let fileIndexStr =
        fileIndex < 10 ? `0${fileIndex}` : fileIndex.toString();
      p.saveCanvas(`myCanvas${fileIndexStr}.png`);
      fileIndex++;
    }
  };

  function rasterBW(
    gridUnitX: Config['outputGridUnitX'],
    gridUnitY: Config['outputGridUnitY'],
    imgGridUnitX: Config['inputGridUnitX'],
    imgGridUnitY: Config['inputGridUnitX']
  ) {
    for (let j = 0; j < config.resY; j++) {
      for (let i = 0; i < config.resX; i++) {
        //let pos = i + j * config.resX;
        let rNorm = img.get(i * imgGridUnitX, j * imgGridUnitY)[0] / 255;
        let gNorm = img.get(i * imgGridUnitX, j * imgGridUnitY)[1] / 255;
        let bNorm = img.get(i * imgGridUnitX, j * imgGridUnitY)[2] / 255;
        let aNorm = img.get(i * imgGridUnitX, j * imgGridUnitY)[3] / 255;
        let avgNorm = (rNorm + gNorm + bNorm) / 3;
        //fill(img.get(i * imgGridUnitX, j * imgGridUnitY));
        p.fill(0);
        p.noStroke();
        //rect(i * GridUnitX + random(-GridUnitX/2, GridUnitX/2), j * GridUnitY, GridUnitX * (1 - avgNorm), GridUnitY* (1 - avgNorm));
        if (aNorm > 0.01) {
          p.circle(
            i * gridUnitX + p.random(-gridUnitX / 2, gridUnitX / 2),
            j * gridUnitY + p.random(-gridUnitY / 2, gridUnitY / 2),
            gridUnitX * (1 - avgNorm)
          );
        }
        /*
        textFont('Archivo Black');
        //textSize(GridUnitY);
        textStyle('bold');
        textSize(GridUnitY * (1 - avgNorm) + 0.01);
        text('BAGYA'.split('')[pos % 5], i * GridUnitX, (j + 1) * GridUnitY);
        */
      }
    }
  }

  function rasterRGB(
    gridUnitX: Config['outputGridUnitX'],
    gridUnitY: Config['outputGridUnitY'],
    imgGridUnitX: Config['inputGridUnitX'],
    imgGridUnitY: Config['inputGridUnitX']
  ) {
    for (let colorIndex = 0; colorIndex < 3; colorIndex++) {
      for (let j = 0; j < config.resY; j++) {
        for (let i = 0; i < config.resX; i++) {
          //let pos = i + j * resX;
          let colorNorm =
            img.get(i * imgGridUnitX, j * imgGridUnitY)[colorIndex] / 255;
          let aNorm = img.get(i * imgGridUnitX, j * imgGridUnitY)[3] / 255;
          //fill(img.get(i * imgGridUnitX, j * imgGridUnitY));
          p.blendMode(p.MULTIPLY);
          p.noStroke();
          //rect(i * GridUnitX + random(-GridUnitX/2, GridUnitX/2), j * GridUnitY, GridUnitX * (1 - avgNorm), GridUnitY* (1 - avgNorm));
          if (aNorm > 0.01) {
            //console.log(GridUnitX * (1 - colorNorm));
            //fill(0)
            p.fill(p.color(`hsl(${colorIndex * 120}, 100%, 50%)`));
            p.circle(
              i * gridUnitX + p.random(-gridUnitX / 2, gridUnitX / 2),
              j * gridUnitY + p.random(-gridUnitY / 2, gridUnitY / 2),
              gridUnitX * (1 - colorNorm)
            );
          }
          /*
          textFont('Archivo Black');
          //textSize(GridUnitY);
          textStyle('bold');
          textSize(GridUnitY * (1 - avgNorm) + 0.01);
          text('BAGYA'.split('')[pos % 5], i * GridUnitX, (j + 1) * GridUnitY);
          */
        }
      }
    }
  }

  function rasterRGBBlur(
    gridUnitX: Config['outputGridUnitX'],
    gridUnitY: Config['outputGridUnitY'],
    imgGridUnitX: Config['inputGridUnitX'],
    imgGridUnitY: Config['inputGridUnitX']
  ) {
    for (let colorIndex = 0; colorIndex < 3; colorIndex++) {
      for (let j = 0; j < config.resY; j++) {
        for (let i = 0; i < config.resX; i++) {
          let matrixSize = sampleNeighbour * 2 + 1;
          let colorNorm = 0;
          let alphaNorm = 0;
          for (
            let matrixX = 0 - sampleNeighbour;
            matrixX < matrixSize - sampleNeighbour;
            matrixX++
          ) {
            for (
              let matrixY = 0 - sampleNeighbour;
              matrixY < matrixSize - sampleNeighbour;
              matrixY++
            ) {
              if (
                i + matrixX >= 0 &&
                j + matrixY >= 0 &&
                i + matrixX < config.resX &&
                j + matrixY < config.resY
              ) {
                let pixel = img.get(
                  (i + matrixX) * imgGridUnitX,
                  (j + matrixY) * imgGridUnitY
                );
                colorNorm += pixel[colorIndex] / 255;
                alphaNorm += pixel[3] / 255;
                //console.log(pixel[2]);
              } else {
                colorNorm += 1;
              }
            }
          }
          colorNorm = colorNorm / (matrixSize * matrixSize);
          alphaNorm = alphaNorm / (matrixSize * matrixSize);
          p.blendMode(p.MULTIPLY);
          p.noStroke();
          if (colorNorm < 0.9 && alphaNorm >= 0.1) {
            p.fill(
              p.color(
                `hsl(${(colorIndex * 120 + 180) % 360}, ${
                  (1 - colorNorm) * 100
                }%, 40%)`
              )
            );
            p.circle(
              i * gridUnitX + p.random(-gridUnitX / 2, gridUnitX / 2),
              j * gridUnitY + p.random(-gridUnitY / 2, gridUnitY / 2),
              gridUnitX * (1 - colorNorm)
            );
          }
        }
      }
    }
  }

  function rasterBrick(
    gridUnitX: Config['outputGridUnitX'],
    gridUnitY: Config['outputGridUnitY'],
    imgGridUnitX: Config['inputGridUnitX'],
    imgGridUnitY: Config['inputGridUnitX'],
    brickSize: number,
    colorIndex: number,
    colorThreshold: number,
    colorShift: number,
    randomPlacement: boolean,
    pattern: boolean
  ) {
    gridUnitX = gridUnitX * brickSize;
    gridUnitY = gridUnitY * brickSize;
    imgGridUnitX = imgGridUnitX * brickSize;
    imgGridUnitY = imgGridUnitY * brickSize;

    function addRandom() {
      if (randomPlacement) return p.random(-gridUnitX / 2, gridUnitX / 2);
      return 1;
    }

    for (let j = 0; j < config.resY / brickSize; j++) {
      for (let i = 0; i < config.resX / brickSize; i++) {
        let pixelColor = img.get(i * imgGridUnitX, j * imgGridUnitY);

        p.blendMode(p.BLEND);
        p.noStroke();
        if (pixelColor[colorIndex] < colorThreshold && pixelColor[3] > 127) {
          p.fill(
            p.color(
              `hsl(${(colorIndex * 120 + colorShift) % 360}, ${1 * 100}%, 50%)`
            )
          );
          p.rect(
            i * gridUnitX + addRandom(),
            j * gridUnitY + addRandom(),
            //           i * GridUnitX + random(-GridUnitX / 2, GridUnitX / 2),
            //            j * GridUnitY + random(-GridUnitY / 2, GridUnitY / 2),
            gridUnitX
          );
          if (pattern) {
            for (let y = 0; y < brickSize; y += 0.2) {
              for (let x = 0; x < brickSize; x += 0.2) {
                let xPos = (i + x / brickSize) * gridUnitX;
                let yPos = (j + y / brickSize) * gridUnitY;
                p.noiseDetail(12, 0.5);
                let noiseVal = p.noise(
                  (xPos / img.width) * 20.1,
                  (yPos / img.height) * 20.1
                );
                if (noiseVal > 0.5) {
                  p.fill(
                    p.color(
                      `hsl(${
                        (colorIndex * 120 + colorShift * 1.8) % 360
                      }, 100%, 50%)`
                    )
                  );
                  p.rect(xPos, yPos, gridUnitX * 0.2);
                }
              }
            }
          }
        }
      }
    }
  }

  function pixelate(
    outputGridUnitX: Config['outputGridUnitX'],
    outputGridUnitY: Config['outputGridUnitY'],
    rasterSize: Config['rasterSize'],
    brickSize: number
  ) {
    outputGridUnitX *= brickSize;
    outputGridUnitY *= brickSize;
    rasterSize *= brickSize;
    config.resX /= brickSize;
    config.resY /= brickSize;

    for (let y = 0; y < config.resY; y += 1) {
      for (let x = 0; x < config.resX; x += 1) {
        let index = (x + config.resX * y * rasterSize) * 4 * rasterSize;
        p.noStroke();
        p.fill(p.pixels[index], p.pixels[index + 1], p.pixels[index + 2]); // p.pixels[index]
        //console.log(p.pixels[index]);
        p.rect(x * outputGridUnitX, y * outputGridUnitY, outputGridUnitX);
      }
    }
  }

  function findBlobs(
    resX: Config['resX'],
    resY: Config['resX'],
    outputGridUnitX: Config['outputGridUnitX'],
    outputGridUnitY: Config['outputGridUnitY'],
    rasterSize: Config['rasterSize'],
    brickSize: number
  ) {
    outputGridUnitX *= brickSize;
    outputGridUnitY *= brickSize;
    rasterSize *= brickSize;
    resX /= brickSize;
    resY /= brickSize;

    let channelArray = [];
    for (let y = 0; y < resY; y += 1) {
      for (let x = 0; x < resX; x += 1) {
        let index = (x + resX * y * rasterSize) * 4 * rasterSize;
        let channel;
        if (p.pixels[index] > p.pixels[index + 1]) {
          channel = 'R';
          if (p.pixels[index] < p.pixels[index + 2]) {
            channel = 'B';
          }
        } else if (p.pixels[index + 1] > p.pixels[index + 2]) {
          channel = 'G';
        } else {
          channel = 'B';
        }
        channelArray.push(channel);
        p.noStroke();
        if (channel === 'R') {
          p.fill(255, 0, 0); // p.pixels[index]
          //console.log(p.pixels[index]);
          p.rect(x * outputGridUnitX, y * outputGridUnitY, outputGridUnitX);
        }
      }
    }
  }
}
