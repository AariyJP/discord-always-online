import Discord from "discord.js-selfbot";

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error("DISCORD_TOKEN is required");
  process.exit(1);
}

const client = new Discord.Client();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("error", error => {
  console.error("Discord client error", error);
});

client.login(token).catch(error => {
  console.error("Login failed", error);
  process.exit(1);
});
