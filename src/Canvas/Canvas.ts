import { RGB } from "./RGB";

export class Canvas {
    private context: CanvasRenderingContext2D;
    constructor( private htmlCanvas: HTMLCanvasElement ) {
        this.context = htmlCanvas.getContext("2d");
        this.htmlCanvas.width = 1024;
        this.htmlCanvas.height = 768;
    }

    public get width(): number {
        return this.htmlCanvas.width;
    }

    public get height(): number {
        return this.htmlCanvas.height;
    }

    public clear(): void {
        this.context.clearRect(0,0, this.width, this.height);
    }

    /**
     * lt - левый верхний
     * rt - правый нижний
     */
    public fillRect(lt: Point, rb: Point, color?: FillStyle): void {
        if ( color !== undefined && color != null)
            this.context.fillStyle = color.toStyle();
        this.context.fillRect(lt.x, lt.y, rb.x - lt.x, rb.y - lt.y);
    }

    public drawRect(lt: Point, rb: Point, color?: StrokeStyle): void {
        if ( color !== undefined && color != null)
            this.context.strokeStyle = color.toStyle();
        this.context.strokeRect(lt.x, lt.y, lt.x - rb.x, rb.y - lt.y);
    }

    public drawLine(line: Line, color?: StrokeStyle) {
        if ( color !== undefined && color != null)
            this.context.strokeStyle = color.toStyle();

        if ( line.points && line.points.length) {
            this.context.beginPath()
        }
        for (let p of line.points) {
            this.context.lineTo(p.x, p.y)
        }
        this.context.stroke();
    }

    public fillFigure(line: Line, color?: FillStyle) {
        if ( color !== undefined && color != null)
            this.context.fillStyle = color.toStyle();
    
        if ( line.points && line.points.length) {
            this.context.beginPath()
        }
        for (let p of line.points) {
            this.context.lineTo(p.x, p.y)
        }
        this.context.fill();
    }
}

export class Line {
    constructor( public points: Point[]) {
    }    
}

export class Point {
    constructor(
        public x: number, 
        public y: number) {
    }
}

export type FillStyle = RGB;
export type StrokeStyle = RGB;


