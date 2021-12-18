import {EventTS} from '@jaenster/events';
import {FiFo, Work} from '@jaenster/queues'
import type {ChannelClient} from "./client";

export interface Channel<T> {
    on<S = this>(this: S, on: 'data', cb: (this: S, data: T) => any, s?: object);

    in(...t: T[]): void;
}


export class Channel<T> extends EventTS {

    protected queue: FiFo<T>;

    constructor() {
        super();

        const obj = {work: undefined};
        this.queue = new FiFo(Work.queue.add.bind(Work.queue, obj,));
        obj.work = this.queue.forEach.bind(this.queue, this.emit.bind(this, 'data'));

        this.in = this.queue.add.bind(this.queue);
    }

    static factory<T>(this: {new(): Channel<[ChannelClient<T>, T]>}) {
        return new this();
    }

}