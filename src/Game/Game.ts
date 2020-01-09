import { Canvas, Point } from "../Canvas/Canvas";
import { ITicker } from "./ITicker";
import { Terrain } from "./Terrain";
import { Box } from "./Box";

export class Game {
    constructor (private canvas: Canvas, private tiker: ITicker) {

    }

    public setSettings() {
        
    }

    private __start() {
        this.terrains.push(this.__earth);
        this.drawObjects.add(this.__earth);
        this.tiker.onEachTick = () => this.boxDrop();
    }
    
    private __earth = new Terrain(); 
    private __nextBox = 0;
    private __boxes: Set<Box> = new Set();
    private boxDrop() {
        if( this.tiker.time > this.__nextBox) {
            this.__boxes.add( new Box({ x: Math.random() * this.canvas.width, y : 0 }))
        }

        const speed = 5;
        for( let box of this.__boxes) {
            if ( !this._isCollapse(this.__earth, box)) {
                box.leftTop.y += speed * (this.tiker.delta / 1000);
            }
        }
    }

    private _isCollapse(terr: ICollapsable, obj: ICollapsable): boolean {
        let collapsed: boolean = false;
        for( let ix = 0; ix < obj.width && !collapsed; ix++) {
            for( let iy = 0; iy < obj.height && !collapsed; iy++ ) {
                collapsed = obj.collaider[obj.leftTop.x + ix][obj.leftTop.y + iy] &&
                    terr.collaider[obj.leftTop.x + ix][obj.leftTop.y + iy];
            }
        }
        return collapsed;
    }

    public start() {
        this.__start(); 
        this.tiker.onEachTick = () => this.collapses();
        this.tiker.onEachTick = () => this.draw();
        
        this.tiker.start();
    }

    private drawObjects: Set<IDrawable> = new Set();
    private terrains: ICollapsable[] = [];
    private collapseObjects: Set<ICollapsable> = new Set(); 

    private draw() {
        this.canvas.clear();
        this.drawObjects.forEach(obj => {
            obj.draw( this.canvas);
        });
    }

    private collapses() {
        this.terrains.forEach( terr => {
            this.collapseObjects.forEach( obj => {
                let collapsed = this._isCollapse(terr, obj);
                if( collapsed)
                    obj.onCollapse( terr, this);
            })
        })
    }
    
    public addObject( object: IDrawable | ICollapsable) {
        if( (<IDrawable>object).draw ) {
            this.drawObjects.add(object as IDrawable);
        }

        if( (<ICollapsable>object).onCollapse ) {
            this.collapseObjects.add(object as ICollapsable);
        }
    }

    protected _removeObject(object: any): void {
        this.__boxes.delete(object);
    } 

    public removeObject( object: IDrawable | ICollapsable) {
        this._removeObject(object);
        
        if( (<IDrawable>object).draw ) {
            this.drawObjects.delete(object as IDrawable);
        }

        if( (<ICollapsable>object).onCollapse ) {
            this.collapseObjects.delete(object as ICollapsable);
        }
    }
}

type Second = number;
export type Millescond = number;

export interface IDrawable {
    draw(canvas: Canvas): void
} 

export interface ICollapsable {
    
    readonly leftTop: Point;
    readonly collaider: boolean[][]; // Пожалуйста, не менять извне
    readonly width: number;
    readonly height: number;

    onCollapse(other: ICollapsable, game: Game) : void;
}

export interface IGameObject 
    extends IDrawable, ICollapsable {
}

