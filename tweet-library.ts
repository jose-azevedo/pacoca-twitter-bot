import { Tweet } from './tweet.model';

const tweetLibrary = {
  sleep: new Tweet({
    statusBeginning: 'ZZzzzZZZz',
    repeatedChar: 'z',
    statusEnding: '.....',
    picPath: 'fotos/dormindo.jpg',
  }),
  bored: new Tweet({
    statusBeginning: 'Meh',
    repeatedChar: '',
    statusEnding: '',
    picPath: 'fotos/tedio.jpg',
  }),
  pee: new Tweet({
    statusBeginning: '*xiii',
    repeatedChar: 'i',
    statusEnding: 'iii*',
    picPath: 'fotos/xixi.jpg',
  }),
  angry: new Tweet({
    statusBeginning: 'GRRR',
    repeatedChar: 'r',
    statusEnding: '',
    picPath: 'fotos/raiva.jpg',
  }),
  greet: new Tweet({
    statusBeginning: 'WOUF',
    repeatedChar: '',
    statusEnding: '',
    picPath: 'fotos/deboa.jpg',
  }),
  swim: new Tweet({
    statusBeginning: 'WOSH',
    repeatedChar: 'h',
    statusEnding: '',
    picPath: 'fotos/nadando.jpg',
  }),
  ehmole: new Tweet({
    statusBeginning: 'ehmole kkkkkk',
    repeatedChar: 'k',
    statusEnding: '',
    picPath: 'fotos/ehmole.jpg',
  }),
  sad: new Tweet({
    statusBeginning: '*cãin*',
    repeatedChar: '',
    statusEnding: '',
    picPath: 'fotos/triste.jpg',
  }),
  poo: new Tweet({
    statusBeginning: '',
    repeatedChar: '.',
    statusEnding: '',
    picPath: 'fotos/cagando.png',
  }),
  amopacoca: new Tweet({
    statusBeginning: '#amopaçoca',
    repeatedChar: '',
    statusEnding: '',
    picPath: 'fotos/profile_pic.png',
  }),
  dive: new Tweet({
    statusBeginning: '*TCHBU',
    repeatedChar: 'u',
    statusEnding: 'M*',
    picPath: 'fotos/tchbum.jpg',
  }),
  lick: new Tweet({
    statusBeginning: '*slip*',
    repeatedChar: '',
    statusEnding: '',
    picPath: 'fotos/lambida.jpg',
  }),
  scratch: new Tweet({
    statusBeginning: 'unhe',
    repeatedChar: 'e',
    statusEnding: '',
    picPath: 'fotos/coçada.jpg',
  }),
  cold: new Tweet({
    statusBeginning: 'BBRR',
    repeatedChar: 'r',
    statusEnding: '',
    picPath: 'fotos/neve.jpg',
  }),
  highfive: new Tweet({
    statusBeginning: '',
    repeatedChar: 'WOUF',
    statusEnding: '',
    picPath: 'fotos/highfive.jpg',
  }),
  scared: new Tweet({
    statusBeginning: '',
    repeatedChar: '.',
    statusEnding: '',
    picPath: 'fotos/assustado.jpg',
  }),
  love: new Tweet({
    statusBeginning: '',
    repeatedChar: 'WOUF',
    statusEnding: '',
    picPath: 'fotos/amopacoca.jpg',
  }),
  bark: new Tweet({
    statusBeginning: '',
    repeatedChar: 'AU',
    statusEnding: '',
  }),
};

export { tweetLibrary };
