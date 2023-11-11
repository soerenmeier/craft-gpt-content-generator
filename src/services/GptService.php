<?php

namespace soerenmeier\gptcontentgenerator\services;

use Craft;
use craft\base\Component;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class GptService extends Component
{
	private $httpClient;
	private $apiKey;
	private $apiEndpoint;

	public function __construct()
	{
		$this->httpClient = new Client();
		// Retrieve your API key from a secure location, like an environment variable
		$this->apiKey = getenv('GPT_API_KEY');
		// Set the API endpoint URL
		$this->apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
	}

	/**
	 * Sends a prompt to the GPT API and returns the generated content.
	 *
	 * @param string $prompt The prompt to send to the GPT model.
	 * @return string|null The generated content or null if an error occurs.
	 */
	public function generateContent(string $prompt): ?string
	{
		try {
			$response = $this->httpClient->post($this->apiEndpoint, [
				'headers' => [
					'Authorization' => 'Bearer ' . $this->apiKey,
					'Content-Type' => 'application/json',
				],
				'json' => [
					'prompt' => $prompt,
					// Add any additional parameters required by the API here
				],
			]);

			$body = $response->getBody();
			$content = json_decode($body, true);

			return $content['choices'][0]['text'] ?? null; // Adapt based on the actual API response structure
		} catch (GuzzleException $e) {
			Craft::error('Failed to generate content with GPT: ' . $e->getMessage(), __METHOD__);
			return null;
		}
	}
}
