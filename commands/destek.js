const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const client = global.client;
const conf = global.config;

async function destek(interaction){
    var embed = new EmbedBuilder()
        .setTitle(`Destek Bildirisi`)
        .setColor("#1f1e33")
        .setDescription(`Destek talebiniz yetkililere ulaştırıldı. Yetkililer en kısa sürede sizinle ilgilenecektir. Anlaşıyınız için teşekkürler.`)
        .setFooter({text:'Profesyonel Otuzbirciler Derneği'})
    
        interaction.reply({
            embeds : [embed]
        })
        interaction.channel.send(`<@&` + conf.yetkiliRol + `>`).then(m => m.delete({timeout: 1500})).catch(err => {})

}
module.exports = {
    data: new SlashCommandBuilder()
        .setName("destek")
        .setDescription("Destek almak için bu komutu çalıştırın."),
    async execute(interaction){
        destek(interaction)
    }
}