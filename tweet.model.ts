interface ITweet {
  statusBeginning: string;
  repeatedChar: string;
  statusEnding: string;
  picPath?: string;
}

class Tweet implements ITweet {
  public statusBeginning: string;
  public repeatedChar: string;
  public statusEnding: string;
  public picPath?: string;

  public get status() {
    const repetitions = Math.floor(Math.random() * 20);
    var repeatedCharBuffer = '';
    for (var i = 0; i < repetitions; i++) {
      if (Math.random() > 0.5) {
        repeatedCharBuffer += this.repeatedChar.toUpperCase();
      } else {
        repeatedCharBuffer += this.repeatedChar.toLowerCase();
      }
    }
    const finalStatus = this.statusBeginning + repeatedCharBuffer + this.statusEnding;
    return finalStatus;
  }

  constructor(tweet: ITweet) {
    this.statusBeginning = tweet.statusBeginning;
    this.repeatedChar = tweet.repeatedChar;
    this.statusEnding = tweet.statusEnding;
    this.picPath = tweet.picPath;
  }
}

export { Tweet, ITweet };
