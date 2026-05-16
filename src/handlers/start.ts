import { Keyboard } from "grammy";
import { Hears } from "../consts/hears";
import { BotContext } from "../types/bot-types";

const keyboard = new Keyboard()
    .text(Hears.AI_HELPER)
    .text(Hears.TEST_GENERATOR)
    .text(Hears.HELP)
    .resized()
    .persistent()

export async function startHandler (ctx: BotContext) {
    const name = ctx.from?.first_name ?? "Господин";

    await ctx.reply(
        `Привет, ${name}!
        
        Я твой личный консультант.

        /start - начать работу
        /ai - задать вопрос АИ помощнику
        /test - сгенерировать тест по теме
        `, { reply_markup: keyboard }

    )
}
