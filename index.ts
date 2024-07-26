const qrcode = require("qrcode-terminal");
const cron = require("node-cron");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

const Grupo_test = process.env.USER_ID;

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("Client is ready!");

  cron.schedule("50 22 * * 4", () => {
    client.sendMessage(Grupo_test, "Testando mensagem");
  });
});

client.initialize();
