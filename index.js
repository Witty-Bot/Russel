const {Client, GatewayIntentBits, Partials, Collection} = require("discord.js");

const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember, Channel} = Partials;

const {loadEvents} = require("./Handlers/eventHandler");
const {loadCommands} = require("./Handlers/commandHandler");

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});


client.config = require("./config.json");
client.commands = new Collection();



client
  .login('MTA4MDQ2MzY1NTg3Mjc1Nzg1MA.Gp4nDo.I4czaLjeuKskxQSu4H0Yd2vqj2Fs7boyx01Sa8')
  .then(() => {
    loadCommands(client);
    loadEvents(client);
  })
  .catch((err) => console.log(err));
