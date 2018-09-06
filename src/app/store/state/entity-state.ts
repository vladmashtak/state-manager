import { BehaviorSubject, Observable } from 'rxjs';

type StateFunction<T> = (T) => T;

export class EntityState<T extends Object> extends Observable<T> {
  private stateBehavior: BehaviorSubject<T>;

  constructor(state: T) {
    super();

    this.stateBehavior = new BehaviorSubject(state);

    // store source for subscribe;
    this.source = this.stateBehavior;
  }

  public updateState(update: T | StateFunction<T>): void {
    const oldState: any = Object.freeze(this.stateBehavior.getValue());
    const newState: any = typeof update === 'function' ? update(oldState) : update;

    if (typeof newState !== 'object') {
      this.stateBehavior.error(new Error('Update state value must be NOT primitive'));
      return;
    }

    if (oldState.constructor !== newState.constructor) {
      this.stateBehavior.error(new Error('Type of old state and new state must be equal'));
      return;
    }

    this.stateBehavior.next(newState);
  }

  private deepFreeze(object: any): T {
    Object.getOwnPropertyNames(object).forEach(name => {
      const prop = object[name];

      if (prop && typeof prop === 'object') {
        this.deepFreeze(prop);
      }
    });

    return Object.freeze(object);
  }
}
