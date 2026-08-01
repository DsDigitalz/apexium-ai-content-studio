/**
 * Model Switcher
 * Central entry point for the Content Studio.
 * Selects an AI provider, builds the correct prompt, generates content,
 * strips any asterisks from the answer, and returns a normalized response.
 */

const openai = require("./openai");
const gemini = require("./gemini");
const claude = require("./claude");
const { buildPrompt } = require("./templates");

const PROVIDERS = {
  openai,
  gemini,
  claude,
};

const FALLBACK_ORDER = ["gemini", "openai", "claude"];

/**
 * Generate AI content using the selected provider.
 */
async function generateContent(options = {}) {
  const {
    provider,
    contentType = "social_caption",
    tone = "Professional",
    topic,
    maxTokens = 800,
  } = options;

  if (!provider) {
    throw new Error('A provider is required. Use "openai", "gemini", or "claude".');
  }

  if (!tone) {
    throw new Error("A tone is required.");
  }

  if (!topic) {
    throw new Error("A topic is required.");
  }

  const normalizedProvider = provider.toLowerCase().includes("openai") || provider.toLowerCase().includes("gpt")
    ? "openai"
    : provider.toLowerCase().includes("claude") || provider.toLowerCase().includes("anthropic")
    ? "claude"
    : "gemini";

  const chosenProvider = PROVIDERS[normalizedProvider];

  if (!chosenProvider) {
    throw new Error(`Unknown provider "${provider}". Valid options are: gemini, openai, claude`);
  }

  const { systemPrompt, userPrompt } = buildPrompt({
    contentType,
    tone,
    topic,
  });

  try {
    const result = await chosenProvider.generate({
      prompt: userPrompt,
      systemPrompt,
      maxTokens,
    });

    // Ensure asterisks are completely removed from generated content
    const sanitizedText = (result.text || "").replace(/\*/g, "");

    return {
      ...result,
      text: sanitizedText,
      provider: normalizedProvider,
      contentType,
      tone,
      topic,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return handleFallback({
      error,
      options: {
        ...options,
        provider: normalizedProvider,
        maxTokens,
      },
    });
  }
}

async function handleFallback({ error, options }) {
  const triedProviders = options._tried || [options.provider];

  const nextProvider = FALLBACK_ORDER.find(
    (providerName) => !triedProviders.includes(providerName)
  );

  if (!nextProvider) {
    throw error;
  }

  console.warn(
    `[modelSwitcher] "${options.provider}" failed: ${
      error.message || "Unknown error"
    }. Falling back to "${nextProvider}".`
  );

  return generateContent({
    ...options,
    provider: nextProvider,
    _tried: [...triedProviders, nextProvider],
  });
}

module.exports = {
  generateContent,
  PROVIDERS,
};