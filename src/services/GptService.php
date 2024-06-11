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

	public function __construct() {
		$this->httpClient = new Client();
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

		$model = $plugin->settings->gptModel;

		// model overrides
		switch ($model) {
			case 'default':
				$model = 'gpt-4o';
				break;

			case 'gpt-4-1106-preview':
				$model = 'gpt-4-turbo-preview';
				break;

			case 'gpt-3.5-turbo-1106':
				$model = 'gpt-3.5-turbo';
				break;
		}

		try {
			$response = $this->httpClient->post(
				'https://api.openai.com/v1/chat/completions',
				[
					'headers' => [
						'Authorization' => 'Bearer ' . $apiKey,
						'Content-Type' => 'application/json'
					],
					'json' => [
						'model' => $model,
						'messages' => $messages,
						// 'temperature' => 1,
						'max_tokens' => $plugin->settings->maxTokens
						// 'top_p' => 1,
						// 'frequency_penalty' => 0,
						// 'presence_penalty' => 0
					]
				]
			);

			$body = $response->getBody();
			$content = json_decode($body, true);

			Craft::info('gpt response: '. $body);

			return $content['choices'][0]['message']['content'] ?? null;
		} catch (GuzzleException $e) {
			Craft::error('Failed to generate content with GPT: ' . $e->getMessage(), __METHOD__);
			throw $e;
		}
	}
}
