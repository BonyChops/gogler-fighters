const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const accessToken = JSON.parse(fs.readFileSync(__dirname+'/accessToken.json', 'utf8')).ranking_token;
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
let rankingStarted = false;
let rankingChannel;
let rankingMes = [];
let origTeX;
let waitTeX;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (rankingStarted == true){
    rankingMes.push(msg);
  }
  if (msg.content == '/happy') {
      startRanking(msg.channel, msg);
  }
/*   if(waitTeX){
    showResultTeX(msg, origTeX);
    waitTeX = false;
  }
  if((msg.content.indexOf('!md') !== -1)||(msg.content.indexOf('!tex') !== -1)) {
    origTeX = msg;
    waitTeX = true;
  } */
});

client.login(accessToken);

const startRanking = async (channel, origMes) =>{
  let fields = [];
  rankingStarted = true;
  rankingChannel = channel;
  console.log('Rank system started.');
  await sleep(2000);
  rankingStarted = false;
  console.log('finished!');
  console.log(rankingMes.length);
  if(rankingMes.length == 0){
    channel.send("誰も参加しませんでした...");
    return;
  }
  rankingMes.sort(function(a,b){
    if(calcTimeDiff(a.createdAt, b.createdAt) > 0) return -1;
    if(calcTimeDiff(a.createdAt, b.createdAt) < 0) return 1;
    return 0;
  });
  await rankingMes.forEach((mes, index) => {
    let member = mes.guild.member(mes.author);
    let nickname = member ? member.displayName : mes.author.username;
   fields.push({
      name: `${ordinal_suffix_of(index + 1)} (+${calcTimeDiff(origMes.createdAt, mes.createdAt)}s)`,
      value: nickname
    })
  });

  let userIconURL = rankingMes[0].author.avatarURL() != null ? rankingMes[0].author.avatarURL() : rankingMes[0].author.defaultAvatarURL;
  let embed = {
    "title": "Happy Battle",
    "description": "結果発表～～～～～～～～～wwwwwwwwwwwwwwwwwwwwwwww",
    "url": "https://discordapp.com",
    "color": 1995009,
    "timestamp": new Date(),
    "thumbnail": {
      "url": userIconURL
    },
    "fields": fields
  };
  rankingMes[0].react('🤔');
  channel.send({ embed });
  rankingMes = [];
}

const showResultTeX = (mes, orig) => {
  let userIconURL = mes.author.avatarURL() != null ? mes.author.avatarURL() : mes.author.defaultAvatarURL;
  let embed = {
    "title": "LaTeX & md Checker",
    "description": "結果発表～～～～～～～～～wwwwwwwwwwwwwwwwwwwwwwww",
    "url": "https://discordapp.com",
    "color": 1995009,
    "timestamp": new Date(),
    "thumbnail": {
      "url": userIconURL
    },
    "fields": {
      "name": "計測結果",
      "value": `+${calcTimeDiff(orig.createdAt, mes.createdAt)}s`
    }
  };
  mes.react('🤔');
  mes.channel.send({ embed });
}

const calcTimeDiff = (d1, d2) =>{
  let d1Obj = new Date(d1);
  let d2Obj = new Date(d2);
  return (d2.getTime() - d1.getTime()) / 1000;
}

const ordinal_suffix_of = (i) => {
  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
      return i + "st";
  }
  if (j == 2 && k != 12) {
      return i + "nd";
  }
  if (j == 3 && k != 13) {
      return i + "rd";
  }
  return i + "th";
}