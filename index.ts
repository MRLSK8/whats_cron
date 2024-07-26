const qrcode = require("qrcode-terminal");
const cron = require("node-cron");

const fastify = require("fastify");

const app = fastify();

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

// const { Client } = require("whatsapp-web.js");
// const client = new Client();

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : "3333",
  })
  .then(() => {
    console.log("running server");
    const Grupo_test = process.env.USER_ID;
    console.log("Grupo_test", { Grupo_test });

    client.on("qr", (qr) => {
      console.log("should read qr code");
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", async () => {
      console.log("Client is ready!");
      // cron.schedule("35 11 * * 1-5", () => {
      console.log("sending message");
      client.sendMessage(Grupo_test, "Testando mensagem");
      // });
    });

    client.initialize();
  });
