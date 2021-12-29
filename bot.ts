import Twitter, { RequestParams } from 'twitter';
import dotenv from 'dotenv';
import fs from 'fs';
import { Tweet } from './tweet.model';
import { tweetLibrary } from './tweet-library';

dotenv.config();

const twitter = new Twitter({
  consumer_key: process.env.API_KEY!,
  consumer_secret: process.env.API_SECRET_KEY!,
  access_token_key: process.env.ACCESS_TOKEN_KEY!,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET!,
});

const postTweet = async (tweet: Tweet, params?: RequestParams) => {
  try {
    const tweetParams: RequestParams = { status: tweet.status, ...params };

    if (tweet.picPath) {
      const pictureBytes = fs.readFileSync(tweet.picPath);

      const { media_id_string } = await twitter.post('media/upload', {
        media: pictureBytes,
      });
      tweetParams.media_ids = media_id_string;
    }

    const response = await twitter.post('statuses/update', tweetParams);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const pickRandomTweet = (): Tweet => {
  const tweetArray = Object.values(tweetLibrary);

  const index = Math.floor(Math.random() * (tweetArray.length - 1));

  return tweetArray[index];
};

const postRandomTweet = () => {
  const tweet = pickRandomTweet();

  postTweet(tweet);
};

const searchTweets = async () => {
  try {
    const { statuses } = await twitter.get(`search/tweets`, {
      q: 'paçoca',
      tweet_mode: 'extended',
      result_type: 'recent',
    });

    const pacocaRegexp = RegExp('paçoca|pacoca');

    for (const tweet of statuses) {
      if (tweet.full_text.match(pacocaRegexp)) return tweet;
    }
  } catch (error) {
    console.log(error);
  }
};

const decideReaction = (status: string) => {
  const positiveReactions = RegExp('amo|adoro|eu gosto de paçoca|gostoso');
  const negativeReactions = RegExp('odeio|não gosto|horrível|ruim');
  const scaredReactions = RegExp('comer|comi|comendo|come');

  const isPositive = status.match(positiveReactions) != null;
  if (isPositive) return tweetLibrary.love;

  const isNegative = status.match(negativeReactions) != null;
  if (isNegative) return tweetLibrary.angry;

  const isScared = status.match(scaredReactions) != null;
  if (isScared) return tweetLibrary.scared;

  return tweetLibrary.bark;
};

const replyTweets = async () => {
  const tweet = await searchTweets();
  console.log(tweet);
  if (!tweet) return;

  const reaction = decideReaction(tweet.full_text);

  postTweet(reaction, {
    in_reply_to_status_id: tweet.id_str,
    auto_populate_reply_metadata: true,
  });
};

const stream = twitter.stream('statuses/filter', {
  track: '@pacoca_acaxorra',
});

const startDog = () => {
  const randomTweetTimer = setInterval(postRandomTweet, 1000 * 60 * 60 * 23);

  const replyTweetsTimer = setInterval(replyTweets, 1000 * 60 * 60 * 21);

  stream.on('data', (tweet) => {
    postTweet(tweetLibrary.highfive, {
      in_reply_to_status_id: tweet.id_str,
      auto_populate_reply_metadata: true,
    });
  });
};

startDog();
