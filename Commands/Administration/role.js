const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Manage roles of the server or members.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addSubcommand((subcommand) => subcommand
      .setName("add")
      .setDescription("Add role to a user.")
      .addRoleOption((option) => option
        .setName("role")
        .setDescription("The role you want to add to the user.")
        .setRequired(true))
      .addUserOption((option) => option
        .setName("user")
        .setDescription("The user you want to add the role to.")
        .setRequired(true)
      )),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'add') {
      try {
        const member = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');
        
        await member.roles.add(role)

        const embed = new EmbedBuilder()
          .setTitle('Role Added')
          .setDescription(`Successfully added the role: ${role} to ${member}`)
          .setColor('Green')
          .setTimestamp()
          .setThumbnail(member.user.displayAvatarURL())
          .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

        interaction.reply({ embeds: [embed] })
      } catch {
        return interaction.reply({ content: `I failed adding that role because it has mod/admin permissions. If it doesn't, join the support server to report the bug.`});
    
      }
    }
  }
};