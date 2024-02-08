import p5 from "p5";

export default function translateRandom(p: p5, scale: number) {
    return p.random(-scale / 2, scale / 2)

}