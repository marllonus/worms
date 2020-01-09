import { Game } from "./Game/Game";
import { FPSTicker } from "./Game/FPSTicker";
import { Canvas } from "./Canvas/Canvas";

console.log('Hello from ts')
window.onload = (onloadEvent: Event) => {
    // const - как в js
    // canvas - имя переменный
    // :HtmlCanvasElement - через двоеточие указывается тип
    // <HTMLCanvasElement> - приведение типа, по дефолту getElementById возвращает "родителя" - HtmlElement
    const canvasHtml: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
    
    const c = new Canvas(canvasHtml);
    const t = new FPSTicker();
    const g = new Game(c, t);
    g.start();
    
}