const { EmbedBuilder, SlashCommandBuilder, DiscordAPIError } = require("discord.js")
const client = global.client;
const conf = global.config;

async function temizle(interaction){
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")){
        return await interaction.reply({content:"kes", ephemeral: true})
    }
    var sayı = interaction.options.getInteger("sayı")
    var kanal = interaction.channel
    await interaction.deferReply()
    try{
        // await interaction.reply(`${sayı} tane mesaj siliniyor...`)
        var tekrar = Math.floor(sayı/100)
        for (var i=0 ; i <= tekrar; i++){
            console.log("çalıştı", sayı)
            var fetched = await kanal.messages.fetch({ limit: Math.min(100,sayı) })
            await interaction.channel.bulkDelete(fetched);
            sayı -= 100
        }
        await interaction.editReply(`${sayı} tane mesaj silindi!`)
    }
    catch(e){
        console.log("d")
        console.log(e)

        if (e instanceof DiscordAPIError){
            await interaction.editReply("14 günden önce gönderilmiş mesajlar silinemez! (Discord'un suçu)").then(m => m.delete({timeout: 5000})).catch(err => {})
            return;
        }
    }
    // await interaction.deleteReply();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("temizle")
        .setDescription("Mesaj siler.")
        .addIntegerOption(
            option => option.setName("sayı").setDescription("Silinecek Mesaj Sayısı (0=Tüm Kanal)")
        ),
    async execute(interaction){
        temizle(interaction)
    }
}
