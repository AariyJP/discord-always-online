import Discord from "discord.js-selfbot";

const tokens = (process.env.DISCORD_TOKENS ?? "")
  .split(",")
  .map(token => token.trim())
  .filter(Boolean);

if (tokens.length === 0) {
  console.error("DISCORD_TOKENS is required");
  process.exit(1);
}

const login = async (token, index) => {
  const client = new Discord.Client();

  client.once("ready", () => {
    console.log(`Client ${index + 1} logged in as ${client.user.tag}`);
  });

  client.on("error", error => {
    console.error(`Client ${index + 1} Discord client error`, error);
  });

  await client.login(token);
};

const main = async () => {
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
