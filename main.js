const Twit = require("twit");

const channelID = " "; // insert channel id
const userID = " "; // fill in

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY, // fill in in .env
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET, // fill in in .env
  access_token: process.env.TWITTER_ACCESS_TOKEN, // fill in in .env
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, // fill in in .env
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

client.once("ready", () => {
  const stream = T.stream("statuses/filter", {
    follow: ["userID"],
  });

  stream.on("tweet", function (tweet) {
    //...
    const url =
      "https://twitter.com/" +
      tweet.user.screen_name +
      "/status/" +
      tweet.id_str;
    try {
      let channel = client.channels
        .fetch(channelID)
        .then((channel) => {
          channel.send(url);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  });
});
