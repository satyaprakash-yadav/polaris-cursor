import { google } from "@ai-sdk/google";
import { inngest } from "./client";
import { firecrawl } from "@/lib/firecrawl";
import { generateText } from "ai";

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate", triggers: { event: "demo/generate" } },
  async ({ event, step }) => {
    const { prompt } = event.data as { prompt: string; };

    // step 1: extract all urls from user query
    const urls = await step.run("extract-urls", async () => {
      return prompt.match(URL_REGEX) || [];
    }) as string[];

    // step 2: scrape those url using firecrawl in the markdown format
    const scrapedContent = await step.run("scrape-urls", async () => {
      const results = await Promise.all(
        urls.map(async (url) => {
          const result = await firecrawl.scrape(
            url,
            { formats: ["markdown"] },
          );
          return result.markdown ?? null;
        }),
      );
      return results.filter(Boolean).join("\n\n");
    });

    // then combine them into the prompt leading us to last and 3rd step
    const finalPrompt = scrapedContent
      ? `Context:\n${scrapedContent}\n\nQuestion: ${prompt}`
      : prompt;

    // step 3: generate response using this new context
    await step.run("generate-text", async () => {
      return await generateText({
        model: google('gemini-3.5-flash'),
        prompt: finalPrompt,
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      });;
    });
  }
);

export const demoError = inngest.createFunction(
  {
    id: "demo-error",
    triggers: { event: "demo/error" }
  },
  async ({ step }) => {
    await step.run("fail", async () => {
      throw new Error("Inngest error: Background job failed!");
    });
  },
);
