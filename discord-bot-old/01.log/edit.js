const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');
const client = new Discord.Client();
const guildid = '서버id'
//토큰은 config.json에서 우클릭후 노트패드++ 또는 비쥬얼 스튜디오 코드에서 수정해주세요. 

client.on('ready', () => {
    console.log(client.user.tag)
	console.log(client.user.id)
	console.log('\n봇이 준비 되었습니다.');
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
        
	if (oldMessage.guild.id === guildid) {
		var d = new Date();
        var currentData = d.getFullYear() + "년" + (d.getMonth() + 1) + "월" + d.getDate() + "일 ";
        var currentTime = d.getHours() + "시" + d.getMinutes() + "분";
        let msg2_channel = client.channels.cache.get('로그 채널id')
        var channelid = oldMessage.channel.id
        let replacelog_embed = new (require("discord.js").MessageEmbed)()
        replacelog_embed.setTitle(`메시지가 수정`)
        replacelog_embed.setDescription(`수정한 유저: ${oldMessage.author} \r채널: ${oldMessage.channel}\r`)
        replacelog_embed.addField('** **', '** **')
        replacelog_embed.addField('⬇️ 수정한유저 태그 ⬇️', '**```' + `${oldMessage.author.tag}` + '```**', true)
        replacelog_embed.addField('⬇️ 수정한유저 ID ⬇️', '**```' + `${oldMessage.author.id}` + '```**', true)
        replacelog_embed.addField('⬇️ 채널 ID ⬇️', '**```' + `#${channelid}` + '```**', true)
        replacelog_embed.addField('⬇️ 수정 전 ⬇️', '**```' + `${oldMessage}` + '```**', true)
        replacelog_embed.addField('⬇️ 수정 후 ⬇️', '**```' + `${newMessage}` + '```**')
        replacelog_embed.setFooter(`삭제된 시간 ● ${currentData + currentTime}`, 'https://i.imgur.com/f2fl2RD.jpg')
        replacelog_embed.setColor("RANDOM")
        msg2_channel.send(replacelog_embed)
    }
});

client.login(config.token)