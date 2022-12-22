const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const client = global.client;
const conf = global.config;

exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(conf.kayıtsızRol)) return message.reply(new EmbedBuilder().setTitle("İşlem Başarısız").setDescription(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.`).setColor("RED").setFooter("The Witcher")).then(m => m.delete({timeout: 5000})).catch(err => {});

    message.channel.send(new EmbedBuilder()
    .setTitle(`Kayıt Bildirisi`)
    .setColor("RANDOM")
    .setDescription(`**Sunucuya hoş geldiniz. Kayıt odasına geçip yetkilileri bekleyiniz. Ortalama kayıt bekleme süresi 5-10 dakikadır. İlginiz için teşekkürler.**`)
    .setFooter('The Witcher')
    )
    message.channel.send(`<@&` + conf.yetkiliRol + `>`).then(m => m.delete({timeout: 1500})).catch(err => {})



  }

exports.config = {
    name: "kayıt",
    guildOnly: true,
    aliases: [],
  };