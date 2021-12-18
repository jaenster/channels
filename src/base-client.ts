import {Channel} from "./channel";
import {EventTS} from "@jaenster/events";


const callAppend = (cb, ...args) => cb(args);


function filter<T = any>(this: BaseClient<T>, [other, msg]: [BaseClient<T>, T]) {
    if (other === this) return;
    return this.in(msg, other);
}

const handler = Symbol('DataEventHandler');

export abstract class BaseClient<T> extends EventTS {
    [handler]: typeof filter;
    out: <S>(this: S, ...t: T[]) => S;

    constructor(eventQueue?: Channel<[BaseClient<T>, T]>) {
        super();
        eventQueue && this.attach(eventQueue);
    }

    protected abstract in(data: T, client: BaseClient<T>);

    attach(eventQueue: Channel<[BaseClient<T>, T]>) {
        eventQueue.on('data', this[handler] = filter.bind(this), this);
        this.out = callAppend.bind(undefined, eventQueue.in.bind(eventQueue), this);
    }

    detach() {
        this.off('data', this[handler]);
    }
}