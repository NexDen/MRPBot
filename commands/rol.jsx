const { EmbedBuilder, SlashCommandBuilder} = require("discord.js")
const client = global.client;
const conf = global.config;

async function rol(interaction){

    if (!interaction.member.permissions.has("ADMINISTRATOR")) 
    {
        var embed = new EmbedBuilder()
                .setTitle("İşlem Başarısız")
                .setDescription(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.`)
                .setColor("#1f1e33")
                .setFooter({text:"Profesyonel Otuzbirciler Derneği"})
        return interaction.reply({
            embeds: [embed],
            ephemeral: true
        })//.then(m => m.delete({timeout: 5000})).catch(err => {});
    }
    // let uye = interaction.guild.member(interaction.mentions.users.first())
    let uye = interaction.options.getUser("üye")
    console.log(uye)
    if(!uye) return interaction.reply(
        {
            embeds: [new EmbedBuilder()
                .setTitle("İşlem Başarısız")
                .setDescription("Geçerli bir üye belirtmen gerekiyor.")
                .setColor("#1f1e33")
                .setFooter({text:"Profesyonel Otuzbirciler Derneği"})],
            ephemeral: true
    })//.then(m => m.delete({timeout: 5000})).catch(err => {});
    
    let rol = interaction.options.getRole("rol")
    if(!rol) return interaction.reply(
        {
            embeds: new EmbedBuilder()
                    .setTitle("İşlem Başarısız")
                    .setDescription("Geçerli bir rol belirtmen gerekiyor.")
                    .setColor("#1f1e33")
                    .setFooter({text:"Profesyonel Otuzbirciler Derneği"}), 
            ephemeral: true
        })//.then(m => m.delete({timeout: 5000})).catch(err => {});

    if(!interaction.member.roles.highest.comparePositionTo(rol)){
        console.log(interaction.member.roles.highest)
        console.log(rol)
        return interaction.reply(
            {
                embeds: [new EmbedBuilder()
                        .setTitle('İşlem Başarısız')
                        .setDescription("Almak/vermek istediğin rol senin rolünden daha yukarıda bundan dolayı işlemi gerçekleştiremem.")
                        .setColor("#1f1e33")
                        .setFooter({text:"Profesyonel Otuzbirciler Derneği"})],
                        ephemeral: true
        })//.then(m => m.delete({timeout: 5000})).catch(err => {});
    }
    if (uye.roles.cache.find(r => r.id === rol.id)) {
        uye.roles.remove(rol).catch(err => {})
        interaction.reply(
            {
                embeds: [new EmbedBuilder()
                        .setTitle("Rol Alındı")
                        .setDescription(`${uye} adlı üyeden ${rol} isimli rol başarılı bir şekilde alındı.`)
                        .setFooter({text:"Profesyonel Otuzbirciler Derneği"}).setColor("#1f1e33")],
                ephemeral: true
            })
                
        var kanal = interaction.guild.channels.cache.get(conf.rolalmaLog);
        kanal.send(
            {
                embeds: [new EmbedBuilder()
                        .setTitle('Rol Alındı')
                        .setDescription(`**Alınan Üye** \n${uye} (${uye.id})\n\n**Alan Yetkili**\n${interaction.author} (${interaction.author.id})\n\n**Yapılan Eylem**\n${rol} alındı.`)
                        .setColor("#1f1e33")
                        .setFooter({text:"Profesyonel Otuzbirciler Derneği"})],
            })
    } else {
        uye.roles.add(rol).catch(err => {})
        interaction.reply(new EmbedBuilder().setTitle("Rol Verildi").setDescription(`${uye} adlı üyeye ${rol} isimli rol başarılı bir şekilde verildi.`).setFooter({text:"Profesyonel Otuzbirciler Derneği"}).setColor("#1f1e33"))
        var kanal = interaction.guild.channels.cache.get(conf.rolvermeLog);
        kanal.send({
            embeds: [new EmbedBuilder()
                    .setTitle('Rol Verildi')
                    .setDescription(`**Verilen Üye** \n${uye} (${uye.id})\n\n**Veren Yetkili**\n${interaction.author} (${interaction.author.id})\n\n**Yapılan Eylem**\n${rol} verildi.`)
                    .setColor("#1f1e33")
                    .setFooter({text:"Profesyonel Otuzbirciler Derneği"})]
        })
    }
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName("rol")
        .setDescription("Kullanıcıya rol ekler.")
        .addUserOption(
            option => option.setName("üye").setDescription("Rol verilecek kullanıcı.").setRequired(true)
        )
        .addRoleOption(
            option => option.setName("rol").setDescription("Verilecek rol.").setRequired(true)
        ),
    async execute(interaction){
        rol(interaction)
    }
}