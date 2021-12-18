import {Channel} from "../../src";

const delay = () => new Promise<void>(resolve => setTimeout(resolve));

describe('channel', () => {
    const channel = new Channel<number>()
    test('can send message', async () => {

        const arr = [];
        channel.on('data', function (a) {
            arr.push(a)
        });
        const amount = 1_000_000;


        for (let i = 0; i < amount; i++) channel.in(i);

        const l = arr.length;
        await delay();

        console.timeEnd(`sending ${amount} times`);

        expect(l).toEqual(0);
        expect(arr.splice(0, arr.length)).toHaveLength(amount);

    })
})