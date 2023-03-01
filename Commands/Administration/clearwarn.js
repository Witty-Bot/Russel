const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder, InteractionType} = require('discord.js');
const {QuickDB} = require('quick.db');
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clearwarn')
    .setDescription('Clears a members warnings')
    .addUserOption(option => option.setName('target').setDescription('The member you want to clear the warns of').setRequired(true))
    .addNumberOption(option => option.setName('number').setDescription('The number of warns you want to clear').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({content: "You don't have permission to execute this command", ephemeral: true})

        const member = interaction.options.getUser('target');
        const warnNum = interaction.options.getNumber('number');


        let warns = await db.get(`warns_${member}`);

        if (warns == null) warns = 0;

        if (warnNum > warns) return await interaction.reply({content: `You can only clear a max of ${warns} warnings from ${member.tag}`, ephemeral: true});

        const afwarns = await db.sub(`warns_${member}`, warnNum);
        
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: ${member.tag} now has ${afwarns} warn(s)`)

        await interaction.reply({embeds: [embed]});
    }
}