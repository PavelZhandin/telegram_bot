export interface YCContext {
    token: {
        access_token: string;
    };
}

interface GlobalContext {
    context: YCContext | null;
}

export const globalContext: GlobalContext = { context: null };
