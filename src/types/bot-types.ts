import { Context, SessionFlavor } from "grammy";

export  interface SessionData {
    waitingForAI: boolean;
}

export type BotContext = Context & SessionFlavor<SessionData>;
