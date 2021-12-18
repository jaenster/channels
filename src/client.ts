import {BaseClient} from "./base-client";

export interface ChannelClient<T> {
    on(key: 'data', cb: (data: T, client: ChannelClient<T>) => any);

}

export class ChannelClient<T> extends BaseClient<T> {
    protected in(data: T, client: BaseClient<T>) {
        this.emit('data', data, client);
    }
}

