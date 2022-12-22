const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const mta_client = require('gamedig')
const config_file = require('../config.json')

//client
async function sunucu(interaction){
		mta_client.query({
            type: 'mtasa',
            host: config_file["sunucuIp"],
            port: config_file["sunucuPort"]
        }).then(async (state) => {
            console.log(state)
            var embed = new EmbedBuilder()
            .setTitle(state.name)
            .setColor(`#1f1e33`)
            .addFields(
                {name: "Harita", value: `${state.map}`, inline: true},
                {name: "Oyuncu Sayısı", value: `${state.raw.numplayers}/${state.maxplayers}`, inline: true},
                {name: "Gecikme Süresi", value: `${state.ping} ms`, inline: true},
                {name: "IP Adresi", value: `${state.connect}`, inline: true}
            )
            .setTimestamp()
            .setFooter({text:"Profesyonel Otuzbirciler Derneği"})
            await interaction.reply({ embeds: [embed] })
        }).catch(err => {
            console.log(err)
        })
	}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('sunucu')
        .setDescription('MTA Sunucusunun Durumunu Verir.'),
    async execute(interaction){
        sunucu(interaction)
    }
}