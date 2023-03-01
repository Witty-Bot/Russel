const { author } = require("canvacord");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  inlineCode,
  TimestampStyles,
} = require("discord.js");
const {
  Client,
  EmbedBuilder,
  MessageActionRow,
  MessageButton,
  CommandInteraction,
  MessageSelectMenu,
} = require("discord.js");
const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("build embed")
    .addStringOption((option) =>
      option.setName("title").setDescription("enter title").setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("enter a channel")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("enter description")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("footer").setDescription("enter footer").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("choose color")
        .setRequired(true)
        .addChoices(
          { name: "Bot Color", value: "#36393F" },
          { name: "Red", value: "Red" },
          { name: "Blue", value: "Blue" },
          { name: "Green", value: "Green" },
          { name: "Yellow", value: "Yellow" },
          { name: "White", value: "White" },
          { name: "Default", value: "Default" },
          { name: "Fuchsia", value: "Fuchsia" },
          { name: "Gold", value: "Gold" },
          { name: "Grey", value: "Grey" },
          { name: "Greyple", value: "Greyple" },
          { name: "LightGrey", value: "LightGrey" },
          { name: "LuminousVividPink", value: "LuminousVividPink" },
          { name: "Navy", value: "Navy" },
          { name: "NotQuiteBlack", value: "NotQuiteBlack" },
          { name: "Orange", value: "Orange" },
          { name: "Purple", value: "Purple" },
          { name: "Random", value: "Random" },
          { name: "NeonGreen", value: "#00ff00" },
          { name: "DeepOrange", value: "#ff5722" },
          { name: "Lime", value: "#cddc39" },
          { name: "Teal", value: "#009688" },
          { name: "Indigo", value: "#3f51b5" },
          { name: "Amber", value: "#ffc107" },
          { name: "Black", value: "Black" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription("enter image link")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option.setName("url").setDescription("enter a URL").setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("thumbnail")
        .setDescription("enter image link")
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("add a ping role")
        .setRequired(false)
    )
    .addUserOption((option) =>
      option
        .setName("author")
        .setDescription("enter a auhtor")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("footericon")
        .setDescription("enter a footericon")
        .setRequired(false)
    ),
  async execute(interaction, options, args) {
    let title = interaction.options.getString("title");
    let description = interaction.options.getString("description");
    let footer = interaction.options.getString("footer");
    let color = interaction.options.getString("color");
    let image = interaction.options.getString("image");
    let thumbnail = interaction.options.getString("thumbnail");
    let url = interaction.options.getString("url");
    let footericon = interaction.options.getString("footericon");
    const channel = interaction.options.getChannel("channel");
    const role = interaction.options.getRole("role");
    const author = interaction.options.getUser("author");

    const { guildId, user } = interaction;

    const Response = new EmbedBuilder()
      .setDescription(
        `**✅** **Embed was sent in** **${channel}**\n**✅** **Embed was created in** **${interaction.channel}**\n**✅** **Role was added** **${role}**\n**✅** **The author is** **${author}**\n**✅** **The Color you choosed is** **${color}**`
      )
      .setColor("#36393F")
      .setTimestamp();

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setFooter({ text: footer, iconURL: footericon })
      .setColor(`${color}`)
      .setImage(image)
      .setThumbnail(thumbnail)
      .setURL(url)
      .setAuthor({
        name: `${author.username}`,
        iconURL: `${author.displayAvatarURL()}`,
      })
      .setTimestamp();

   
    await channel.send({ content: `${role}`, embeds: [embed] });
    await interaction.user
      .send({ content: "Embed sent to the channel!", embeds: [Response] })
      .then((value) => {
        interaction.reply({
          content: `${interaction.user}`,
          embeds: [Response],
          ephemeral: true,
        });
      })
      .catch((err) =>
        interaction.channel.send({
          content: `Can\'t send dm to ${interaction.user}`,
        })
      );
  },
};