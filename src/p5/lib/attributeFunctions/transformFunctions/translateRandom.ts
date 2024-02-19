import p5 from "p5";

export default function translateRandom(p: p5, transformScale: number) {
    return p.random(-transformScale / 2, transformScale / 2)

}