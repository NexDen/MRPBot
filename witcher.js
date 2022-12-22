var { Discord, Client, Collection, GatewayIntentBits ,Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require("discord.js")
const fs = require("fs");
const conf = global.config = require("./config.json")
const path = require("node:path")
const mta_client = require('gamedig')

var client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
})
global.client = client;
global.conf = conf;

client.once('ready', () => { 
    console.log(`\x1b[33m${client.user.username}\x1b[0m\x1b[1m'a bağlanıldı!\x1b[0m'`)
    // client.user.setPresence({ activities: [{ name: 'MTA'}], status: 'online' });
    setInterval(() => {
        mta_client.query({
            type: 'mtasa',
            host: conf["sunucuIp"],
            port: conf["sunucuPort"]
        }).then((state) => {
            client.user.setActivity(`Şuan Sunucuda ${state.raw.numplayers} Kişi Var.`)
        }).catch(err => {
            console.log(err)
        })
    }, 60000)
});


client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
    if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command)
	} else {
		console.log(`[UYARI] ${filePath} komutu "data" veya "execute" komutu içermiyor.`);
	}
}

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return 

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error(`[KOMUT BULUNAMADI]`)
    }

    try {
        await command.execute(interaction)
    } catch (err){
        console.log("hata:", err)
        await interaction.reply({
            content: "Komut çalıştırırken bir hata oluştu.",
            ephemeral: true
        })
    }
})
/// Token ///
client.login(conf["token"])