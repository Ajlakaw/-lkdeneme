import discord
from discord.ext import commands
from config import token
import random

intents = discord.Intents.default()
intents.message_content = True

client = commands.Bot(command_prefix='/', intents=intents)

# Ek görev için Car sınıfı
class Car:
    def __init__(self, color, brand):
        self.color = color
        self.brand = brand

    def info(self):
        return f"Araba bilgisi: Marka = {self.brand}, Renk = {self.color}"

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    # Eğer komutsa önce komutları çalıştır
    if message.content.startswith(client.command_prefix):
        await client.process_commands(message)
        return

    # Eğer mesajda resim eki varsa
    if message.attachments:
        for attachment in message.attachments:
            if attachment.content_type and attachment.content_type.startswith('image/'):
                await message.channel.send("Bir resim gönderdin! 🖼️")
                return

    # Bot mention + merhaba
    if client.user in message.mentions and "merhaba" in message.content.lower():
        await message.channel.send(f"Sana da merhaba {message.author.mention}")

    # Herkese merhaba
    elif message.content.lower().startswith("merhaba herkese"):
        await message.channel.send("Merhaba herkese!")

    # İyiyim sen nasılsın
    elif message.content.lower().startswith("iyiyim sen nasılsın?"):
        await message.channel.send("Ben de iyi olmaya çalışıyorum.")

    # Nasılsın
    elif message.content.lower().startswith("nasılsın?"):
        await message.channel.send("İyi olmaya çalışıyorum.")

    # Normal merhaba
    elif message.content.lower().startswith("merhaba"):
        await message.channel.send(f"Merhaba {message.author.name}")

    # Sitemli mesaj
    elif message.content.lower().startswith("neden sen sormadın benim nasıl olduğumu"):
        await message.channel.send(f"Çünkü senden daha önemli işlerim var {message.author.mention}")

    # Kırıcısın mesajı
    elif message.content.lower().startswith("çok kırıcısın"):
        await message.channel.send(f"Sağ ol {message.author.mention} 😀😊 Daha çok kırıcı olmak isterim ama...")

    # Diğer mesajları echo yap
    else:
        await message.channel.send(message.content)

# /about komutu
@client.command()
async def about(ctx):
    await ctx.send("Ben Smile Chatbot 2.1'im 🫠")

# /info komutu
@client.command()
async def info(ctx):
    await ctx.send("Ben mesajlara cevap veren bir Discord botuyum. /about, /info, /choose ve /car komutlarını destekliyorum!")

# Yeni handler: /choose pizza burger makarna
@client.command()
async def choose(ctx, *options):
    if len(options) < 2:
        await ctx.send("Lütfen en az 2 seçenek gir! Örnek: /choose pizza burger makarna")
    else:
        selected = random.choice(options)
        await ctx.send(f"Seçimim: {selected}")

# Ek görev (bonus): /car kırmızı BMW
@client.command()
async def car(ctx, color, brand):
    my_car = Car(color, brand)
    await ctx.send(my_car.info())

client.run(token)