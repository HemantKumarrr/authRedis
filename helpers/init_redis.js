const redis = require("redis");

const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

client.connect();

client.on("connect", () => {
  console.log("connected to redis");
});

client.on("ready", () => {
  console.log("connected to redis and ready to use");
});

client.on("error", (err) => {
  console.log(err);
});


module.exports = client;
