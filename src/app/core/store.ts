import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';

export function WatchComponentState() {
    return <T extends { new (...args: any[]): ComponentStore<any> }>(target: T) => {
        return class extends target {
            watchState = this.effect(() => {
                return this.state$.pipe(tap(state => console.log(target.name, state)));
            });
        };
    };
}
