const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
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
	 
	if (message.content.startsWith("!공지등록")) {
		if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send("``명령어를 수행시킬 만큼의 권한을 소지하고 있지 않습니다.``");
		const gch = message.mentions.channels.first();
        if (!gch) return message.reply("공지를 등록할 채널을 멘션하세요..");

		const text = message.content.split(' ').slice(2).join(' ');
        if (!text) return message.reply("공지의 내용을 입력해주세요.");
		
		const { guild } = message
		const { name } = guild
		const icon = guild.iconURL()
		
		var gonggi_embed = new (require("discord.js").MessageEmbed)()
		
			gonggi_embed.setTitle(`${name} 공지사항`)
            gonggi_embed.setDescription("**```" + `${text}` + '```**')
            gonggi_embed.setColor("RANDOM")
			gonggi_embed.setThumbnail(icon)
			gch.send('@everyone')
            gch.send(gonggi_embed)
	}
});

client.login(config.token);