require('dotenv').config()
const { Telegraf } = require('telegraf') //from telegraf package we are importing Telegraf class
const express=require('express')
const { GoogleGenAI } =require( "@google/genai" );
require('dotenv').config()
const app=express()
const port=3001
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

app.use(express.json());
app.use(function(req,res,next){
  console.log("middleware executed for every request");
  next();
});
let bot = new Telegraf(process.env.BOT_TOKEN)//creating a new bot instance and passing the token

bot.start((context)=>{
    context.reply('Welcome to my bot')//when user starts the bot it will reply with this message
})
bot.on('text', async(ctx) => {
  //add api key in .env file and use it here
  try {
    const prompt=ctx.message.text
    console.log(prompt)

    
    const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,

})
 ctx.reply(response.text)}

  
  catch (error) {
    console.error(error);
    ctx.reply('An error occurred while processing your request.');
  }})
  bot.launch()//launching the bot
  
  
  
 




app.listen(port,()=>{
  console.log(`server is running on port http://localhost:${port}`)
})




// const { message } = require('telegraf/filters')//from telegraf/filters we are importing message function


// bot.command('hii', (ctx) => ctx.reply('Hello'))
// bot.command('location', (ctx) => ctx.replyWithLocation( 20.3507, 85.8063))
// bot.launch()//launching the bot