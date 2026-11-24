import { inngest } from "@/inngest/client";
import { Id } from "../../../../convex/_generated/dataModel";
import { NonRetriableError } from "inngest";
import { convex } from "@/lib/convex-client";
import { api } from "../../../../convex/_generated/api";

interface MessageEvent {
    messageId: Id<"messages">;
    // conversationId: Id<"conversations">;
    // projectId: Id<"projects">;
    // message: string;
};

export const processMessage = inngest.createFunction(
    {
        id: "process-message",
        triggers: [{ event: "message/sent" }],
        cancelOn: [
            {
                event: "message/cancel",
                if: "event.data.messageId == async.data.messageId",
            },
        ],
        onFailure: async ({ event, step }) => {
            const { messageId } = event.data.event.data as MessageEvent;
            const internalKey = process.env.POLARIS_CONVEX_INTERNAL_KEY;

            // Update the message with error content
            if (internalKey) {
                await step.run("update-message-on-failure", async () => {
                    await convex.mutation(api.system.updateMessageContent, {
                        internalKey,
                        messageId,
                        content: "My apologies, I encountered an error while processing your request. Let me know if you need anything else!",
                    });
                });
            }
        }
    },
    // {
    //     event: "message/sent",   // this line give error: of Expected 2 arguments, but got 3
    // },
    async ({ event, step }) => {
        const { messageId } = event.data as MessageEvent;

        const internalKey = process.env.POLARIS_CONVEX_INTERNAL_KEY;

        if (!internalKey) {
            throw new NonRetriableError("POLARIS_CONVEX_INTERNAL_KEY is not configured");
        }

        await step.sleep("wait-for-ai-processing", "5s");

        // await step.run("throw-on-purpose", () => {
        //     throw new NonRetriableError("Purposely threw this");
        // })

        await step.run("update-assistant-message", async () => {
            await convex.mutation(api.system.updateMessageContent, {
                internalKey,
                messageId,
                content: "AI processed this message (TODO)"
            })
        });
    }
);