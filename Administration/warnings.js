const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder, InteractionType} = require('discord.js');
const {QuickDB} = require('quick.db');
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("Get a members warnings")
    .addUserOption(option => option.setName('target').setDescription('The member you want to check the warns').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({content: "You don't have permission to execute this command", ephemeral: true})

        const member = interaction.options.getUser('target');
        let warns = await db.get(`warns_${member}`);

        if (warns == null) warns = 0;
        
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`${member.tag} has **${warns}** warn(s)`)

        await interaction.reply({embeds: [embed]});
    }
}