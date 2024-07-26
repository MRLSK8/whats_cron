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
    const Grupo_test_2 = process.env.USER_ID_2;

    console.log("Grupo_test", { Grupo_test, Grupo_test_2 });

    client.on("qr", (qr) => {
      console.log("should read qr code");
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", async () => {
      console.log("Client is ready!");

      cron.schedule(
        "45 8 * * *",
        () => {
          console.log("sending message group 1");
          client.sendMessage(Grupo_test, "Bom dia 😊");
        },
        {
          scheduled: true,
          timezone: "America/Sao_Paulo",
        }
      );

      cron.schedule(
        "45 8 * * 1",
        () => {
          console.log("sending message group 2");
          client.sendMessage(Grupo_test_2, "Eu vou 🙋🏽‍♂️");
        },
        {
          scheduled: true,
          timezone: "America/Sao_Paulo",
        }
      );
    });

    client.initialize();
  });
