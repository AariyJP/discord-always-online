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

  type Action = {
    handle: (...args: unknown[]) => unknown;
  };

  type PresenceStatus = "online" | "idle" | "invisible" | "dnd";

  type PresenceData = {
    status?: PresenceStatus;
    afk?: boolean;
  };

  type UserSettings = {
    status?: PresenceStatus;
  };

  export class Client {
    constructor(options?: ClientOptions);

    user: {
      tag: string;
      setPresence(data: PresenceData): Promise<unknown>;
    };

    actions: Record<string, Action>;

    api: {
      users(id: string): {
        settings: {
          get(): Promise<UserSettings>;
        };
      };
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
