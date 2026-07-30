import Discord from "discord.js-selfbot";

const tokens = (process.env.DISCORD_TOKENS ?? "")
  .split(",")
  .map(token => token.trim())
  .filter(Boolean);

if (tokens.length === 0) {
  console.error("DISCORD_TOKENS is required");
  process.exit(1);
}

const login = async (token: string, index: number): Promise<void> => {
  const client = new Discord.Client({
    ws: {
      properties: {
        $os: "Windows",
        $browser: "Discord Client",
        $device: "",
      },
    },
  });

  for (const action of Object.values(client.actions)) {
    const handle = action.handle.bind(action);

    action.handle = (...args: unknown[]): unknown => {
      try {
        return handle(...args);
      } catch (error) {
        console.error(`Client ${index + 1} gateway action failed`, error);
        return {};
      }
    };
  }

  client.once("ready", () => {
    console.log(`Client ${index + 1} logged in as ${client.user.tag}`);

    void (async () => {
      try {
        const settings = await client.api.users("@me").settings.get();
        await client.user.setPresence({ status: settings.status, afk: true });
      } catch (error) {
        console.error(`Client ${index + 1} failed to set AFK`, error);
      }
    })();
  });

  client.on("error", (error: Error) => {
    console.error(`Client ${index + 1} Discord client error`, error);
  });

  await client.login(token);
};

const main = async (): Promise<void> => {
  const results = await Promise.allSettled(tokens.map(login));
  const failedResults = results.filter(result => result.status === "rejected");

  for (const [index, result] of results.entries()) {
    if (result.status === "rejected") {
      console.error(`Client ${index + 1} login failed`, result.reason);
    }
  }

  if (failedResults.length === tokens.length) {
    process.exit(1);
  }
};

main();
