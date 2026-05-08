declare module "discord.js-selfbot" {
  export class Client {
    user: {
      tag: string;
    };

    once(event: "ready", listener: () => void): this;
    on(event: "error", listener: (error: unknown) => void): this;
    login(token: string): Promise<string>;
  }

  const Discord: {
    Client: typeof Client;
  };

  export default Discord;
}
