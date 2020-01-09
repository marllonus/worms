import { Canvas, Point } from "../Canvas/Canvas";
import { RGB } from "../Canvas/RGB";
import { IGameObject, ICollapsable, Game } from "./Game";
export class Box implements IGameObject {
    constructor(leftTop: Point) {
        this.leftTop = leftTop;
        this.width = 20;
        this.height = 20;
        this.collaider = new Array(this.width);
        for (let ix = 0; ix < this.width; ix++) {
            this.collaider[ix] = new Array(this.height);
            for (let iy = 0; iy < this.height; iy++) {
                this.collaider[ix][iy] = true;
            }
        }
    }
    private color: RGB = new RGB( 0, 0, 255, 255 );
    draw(canvas: Canvas): void {
        canvas.drawRect(this.leftTop, { x: this.leftTop.x + this.width, y: this.leftTop.y + this.height }, this.color);
    }
    leftTop: Point;
    collaider: boolean[][];
    width: number;
    height: number;
    private collapsed: boolean = false;
    onCollapse(other: ICollapsable, game: Game): void {
        this.color = new RGB(
            /* r: */ 0,
            /* g: */ this.color.g < 255 ? this.color.g + 1 : this.color.g,
            /* b: */ this.color.b > 0 ? this.color.b - 1 : this.color.b,
            /* a: */ this.color.g >= 0 ? this.color.a - 1 : this.color.a
        );
        if (this.color.a === 0)
            game.removeObject(this);
    }
}
