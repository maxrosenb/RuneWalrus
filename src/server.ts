import Discord from 'discord.js'
import ytdl from 'ytdl-core'
import { createAudioPlayer, createAudioResource, joinVoiceChannel } from '@discordjs/voice'
import { TOKEN } from './config'
import { routeMessage } from './routeMessage'
import { client } from './utils/client'

// import { play } from './commands/play'

if (!TOKEN) {
  console.log(
    'No Discord API token found. Please set your token as the TOKEN environment variable in a .env file.'
  )
  process.exit(1)
}

const loopRunescapeMusic = async () => {
  const guild: Discord.Guild = await client.guilds.fetch('910798175550451712')

  const connection = joinVoiceChannel({
    channelId: '910798176129277954',
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
  })

  const serverAudioPlayer = createAudioPlayer()
  console.log('GOT HERE 1')
  const output = ytdl('https://www.youtube.com/watch?v=_kim_qGTjZY', { filter: 'audioonly' })
  console.log('GOT HERE 2')
  const youtubeSong = createAudioResource(output)
  youtubeSong.volume?.setVolume(0.5)

  serverAudioPlayer.play(youtubeSong)
  connection.subscribe(serverAudioPlayer)
  console.log('GOT HERE 3')
}

client.once('ready', async (): Promise<void> => {
  console.log('LOADED RUNEWALRUS')
  loopRunescapeMusic()

  setInterval(async () => {
    loopRunescapeMusic()
  }, 7200000)
})

client.on('messageCreate', async (message: Discord.Message) => {
  await routeMessage(message)
})

client.login(TOKEN)
