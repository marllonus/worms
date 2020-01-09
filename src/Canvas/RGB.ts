export class RGB {
    constructor(public r: number, public g: number, public b: number, public a?: number) {
    }
    public toStyle(): string {
        return this.a === undefined ?
            `rgb(${this.r}, ${this.g}, ${this.b})` :
            `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a/255})`;
    }
}
