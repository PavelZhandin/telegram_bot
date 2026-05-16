import "dotenv/config";
import { Bot, session } from "grammy";
import { BotContext, SessionData } from "./types/bot-types";
import { startHandler } from "./handlers/start";
import { Hears } from "./consts/hears";
import { AiAnswerHandler } from "./handlers/ai-answer";
import { HelpHandler } from "./handlers/help";

const BOT_TOKEN = process.env.BOT_TOKEN;

if ( !BOT_TOKEN ) {
    throw new Error("BOT_TOKEN is not set in .env file")
}

export const bot = new Bot<BotContext>(BOT_TOKEN);

bot.use(
    session<SessionData, BotContext>({
        initial: () => ({
            waitingForAI: false,
        }),
    })
);

bot.command("start", startHandler);

bot.hears(Hears.AI_HELPER, (ctx, next) => {
    ctx.session.waitingForAI = true;
    ctx.reply("Задайте ваш вопрос:");
});
bot.hears(Hears.TEST_GENERATOR, AiAnswerHandler);
bot.hears(Hears.TEST_GENERATOR, HelpHandler);

bot.on("message:text", AiAnswerHandler);

