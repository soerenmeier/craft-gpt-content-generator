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
	}

	/**
	 * Sends a prompt to the GPT API and returns the generated content.
	 *
	 * @param string $prompt The prompt to send to the GPT model.
	 * @return string|null The generated content or null if an error occurs.
	 */
	public function generateContent(string $prompt): ?string
	{
		$plugin = GptContentGenerator::$plugin;

		$model = $plugin->settings->gptModel;

		// model overrides and deprecations
		switch ($model) {
			case 'default':
				$model = 'gpt-4o';
				break;

			case 'gpt-4-turbo-preview':
				$model = 'gpt-4-turbo';
				break;

			case 'gpt-4-1106-preview':
				$model = 'gpt-4-turbo';
				break;

			case 'gpt-3.5-turbo-1106':
				$model = 'gpt-3.5-turbo';
				break;

			case 'gpt-3.5-turbo-16k':
				$model = 'gpt-3.5-turbo';
				break;
		}

		$system =
			'You generate text values for Craft CMS fields. Respond ' .
			'only with the content value, without quotes, code blocks, ' .
			'explanations, or formatting. If the text contains HTML ' .
			'tags, preserve them exactly as provided.';

		if (str_starts_with($model, 'gpt-5')) {
			// $body['reasoning'] = ['effort' => 'low'];
			return $this->responses($model, $system, $prompt);
		}

		return $this->completions($model, $system, $prompt);
	}

	private function completions(string $model, string $system, string $prompt)
	{
		$plugin = GptContentGenerator::$plugin;
		$apiKey = App::parseEnv($plugin->settings->apiKey);

		$messages = [];
		$messages[] = [
			'role' => 'system',
			'content' => $system,
		];
		$messages[] = [
			'role' => 'user',
			'content' => $prompt,
		];

		try {
			$response = $this->httpClient->post(
				'https://api.openai.com/v1/chat/completions',
				[
					'headers' => [
						'Authorization' => 'Bearer ' . $apiKey,
						'Content-Type' => 'application/json',
					],
					'json' => [
						'model' => $model,
						'messages' => $messages,
						// 'temperature' => 1,
						'max_tokens' => $plugin->settings->maxTokens,
						// 'top_p' => 1,
						// 'frequency_penalty' => 0,
						// 'presence_penalty' => 0
					],
				],
			);

			$body = $response->getBody();
			$content = json_decode($body, true);

			Craft::info('gpt response: ' . $body);

			return $content['choices'][0]['message']['content'] ?? null;
		} catch (GuzzleException $e) {
			Craft::error(
				'Failed to generate content with GPT: ' . $e->getMessage(),
				__METHOD__,
			);
			throw $e;
		}
	}

	private function responses(string $model, string $system, string $prompt)
	{
		$plugin = GptContentGenerator::$plugin;
		$apiKey = App::parseEnv($plugin->settings->apiKey);

		$input = [
			[
				'role' => 'user',
				'content' => $prompt,
			],
		];

		try {
			$response = $this->httpClient->post(
				'https://api.openai.com/v1/responses',
				[
					'headers' => [
						'Authorization' => 'Bearer ' . $apiKey,
						'Content-Type' => 'application/json',
					],
					'json' => [
						'model' => $model,
						'instructions' => $system,
						'input' => $input,
						'max_output_tokens' => $plugin->settings->maxTokens,
						'reasoning' => ['effort' => 'low'],
						'response_format' => ['type' => 'text'],
					],
				],
			);

			$body = $response->getBody();
			$content = json_decode($body, true);

			Craft::info('gpt response: ' . $body);

			// Get the last message from the output array
			$outputs = $content['output'] ?? [];
			$lastOutput = end($outputs);
			return $lastOutput['content'][0]['text'] ?? null;
		} catch (GuzzleException $e) {
			Craft::error(
				'Failed to generate content with GPT: ' . $e->getMessage(),
				__METHOD__,
			);
			throw $e;
		}
	}
}
