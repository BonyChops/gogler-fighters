const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const accessToken = JSON.parse(fs.readFileSync(__dirname+'/accessToken.json', 'utf8')).token;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '/happy') {
    msg.reply("I'm fastest bot. (JS)");
  }
});

client.login(accessToken);