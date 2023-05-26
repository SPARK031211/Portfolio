const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
const config = require('./config.json');
const money = require("./money.json");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(client.user.tag)
	console.log(client.user.id)
	console.log('\n봇이 준비 되었습니다.');
});

client.on('message', async (message) => { 
    if (message.author.bot) return;
	 
	if (message.content.startsWith("!구매")) {
        const user = message.mentions.members.first();
        if (!user) return message.reply("구매자 멘션하세요.");

        const cha = message.mentions.channels.first();
        if (!cha) return message.reply("구매한 채널을 멘션하세요.");
		
		const text = message.content.split(' ').slice(3).join(' ');
        if (!text) return message.reply("상품의 가격을 적어주세요.");
        if (isNaN(text)) return message.reply("상품의 가격은 숫자만 가능합니다");

        if (!money[user.id]) money[user.id] = {
        money: 0
		};

        if (!money[user.id]) money[user.id] = {
            money: text
        };

        money[user.id].money +=+ text;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });

        var money1_embed = new (require("discord.js").MessageEmbed)()
        money1_embed.setDescription(`${user}님 ${cha} 구매 감사합니다. (누적금액 : ${money[user.id].money}원)`)
        money1_embed.setColor("RANDOM")
        message.channel.send(money1_embed)

        var money2_embed = new (require("discord.js").MessageEmbed)()
        money2_embed.setDescription(`${user}님 ${cha} 구매(누적금액 : ${money[user.id].money}원)`)
        money2_embed.setColor("RANDOM")
        client.channels.cache.get("기록 채널id").send(money2_embed)
	}
	
	if (message.content.startsWith('!금액조회')) {

        if (!money[message.author.id]) money[message.author.id] = {
        money: 0
		};
		
		fs.readFile("./money.json", JSON, function(err, contents) {
            if(err) console.log(err);
        });

        var money3_embed = new (require("discord.js").MessageEmbed)()
        money3_embed.setDescription(`${message.author}님의 누적금액은 ${money[message.author.id].money}원입니다!`)
        money3_embed.setColor("RANDOM")
        message.channel.send(money3_embed)
	}
});

client.login(config.token);