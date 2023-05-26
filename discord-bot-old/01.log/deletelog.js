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
 
client.on("messageDelete", async message => {
    if (message.author.bot) return;
        
	if (message.guild.id === guildid) {
		var d = new Date();
        var currentData = d.getFullYear() + "년" + (d.getMonth() + 1) + "월" + d.getDate() + "일 ";
        var currentTime = d.getHours() + "시" + d.getMinutes() + "분";
        let msg1_channel = client.channels.cache.get('로그 채널id')
        var channelid = message.channel.id
        let deletelog_embed = new (require("discord.js").MessageEmbed)()
        deletelog_embed.setTitle(`메시지 삭제`)
        deletelog_embed.setDescription(`삭제한 유저: ${message.author} \r채널: ${message.channel}\r`)
        deletelog_embed.addField('** **', '** **')
        deletelog_embed.addField('⬇️ 삭제한유저 ️태그 ⬇️', '**```' + `${message.author.tag}` + '```**', true)
        deletelog_embed.addField('⬇️ 삭제한유저 ID ⬇️', '**```' + `${message.author.id}` + '```**', true)
        deletelog_embed.addField('⬇️ 채널 ID ⬇️', '**```' + message.channel + '```**', true)
        deletelog_embed.addField('⬇️ 삭제된 메시지 ⬇️', '**```' + message.content + '```**')
		deletelog_embed.setFooter(`삭제된 시간 ● ${currentData + currentTime}`, 'https://i.imgur.com/f2fl2RD.jpg')
        deletelog_embed.setColor("RANDOM")
        msg1_channel.send(deletelog_embed)
    }
});

client.login(config.token)