# Popcat Chatbot

A wrapper of [Pop Cat](https://popcat.xyz)'s chatbot API endpoint.

# Usage

```js
const { Chatbot } = require("@nottca/popcat-chatbot");

const chatbot = new Chatbot()
  .setName("PainBot")
  .setGender("Male")
  .setOwner("TCA");

chatbot.chat("hello world").then(console.log).catch(console.error);
```
