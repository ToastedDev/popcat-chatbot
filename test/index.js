const { Chatbot } = require("../lib");

const chatbot = new Chatbot({
  name: "PainBot",
  gender: "Male",
  owner: "TCA",
});

(async () => {
  console.log(await chatbot.chat("hello!"));
})();
