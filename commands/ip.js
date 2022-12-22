const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const client = global.client;
const conf = global.config;

async function ip(interaction){
    var embed = new EmbedBuilder()
        .setTitle(`Sunucu Bilgileri`)
        .setColor("#1f1e33")
        .setDescription(`**Sunucuya bağlanmak için gerekli bilgiler; \n\n Sunucu IP = ${conf.sunucuIp} \n\n NOT = Sunucuya girmeden yukarıyı kontrol ederek bakım veya restart durumunu görebilirsiniz. Aktif verilmemişse giriş sağlamayınız.**`)
        .setFooter(
            {
            text: "Profesyonel Otuzbirciler Derneği",
            }
    )
    interaction.reply(
        {
            embeds: [embed]
        }
    )
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ip")
        .setDescription("Sunucuya bağlanmak için gerekli bilgileri verir."),
    async execute(interaction){
        ip(interaction)
    }
}