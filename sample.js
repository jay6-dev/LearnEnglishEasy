import ModelClient from "@azure-rest/ai-inference"; 
import { AzureKeyCredential } from "@azure/core-auth";

// Get the token from the environment variable (ensure it's set)
const token = process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error("API token not found. Please set GITHUB_TOKEN as an environment variable.");
}

const endpoint = "https://models.inference.ai.azure.com";
const modelName = "meta-llama-3.1-405b-instruct";

export async function main() {
  try {
    const client = new ModelClient(endpoint, new AzureKeyCredential(token));

    // Request to the API
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "What is the capital of France?" }
        ],
        model: modelName,
        temperature: 1.0,
        max_tokens: 1000,
        top_p: 1.0
      }
    });

    if (response.status !== "200") {
      throw new Error(response.body.error || `Failed with status code ${response.status}`);
    }

    // Log the assistant's response
    console.log(response.body.choices[0].message.content);

  } catch (err) {
    console.error("The sample encountered an error:", err);
  }
}

// Run the main function
main();
