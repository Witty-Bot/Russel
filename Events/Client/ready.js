const {Client, ActivityType} = require("discord.js");
const mongoose = require('mongoose');
const config = require("../../config.json");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    await mongoose.connect(config.mongodb || '', {
      keepAlive: true,
    });

    if (mongoose.connect) {
      console.log('MongoDB connection succesful!')
    }
    console.log(`${client.user.username} booted up.`);
    client.user.setActivity("with ur mamma || /help")
  },
};