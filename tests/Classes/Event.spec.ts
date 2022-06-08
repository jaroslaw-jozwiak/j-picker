import { Event } from "./../../src/Classes/Event";

describe("Event class tests", () => {
    test("Test count of calls", () => {
        const event = new Event();
        const event1callbackA = jest.fn();
        const event1callbackB = jest.fn();
        const event2callback = jest.fn();
        const event3callback = jest.fn();
    
        event.addListener('event1', event1callbackA);
        event.addListener('event1', event1callbackB);
        event.addListener('event2', event2callback);
        const callbackId = event.addListener('event3', event3callback);

        event.removeListener(callbackId);

        event.trigger('event1')
        event.trigger('event1')
        event.trigger('event2')
        event.trigger('event3')

        expect(event1callbackA.mock.calls.length).toBe(2);
        expect(event1callbackB.mock.calls.length).toBe(2);
        expect(event2callback.mock.calls.length).toBe(1);
        expect(event3callback.mock.calls.length).toBe(0);
    })

    test("Test arguments", () => {
        const event = new Event();
        const callback = jest.fn();
        const TEST_ARG_1 = 1001;
        const TEST_ARG_2 = null;
        const TEST_ARG_3 = false;
        const TEST_ARG_4 = 'some text';
    
        event.addListener('event', callback);
        event.trigger('event', TEST_ARG_1, TEST_ARG_2, TEST_ARG_3, TEST_ARG_4);

        expect(callback).toHaveBeenCalledWith(TEST_ARG_1, TEST_ARG_2, TEST_ARG_3, TEST_ARG_4);
    })
})
