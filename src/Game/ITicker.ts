export abstract class ITicker {
    public abstract set onEachTick(func: () => void);
    public abstract get count(): number;
    public abstract get time(): number;
    public abstract get delta(): number;
    public abstract start(): void;
}
