require('dotenv').config()
const { Telegraf } = require('telegraf') //from telegraf package we are importing Telegraf class
const { message } = require('telegraf/filters')//from telegraf/filters we are importing message function

let bot = new Telegraf(process.env.BOT_TOKEN)//creating a new bot instance and passing the token

bot.start((context)=>{
    context.reply('Welcome to my bot')//when user starts the bot it will reply with this message
})
bot.command('hii', (ctx) => ctx.reply('Hello'))
bot.command('location', (ctx) => ctx.replyWithLocation( 20.3507, 85.8063))
bot.launch()//launching the bot