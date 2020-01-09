import { Canvas, Point } from "../Canvas/Canvas";
import { RGB } from "../Canvas/RGB";
import { IGameObject, ICollapsable, Game } from "./Game";
export class Terrain implements IGameObject {
    draw(canvas: Canvas): void {
        const left = Math.ceil(canvas.width / 4);
        const right = Math.ceil(canvas.width * 3 / 4);
        const bot = Math.ceil(canvas.height); //this.height / 6;
        const top = Math.ceil(canvas.height * 3 / 4);
        this.width = right - left;
        this.height = bot - top;
        this.leftTop = { x: left, y: top };
        this.collaider = new Array(this.width);

        for (let ix = 0; ix < this.width; ix++) {
            this.collaider[ix] = new Array(this.height);
            for (let iy = 0; iy < this.height; iy++) {
                this.collaider[ix][iy] = (this.height - iy) < ( (this.width - ix) / this.width * this.height);
                if (this.collaider[ix][iy]) {
                    const p = { x: this.leftTop.x + ix, y: this.leftTop.y + iy };
                    canvas.fillRect(
                        { x: p.x - 1, y: p.y - 1 },
                        { x: p.x + 1, y: p.y + 1 },
                        new RGB(255, 0, 0));
                } else {
                    const p = { x: this.leftTop.x + ix, y: this.leftTop.y + iy };
                    canvas.fillRect(
                        { x: p.x - 1, y: p.y - 1 },
                        { x: p.x + 1, y: p.y + 1 },
                        new RGB(255, 0, 0, 30));

                }
                //canvas.fillRect(p, p, { r: 255, g: 0, b: 0 })

            }
        }
    }
    leftTop: Point;
    // 1 - x, 2 - y
    collaider: boolean[][];
    width: number;
    height: number;
    onCollapse(other: ICollapsable, game: Game): void {
        //
    }
}
