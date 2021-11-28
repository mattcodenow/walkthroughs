const express = require("express");
const { SocksProxyAgent } = require("socks-proxy-agent");
const axios = require("axios");
const agent = new SocksProxyAgent(`socks5h://127.0.0.1:9050`);
const app = express();

app.use(express.json());

app.get("/my-ip/with-tor", async (req, res) => {
  const response = await axios.get("https://ifconfig.me", { httpsAgent: agent }).catch((err) => {
    console.error(err);
    res.status(500).json({ error: "Error during ip request to ifconfig.me."});
  });
  const ip = response.data;
  const ipInfo = await axios.get(`http://ip-api.com/json/${ip}`, { 
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    httpsAgent: agent
  }).catch((err) => {
    console.error(err.toJSON());
    res.status(500).json({ error: "Error during ip request to ip-api.com."});
  });
  res.status(200).json(ipInfo.data);
});

app.get("/my-ip/without-tor", async (req, res) => {
  const response = await axios.get("https://ifconfig.me").catch((err) => {
    console.error(err);
    res.status(500).json({ error: "Error during ip request to ifconfig.me."});
  });
  const ip = response.data;
  const ipInfo = await axios.get(`http://ip-api.com/json/${ip}`, { 
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    }
  }).catch((err) => {
    console.error(err.toJSON());
    res.status(500).json({ error: "Error during ip request to ip-api.com."});
  });
  res.status(200).json(ipInfo.data);
});

app.listen(3000, () => console.log("listening on 3000"));
