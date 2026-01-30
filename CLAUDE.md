# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native mobile app (Expo) for coding practice with AI-powered LeetCode problem solving and quiz generation. Uses Google Gemini API for content generation.

## Development Commands

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web (with deprecation warnings suppressed)
npm test           # Run Jest tests
```

## Architecture

### Navigation Structure
- **Single Stack Navigator**: All screens (Auth + Main) in ONE Stack.Navigator (Navigation.js)
- **Flow**: Auth screen (Login/Register) → Homepage → Tasks/Puzzles/CodeRoom screens
- **No Conditional Rendering**: Auth screens are always first, no automatic token validation on app start
- **Auth Limitation**: Users must manually login each time (no auto-redirect based on stored JWT)

### Screen Routes
- `Auth` → AuthStackNavigate (nested: Login, Register)
- `Homepage` → Main (landing page after login)
- `Daily` → ApiFetcher (LeetCode problem viewer)
- `coder` → Example (code editor/executor)
- `tasks` → TaskList (problem selection by difficulty)
- `answer` → AIComponent (AI solution generator)
- `puzzle` → AIPuzzle (quiz generator)

### Key Components
- `Navigation.js` - Stack navigator containing all screens (Auth + Main)
- `CheckAnswer.js` - AI solution generator (3 JavaScript solutions via Gemini streaming)
- `Puzzles.js` - AI quiz generator with random difficulty/topic/format selection
- `ApiLeetcode.js` - Fetch problems from LeetCode backend, render HTML with react-native-render-html
- `СodeForm.js` - Live JavaScript code editor with eval() execution (no sandboxing)
- `Apifetcher.js` - Generate problem descriptions from raw data using Gemini streaming
- `LoginPage.js` / `RegisterForm.js` - Authentication with JWT token persistence in AsyncStorage

### State Management & Data Flow
- **No global state**: Pure local useState/useEffect in each component
- **Navigation params**: Data passed via route.params between screens
- **Example flow**: Tasks → titleslug param → ApiLeetcode → questionx param → CheckAnswer

### External APIs
- **LeetCode Backend**: `https://leetcdtasker.onrender.com/select?titleSlug={problem}`
- **Tasks API**: `https://leetcoderx.onrender.com/{easy|medium|hard}` (problem lists by difficulty)
- **Auth API**: `https://leetcoderx.onrender.com/{login|register}`
- **Google Gemini**: Model "gemini-2.5-flash" for AI content generation

### Gemini API Implementation (CRITICAL)
- **Always use streaming**: `generateContentStream()` NOT `generateContent()`
- **Pattern**: `for await (const chunk of result.stream) { fullText += chunk.text(); }`
- **Real-time updates**: State updated incrementally as chunks arrive
- **Token limit**: maxOutputTokens: 2048 for quiz/problem generation
- **Temperature**: 0.9 (Puzzles/Apifetcher), 1.0 (CheckAnswer)
- **Safety settings**: All 4 harm categories blocked at MEDIUM_AND_ABOVE
- **API Key Access**: `process.env.EXPO_PUBLIC_API_KEY` (configured via .env file)

### Data Storage
- **JWT Tokens**: AsyncStorage for session persistence (setItem/getItem)
- **No Token Validation**: App doesn't check for existing tokens on launch
- **Environment Variables**:
  - Access via `process.env.EXPO_PUBLIC_API_KEY`
  - Loaded from `.env` file via Babel plugin react-native-dotenv
  - Get API key from: https://aistudio.google.com/app/apikey

## Code Patterns

### Rendering
- **AI responses**: Markdown via `react-native-marked` (NOT react-native-markdown-display)
- **LeetCode problems**: HTML via `react-native-render-html` with windowWidth adaptation
- **Ignored HTML tags**: `["font"]` in HTML rendering
- **Code highlighting**: Prismjs in code editor component

### HTTP & Error Handling
- **HTTP client**: axios exclusively (NO fetch API)
- **Error handling**: try/catch with mix of Alert.alert and alert() (inconsistent)
- **Loading states**: Local boolean with loading.gif (319KB, duplicated across components)
- **No retry logic**: Failed requests require manual retry

### Code Execution (Security Note)
- **CodeForm.js**: Uses direct eval() wrapped in try/catch
- **No real sandboxing**: safe-eval package installed but NOT used
- **Security concern**: Direct eval execution without isolation

## Testing

### Configuration
- **Framework**: Jest with jest-expo preset
- **Setup**: jest.setup.js with required mocks
- **Run tests**: `npm test`
- **Coverage**: Configured for components/**/*.js and all .js files

### Required Mocks (jest.setup.js)
- `@react-navigation/native` - useRoute, useNavigation
- `@react-native-async-storage/async-storage`
- `react-native-marked`
- `@google/generative-ai` - Gemini streaming API
- `.gif` files - loading animations

### Module Name Mapping (jest.config.js)
- `@env` → `__mocks__/env.js`
- `@google/generative-ai` → `__mocks__/@google/generative-ai.js`
- `@rneui/themed` and `@rneui/base` → mocked versions
- `\.gif$` → `__mocks__/fileMock.js`

## Web-Specific Configuration

### Build Setup
- **Webpack config**: Crypto fallback disabled (webpack.config.js)
- **NODE_OPTIONS**: `--no-deprecation` flag set for web builds
- **React Native Web**: Compatibility via @expo/webpack-config
- **Known Issue**: Password fields trigger DOM warning (password field not in form) - this is a browser warning only, doesn't affect functionality

### Platform Considerations
- App runs on iOS, Android, and Web via react-native-web
- Some components may need Platform.OS checks for web-specific behavior
- Forms use plain View wrappers (NOT HTML form elements) to avoid web event conflicts

## Dependencies Note

### UI Libraries (Mixed)
- **@rneui/base + @rneui/themed**: Primary UI components (Button, Input, Text)
- **react-native-paper**: Secondary UI components (Button, ActivityIndicator)
- **Note**: Inconsistent use of two UI libraries across codebase

### Key Packages
- `@google/generative-ai`: ^0.24.1 (streaming API version)
- `react-native-marked`: ^6.0.4 (Markdown rendering)
- `@rivascva/react-native-code-editor`: Code editing with Prism
- `axios`: HTTP client
- `react-native-render-html`: ^6.3.4 (HTML rendering)
