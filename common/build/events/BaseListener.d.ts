import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    protected abstract subject: T["subject"];
    protected abstract queueGroupName: string;
    protected abstract onMessage(data: T["data"], msg: Message): void;
    private client;
    protected ackWait: number;
    constructor(client: Stan);
    private subscriptionOptions;
    listen(): void;
    private parseMessage;
}
export {};
