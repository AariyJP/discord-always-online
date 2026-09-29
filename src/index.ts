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
    if (typeof action.handle !== "function") continue;

    const handle = action.handle.bind(action);

    action.handle = (...args) => {
      try {
        return handle(...args);
      } catch {
        return {};
      }
    };
  }

  client.on("shardReady", async () => {
    console.log(`Client ${index + 1} logged in as ${client.user.tag}`);

    try {
      const settings = await client.api.users("@me").settings.get();
      await client.user.setPresence({ status: settings.status, afk: true });
    } catch (error) {
      console.error(`Client ${index + 1} failed to set AFK`, error);
    }
  });

  client.on("raw", packet => {
    if (packet.t !== "USER_SETTINGS_UPDATE" || !packet.d?.status) return;

    const { status } = packet.d;

    client.user
      .setPresence({ status, afk: true })
      .then(() => console.log(`Client ${index + 1} status changed to ${status}`))
      .catch(error => console.error(`Client ${index + 1} failed to set AFK`, error));
  });

  client.on("error", error => {
    console.error(`Client ${index + 1} error`, error);
  });

  await client.login(token);
};

Promise.all(tokens.map(login));
