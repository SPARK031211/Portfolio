const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(client.user.tag)
	console.log(client.user.id)
	console.log('\n봇이 준비 되었습니다.');
});

client.on('message', async (message) => { 
    if (message.author.bot) return;
  
	if (message.content.startsWith('!인증')) {
		message.delete()
		user = message.author;
        const roleid = '역할id'
        const role = message.guild.roles.cache.get(roleid);
        message.member.roles.add(role);
        var new_embed = new (require('discord.js').MessageEmbed)()
        new_embed.setTitle('인증에 성공했습니다. ')
        new_embed.addField('인증 유저', `${user}`, true)
        new_embed.addField('지급 역할', `${role.name}`, true)
        new_embed.setFooter("Made by WOLF")
        new_embed.setColor("RANDOM")
        message.channel.send(new_embed)
    }
});

client.login(config.token);