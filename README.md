# Chase Walrus LLM Chatbot

## Overview

This project implements a multilingual chatbot interface using vanilla JavaScript. The chatbot supports ticket tracking, ticket creation guidance, attendance checking, and basic UI customization features such as language selection, dark mode toggle, and color theme adjustments.

The chatbot interface is designed to interact with users by responding to their queries related to tickets and attendance, providing mock ticket details, and offering suggestions for common actions.

## Dependencies

- **No external JavaScript libraries or frameworks** are required. The entire functionality is implemented using plain JavaScript.
- The script depends on a specific HTML structure with elements having certain IDs and classes (e.g., `chat-box-normal`, `user-input-normal`, `send-btn-normal`, `language-select`, `settings-modal`, etc.).
- The CSS file (`gollum.css`) is used for styling the chatbot interface and UI components.
- The HTML file (`gollum.html`) should include the necessary elements and link to this JavaScript file (`gollum.js`) and the CSS file.

## How It Works

- The script initializes when the DOM content is fully loaded.
- It maintains a chat history and tracks the currently selected language (default is English).
- A `translations` object contains localized strings for English, Spanish, French, and German, including prompts, suggestions, and UI text.
- The chatbot listens for user input via a text input box and a send button, as well as suggestion bubbles that users can click.
- When a user sends a message, the script analyzes the input to detect keywords related to tickets, attendance, or other supported queries.
- For ticket-related queries, it can:
  - Provide mock ticket details for known or user-supplied ticket IDs.
  - Prompt the user to create a new ticket or check existing tickets.
- For attendance-related queries, it provides predefined responses about attendance status or missing attendance dates.
- The chatbot dynamically adds messages to the chat box, including clickable suggestion bubbles for quick responses.
- UI customization features include:
  - Language selection dropdown to switch the interface language.
  - Dark mode toggle.
  - Color pickers to customize background, header, sidebar, hamburger menu, and button colors.
  - Sidebar toggle to collapse or expand the sidebar.
- The "New Chat" button clears the chat and shows initial suggestions.
- The "Historical Chats" button displays the chat history.
- The "Settings" button opens a modal for UI customization.

## Usage

1. Open `gollum.html` in a modern web browser.
2. Interact with the chatbot by typing messages in the input box or clicking on suggestion bubbles.
3. Use the settings panel to change language, toggle dark mode, and customize colors.
4. Use the sidebar buttons to start a new chat or view historical chats.

## File Structure

- `gollum.html` - The HTML markup for the chatbot interface.
- `gollum.css` - The CSS styles for the chatbot UI.
- `gollum.js` - The JavaScript logic implementing chatbot behavior and UI interactions.

## Notes

- The ticket details are randomly generated mock data for demonstration purposes.
- The chatbot does not connect to any backend or external API; all logic is client-side.
- The translations object can be extended to support additional languages or updated phrases.
