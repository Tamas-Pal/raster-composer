import { BufferColor } from "../../../types";

export default function darkerThan(outputColor: BufferColor, threshold: number) {
    return (outputColor[0]+outputColor[1]+outputColor[2]) / 3 < threshold
}