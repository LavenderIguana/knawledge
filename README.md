# AI Knowledge Summary Analyzer

https://knowledge2.vercel.app

## Demo

![Knowledge Analyzer Demo](knowledge.gif)

## Overview
This project is an AI-powered tool designed to analyze and summarize knowledge content from various sources. It uses natural language processing techniques to extract key information, generate concise summaries, and provide insights about content.

## Features
- Automatic content summarization
- Key points extraction
- Sentiment analysis
- Topic identification
- Readability metrics
- Citation and source verification
- Quick summarization shortcuts:
  - Anonymous access via URL parameters
  - Authenticated API endpoint for integrations

## 🔑 API Setup for Shortcuts

![API Setup Demo](apiSetup.gif)

To enable quick summarization shortcuts and integrations, you can set up API access as follows:

1. **Go to App Settings:**
   - Navigate to the app settings page in your account dashboard.
2. **Create an API Key:**
   - In the settings, find the section for API Keys and generate a new key.
3. **Use the API Key:**
   - When using the shortcut or integration, paste your API key in the field labeled `API Token`.
   - This token will authenticate your requests to the API endpoint.

**Example Usage:**

```
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://knowledge2.vercel.app/api/shortcut?content=YOUR_CONTENT
```

Replace `YOUR_API_KEY` with the key you generated, and `YOUR_CONTENT` with the text or URL you want to summarize.

## 📜 License
This project is distributed under the [MIT License](https://opensource.org/license/mit).