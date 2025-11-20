const fs = require('fs');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
require('dotenv').config();

const LOG_FILE = 'debug.log';

// Очистить лог файл
fs.writeFileSync(LOG_FILE, '');

const log = (msg) => {
  const line = `[${new Date().toISOString()}] ${msg}`;
  fs.appendFileSync(LOG_FILE, line + '\n');
  console.log(msg);
};

// Пример сложного промпта с HTML как приходит от LeetCode
const questionx = `
<p>Given the <code>root</code> of an n-ary tree, return <em>the preorder traversal of its nodes' values</em>.</p>

<p>Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)</p>

<p><strong>Example 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png" style="width: 100%; max-width: 300px;"></p>

<pre>
<strong>Input:</strong> root = [1,null,3,2,4,null,5,6]
<strong>Output:</strong> [1,3,5,6,2,4]
</pre>

<p><strong>Example 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png" width="296" height="241"></p>

<pre>
<strong>Input:</strong> root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
<strong>Output:</strong> [1,2,3,6,7,11,14,4,8,12,5,9,13,10]
</pre>

<p><strong>Constraints:</strong></p>
<ul>
<li>The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.</li>
<li><code>0 &lt;= Node.val &lt;= 10<sup>4</sup></code></li>
<li>The height of the n-ary tree is less than or equal to <code>1000</code>.</li>
</ul>
`;

async function test() {
  log('=== Starting test with long HTML prompt ===');
  log(`API Key: ${process.env.EXPO_PUBLIC_API_KEY ? 'present' : 'MISSING'}`);
  log(`Prompt length: ${questionx.length} chars`);
  log('');
  log('=== Prompt content ===');
  log(questionx);
  log('');
  log('=== Sending request ===');

  try {
    const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContentStream({
      contents: [{
        role: "user",
        parts: [{
          text: `Write 3 different JavaScript solutions to the following problem, with explanations:

**Problem:**
${questionx}

Provide 3 different solutions, each with an explanation.`,
        }],
      }],
      generationConfig: {
        temperature: 1.0,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    log('Stream received, reading chunks...');

    let fullText = '';
    let chunkCount = 0;
    for await (const chunk of result.stream) {
      chunkCount++;
      const text = chunk.text();
      log(`Chunk ${chunkCount}: ${text.substring(0, 50)}...`);
      fullText += text;
    }

    log('');
    log('=== Result ===');
    log(`Total chunks: ${chunkCount}`);
    log(`Total length: ${fullText.length}`);
    log('');
    log('=== Response text ===');
    log(fullText);

  } catch (error) {
    log('');
    log('=== ERROR ===');
    log(`Message: ${error.message}`);
    log(`Stack: ${error.stack}`);
  }

  log('');
  log('=== Test complete ===');
  log(`Log saved to: ${LOG_FILE}`);
}

test();
