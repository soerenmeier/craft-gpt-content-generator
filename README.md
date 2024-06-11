# GPT Content Generator for Craft CMS

## Overview

GPT Content Generator is a dynamic plugin designed for Craft CMS 4. It integrates advanced GPT capabilities into your CMS, enabling the creation, enhancement, and translation of text content with ease.

## Key Features

**GPT-Powered Prompts**: Utilize GPT technology to process and respond to prompts within text fields. These prompts are built using Twig templates, which allow access to various site-specific details like language settings, field instructions, and labels.

**Prompt Organization and Access Control**: To streamline content management and enhance security, prompts can be organized into groups. Each field can be associated with a specific prompt group, ensuring a structured and efficient workflow. Importantly, each group is equipped with its own set of permissions, allowing you to control who can view and edit the prompts.

## Supported Fields

The plugin currently supports the following fields:

-   [x] Title
-   [x] Plaintext
-   [x] Redactor
-   [x] CkEditor
-   [x] TinyMCE

## Installation

Via the [Craft Plugin Store](https://plugins.craftcms.com/gpt-content-generator?craft5) or the command-line:

```
composer require soerenmeier/gpt-content-generator -w && php craft plugin/install gpt-content-generator
```

## Contribute and Support

I am constantly looking to expand and improve GPT Content Generator. If you have a request for a new field to be supported or any other suggestions, please feel free to open an issue on my GitHub repository.
