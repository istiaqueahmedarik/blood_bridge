import { createAI } from 'ai/rsc';
import { ClientMessage, continueConversation, ServerMessage } from './actions/action';

export const AI = createAI<ServerMessage[], ClientMessage[]>({
    actions: {
        continueConversation,
    },
    initialAIState: [],
    initialUIState: [],
});