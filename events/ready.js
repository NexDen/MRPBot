const Discord = require("discord.js");
const conf = global.config;
module.exports = async client => {
  client.user.setPresence({ activity: { type: "PLAYING", name: `WITCHER ❤️ ${conf.durum}`}, status: 'dnd' })
};

///Type kısmına yazabilecekleriniz.\\\
// WATCHING - İZLİYOR
// PLAYING - OYNUYOR
// LISTENING - DİNLİYOR
// COMPETING - Yarışmasında Yarışıyor

///Status kısmına yazabilecekleriniz.\\\
// online - çevrim içi
// idle - boşta
// dnd - rahatsız etmeyin
