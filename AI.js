import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import dotenv from "dotenv";

const MODEL_NAME = "gemini-2.5-flash";
const API_KEY = "YOUR_API_KEY";

async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
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
    ];

    let task;

    task = "<p>You are given a <strong>0-indexed</strong> binary string <code>s</code> which represents the types of buildings along a street where:</p>\n\n<ul>\n\t<li><code>s[i] = &#39;0&#39;</code> denotes that the <code>i<sup>th</sup></code> building is an office and</li>\n\t<li><code>s[i] = &#39;1&#39;</code> denotes that the <code>i<sup>th</sup></code> building is a restaurant.</li>\n</ul>\n\n<p>As a city official, you would like to <strong>select</strong> 3 buildings for random inspection. However, to ensure variety, <strong>no two consecutive</strong> buildings out of the <strong>selected</strong> buildings can be of the same type.</p>\n\n<ul>\n\t<li>For example, given <code>s = &quot;0<u><strong>0</strong></u>1<u><strong>1</strong></u>0<u><strong>1</strong></u>&quot;</code>, we cannot select the <code>1<sup>st</sup></code>, <code>3<sup>rd</sup></code>, and <code>5<sup>th</sup></code> buildings as that would form <code>&quot;0<strong><u>11</u></strong>&quot;</code> which is <strong>not</strong> allowed due to having two consecutive buildings of the same type.</li>\n</ul>\n\n<p>Return <em>the <b>number of valid ways</b> to select 3 buildings.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;001101&quot;\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> \nThe following sets of indices selected are valid:\n- [0,2,4] from &quot;<u><strong>0</strong></u>0<strong><u>1</u></strong>1<strong><u>0</u></strong>1&quot; forms &quot;010&quot;\n- [0,3,4] from &quot;<u><strong>0</strong></u>01<u><strong>10</strong></u>1&quot; forms &quot;010&quot;\n- [1,2,4] from &quot;0<u><strong>01</strong></u>1<u><strong>0</strong></u>1&quot; forms &quot;010&quot;\n- [1,3,4] from &quot;0<u><strong>0</strong></u>1<u><strong>10</strong></u>1&quot; forms &quot;010&quot;\n- [2,4,5] from &quot;00<u><strong>1</strong></u>1<u><strong>01</strong></u>&quot; forms &quot;101&quot;\n- [3,4,5] from &quot;001<u><strong>101</strong></u>&quot; forms &quot;101&quot;\nNo other selection is valid. Thus, there are 6 total ways.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> s = &quot;11100&quot;\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> It can be shown that there are no valid selections.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s[i]</code> is either <code>&#39;0&#39;</code> or <code>&#39;1&#39;</code>.</li>\n</ul>\n";

    const request = [{ text: `Solve this task with javascript: ${task}`}];

    const result = await model.generateContent({
      contents: [{ role: "user", request }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    console.log(response.text());
}

run();
