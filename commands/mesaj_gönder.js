const { SlashCommandBuilder } = require("discord.js")

async function gönder(interaction){
    interaction.reply("0")
    for (var i=1; i<100; i++){
        await interaction.channel.send(`${i}`)
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mesaj_gönder")
        .setDescription("zort"),
    async execute(interaction){
        gönder(interaction)
    }
}