declare module "discord.js-selfbot" {
  type ClientOptions = {
    ws?: {
      properties?: {
        $os?: string;
        $browser?: string;
        $device?: string;
      };
    };
  };

  export class Client {
    constructor(options?: ClientOptions);

    user: {
      tag: string;
    };

    once(event: "ready", listener: () => void): this;
    on(event: "error", listener: (error: Error) => void): this;
    login(token: string): Promise<string>;
  }

  const Discord: {
    Client: typeof Client;
  };

  export default Discord;
}
