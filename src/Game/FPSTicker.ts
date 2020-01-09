import { ITicker } from "./ITicker";
import { Millescond } from "./Game";
export class FPSTicker extends ITicker {
    constructor() {
        super();
    }
    public start() {
        this._lastTick = new Date(); // TODO: Не самый надёжный способ
        window.requestAnimationFrame(() => this._tick());
    }
    private _count = 0;
    private _time = 0;
    public get time() { return this._time; }
    public get count() { return this._count; }
    private _tick() {
        this._count++;
        const now = new Date();
        this._delta = this._lastTick.getTime() - now.getTime();
        this._lastTick = now;
        this._time += this.delta;
        this._onEachTick.forEach(func => {
            func();
        });
        
        window.requestAnimationFrame(() => this._tick());
    }
    private _onEachTick: (() => void)[] = [];
    private _lastTick: Date;
    private _delta: Millescond;
    public get delta() { return this._delta; }
    public set onEachTick(func: () => void) {
        this._onEachTick.push(func);
    }
}
