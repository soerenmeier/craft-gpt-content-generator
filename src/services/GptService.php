<?php

namespace soerenmeier\gptcontentgenerator\services;

use Craft;
use craft\base\Component;
use craft\helpers\App;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use soerenmeier\gptcontentgenerator\GptContentGenerator;

class GptService extends Component
{
	private $httpClient;
	// private $apiKey;
	private $apiEndpoint;

	public function __construct()
	{
		$this->httpClient = new Client();
		// Retrieve your API key from a secure location, like an environment variable
		// $this->apiKey = getenv('GPT_API_KEY');
		// Set the API endpoint URL
		$this->apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
	}

	/**
	 * Sends a prompt to the GPT API and returns the generated content.
	 *
	 * @param string $prompt The prompt to send to the GPT model.
	 * @return string|null The generated content or null if an error occurs.
	 */
	public function generateContent(string $prompt): ?string {
		$plugin = GptContentGenerator::$plugin;
		$apiKey = App::parseEnv($plugin->settings->apiKey);

		$messages = [];
		$messages[] = [
			'role' => 'system',
			'content' => 'Your are a Craft Cms content editor. You can translate and create entries. Respond only with the value since you\'re response will directly be inserted into a field.'
		];
		$messages[] = [
			'role' => 'user',
			'content' => $prompt
		];

		try {
			$response = $this->httpClient->post(
				'https://api.openai.com/v1/chat/completions',
				[
					'headers' => [
						'Authorization' => 'Bearer ' . $apiKey,
						'Content-Type' => 'application/json'
					],
					'json' => [
						'model' => 'gpt-4-1106-preview',
						'messages' => $messages
						// 'temperature' => 1,
						// 'max_tokens' => 256,
						// 'top_p' => 1,
						// 'frequency_penalty' => 0,
						// 'presence_penalty' => 0
					]
				]
			);

			$body = $response->getBody();
			$content = json_decode($body, true);

/*
{
  "id": "chatcmpl-8JiimhCzsrc8dnstAVDXhN8UhwxY6",
  "object": "chat.completion",
  "created": 1699710832,
  "model": "gpt-3.5-turbo-16k-0613",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Bonjour, je m'appelle Frank et je veux dire quelque chose."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 44,
    "completion_tokens": 15,
    "total_tokens": 59
  }
}
*/

			Craft::info('gpt response: '. $body);

			return $content['choices'][0]['message']['content'] ?? null;
		} catch (GuzzleException $e) {
			Craft::error('Failed to generate content with GPT: ' . $e->getMessage(), __METHOD__);
			return null;
		}
	}
}
