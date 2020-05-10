import discord
import json

accessToken = json.load(open("accessToken.json", 'r'))['token']

class MyClient(discord.Client):
    async def on_ready(self):
        print('Logged on as {0}!'.format(self.user))

    async def on_message(self, message):
        if message.content == '/happy':
            await message.channel.send("I'm fastest bot. (py)")
client = MyClient()
client.run(accessToken)