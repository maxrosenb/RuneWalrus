import Discord from 'discord.js'
import ytdl from 'ytdl-core'
import {
  NoSubscriberBehavior,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice'
import { TOKEN } from './config'
import { routeMessage } from './routeMessage'
import { client } from './utils/client'
import play from 'play-dl'
// import { play } from './commands/play'

if (!TOKEN) {
  console.log(
    'No Discord API token found. Please set your token as the TOKEN environment variable in a .env file.'
  )
  process.exit(1)
}

const loopRunescapeMusic = async () => {
  console.log('LOOPING RUNESCAPE MUSIC')
  const guild: Discord.Guild = await client.guilds.fetch('613483727229812752')

  const connection = joinVoiceChannel({
    channelId: '951646015734300712',
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
  })

  const stream = await play.stream('https://www.youtube.com/watch?v=_kim_qGTjZY')

  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
    inlineVolume: true,
  })

  const serverAudioPlayer = createAudioPlayer()

  resource.volume?.setVolume(0.2)

  serverAudioPlayer.play(resource)
  connection.subscribe(serverAudioPlayer)
}

client.once('ready', async (): Promise<void> => {
  console.log('LOADED RUNEWALRUS')
  loopRunescapeMusic()

  setInterval(async () => {
    console.log('interval loop called')
    loopRunescapeMusic()
  }, 7200000)
})

client.on('messageCreate', async (message: Discord.Message) => {
  await routeMessage(message)
})

client.login(TOKEN)
