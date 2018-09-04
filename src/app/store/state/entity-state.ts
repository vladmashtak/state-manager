import {BehaviorSubject, Observable, Subscription} from 'rxjs';

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
    const oldState: any = this.stateBehavior.getValue();
    const newState: any = typeof update === 'function' ? update(oldState) : update;

    if (typeof newState !== 'object') {
      this.stateBehavior.error(new Error('Update state value must be NOT primitive'));
      return;
    }

    this.stateBehavior.next(newState);
  }

  /*ToDo override subscribe*/
/*
  public subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.stateBehavior
      .pipe(distinctUntilChanged())
      .subscribe(next, error, complete);
  }*/
}
