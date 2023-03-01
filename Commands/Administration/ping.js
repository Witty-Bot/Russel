const { Client, ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder(),
    name: "ping",
    description: "🏓 Pong!",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await interaction.reply({ content: '🏓 Pong!' });
        return interaction.editReply({ content: `🏓 Pong! Latency is **${Date.now() - interaction.createdTimestamp}**ms.`});
    }
}