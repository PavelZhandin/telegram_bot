import { markdownToHtml } from "../lib/formatMarkdown";
import { askDeepSeek } from "../services/ai";
import { BotContext } from "../types/bot-types";

export async function AiAnswerHandler(
    ctx: BotContext,
    next: () => Promise<void>
) {
    const message = ctx.message?.text;
    const reply = await askDeepSeek(message || '');

    await ctx.reply(reply)

    if (!ctx.session.waitingForAI) {
        return next();
    }

    if (!message) {
        return next();
    }

    ctx.session.waitingForAI = false;

    const thinkingMessage = await ctx.reply("Думаю...");

    const safeDelete = () => 
        ctx.api.deleteMessage(ctx.chat!.id, thinkingMessage.message_id);

    try {
        const response = await askDeepSeek(message);

        await ctx.reply(markdownToHtml(response));
    } catch (error) {
        console.error(error);
        await ctx.reply(
            "Произошла ошибка при обработке вашего запроса. Попробуйте позже."
        );
    } finally {
        safeDelete();
    }
}
