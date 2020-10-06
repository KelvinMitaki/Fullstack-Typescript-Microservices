import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;
  connect(ClusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(ClusterId, clientId, { url });
    return new Promise((resolve, reject) => {
      this._client?.on("connect", () => {
        resolve();
      });
      this._client?.on("error", err => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
