import * as tslint from 'tslint';

export class FailureMap {
    private readonly _map = new Map<string, tslint.RuleFailure>();

    public get(start: number, end: number) {
        return this._map.get(this.key(start, end));
    }

    public set(start: number, end: number, failure: tslint.RuleFailure): void {
        this._map.set(this.key(start, end), failure);
    }

    public values() {
        return this._map.values();
    }

    // key to identify a rule failure
    private key(start: number, end: number): string {
        return `[${start},${end}]`;
    }
}
