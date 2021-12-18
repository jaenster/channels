# Simple channel

Push something in, get something out

```typescript
import {Channel, Client} from '@jaenster/channels'

describe('channel', () => {
    const channel = Channel.factory<string>();

    const arr = [];

    test('can send message', async () => {

        const alice = new ChannelClient(channel);
        const bob = new ChannelClient(channel);

        alice.out('test');
        let sender: ChannelClient<string>;
        bob.on('data', (a, who) => {
            sender = who;
            arr.push(a)
        })

        expect(arr).toHaveLength(0);
        await delay();
        expect(arr).toHaveLength(1);
        expect(sender).toBe(alice);
    });
});
```