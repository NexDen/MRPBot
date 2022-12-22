const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const client = global.client;
const conf = global.config;

async function bakım(interaction){
    if (!interaction.member.permissions.has("ADMINISTRATOR")) 
    {
        var embed = new EmbedBuilder().
            setTitle("İşlem Başarısız")
            .setDescription(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.`)
            .setColor("#1f1e33")
            .setFooter({text:"Profesyonel Otuzbirciler Derneği"})
        return interaction.reply(
            {
                embeds: [embed],
                ephemeral: true,
            })
            // .then(
            //     m => m.delete({timeout: 5000})
            //     ).catch(err => {});
    }
    var embed = new EmbedBuilder()
    .setTitle('SUNUCU BAKIMDA')
    .setColor("#1f1e33")
    .setImage(`https://cdn.discordapp.com/attachments/959490900520742972/1054790930684723290/Milano_roleplay.gif`)
    .setDescription(`**MRP Bakımdadır lütfen sunucuya giriş yapmayınız.**`)
    .setFooter({text:"Profesyonel Otuzbirciler Derneği"})
    interaction.reply({
        embeds : [embed],
    })
    interaction.channel.send("@everyone").then(m => m.delete({timeout: 5000})).catch(err => {})
    
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName("bakım")
        .setDescription("Bakım Açıklama Placeholder"),
    async execute(interaction){
        bakım(interaction)
    }
}