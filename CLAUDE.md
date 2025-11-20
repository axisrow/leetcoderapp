# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native mobile app (Expo) for coding practice with AI-powered LeetCode problem solving and quiz generation. Uses Google Gemini API for content generation.

## Development Commands

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
```

## Architecture

### Navigation Flow
- **Auth Stack**: Login → Register
- **Main Stack**: Main (homepage) → Tasks/Puzzles → problem/quiz workflows
- **Component hierarchy**: Navigation.js dispatches to Auth or Main stacks based on authentication state

### Key Components
- `Navigation.js` - Stack navigator with conditional auth/main flow
- `CheckAnswer.js` - AI solution generator (3 JavaScript solutions via Gemini with explanations)
- `Puzzles.js` - AI quiz generator with configurable difficulty/topic, answer validation via Gemini
- `ApiLeetcode.js` - Fetch problems from LeetCode backend API, render with HTML
- `СodeForm.js` - Live JavaScript code editor with code execution and result display
- `Apifetcher.js` - Generate problem descriptions from raw data using Gemini
- `LoginPage.js` / `RegisterForm.js` - Authentication with JWT token persistence in AsyncStorage

### External APIs
- **LeetCode Backend**: `https://leetcdtasker.onrender.com/select?titleSlug={problem}`
- **Tasks API**: `https://leetcoderx.onrender.com/{easy|medium|hard}` (problem lists by difficulty)
- **Auth API**: `https://leetcoderx.onrender.com/{login|register}`
- **Google Gemini**: Model "gemini-2.5-flash" for solution generation and quiz creation

### Data Storage
- User JWT tokens stored in AsyncStorage for session persistence
- API key via `EXPO_PUBLIC_API_KEY` environment variable (injected at build time via Babel)
- Environment variables loaded from `.env` file with react-native-dotenv plugin

## Code Patterns

- AI responses rendered as Markdown via `react-native-marked`
- Problem descriptions rendered as HTML via `react-native-render-html`
- Gemini API configured with safety settings (block harassment, hate speech, explicit content, dangerous content)
- Code syntax highlighting via Prismjs
