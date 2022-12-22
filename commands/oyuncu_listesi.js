const { EmbedBuilder, SlashCommandBuilder, EmbedAssertions } = require("discord.js")
const mta_client = require('gamedig')
const config_file = require('../config.json')

async function oyuncu_listesi(interaction){
    mta_client.query({
        type: 'mtasa',
        host: config_file["sunucuIp"],
        port: config_file["sunucuPort"]
    }).then(async (state) => {
        var embed = new EmbedBuilder()
        .setTitle(state.name)
        .setColor(`#1f1e33`)
        .setTimestamp()
        .setFooter({text:"Profesyonel Otuzbirciler Derneği"})
        var oyuncular_str = ""
        state.players.forEach(player => {
            oyuncular_str += `${player.name}\n`
        })
        embed.addFields({
            name:oyuncular_str, value:"------"
        })
        await interaction.reply({ embeds: [embed] })
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("oyuncu_listesi")
        .setDescription("Oyuncu Listesini Verir."),
    async execute(interaction){
        oyuncu_listesi(interaction)
    }
}