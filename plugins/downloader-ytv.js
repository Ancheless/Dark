import {youtubedl, youtubedlv2} from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import {bestFormat, getUrlDl} from '../lib/y2dl.js';
const handler = async (m, {conn, args, usedPrefix, command}) => {
  if (!args[0]) throw '*[❗] 𝐔𝐬𝐨 𝐢𝐧𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨, 𝐢𝐧𝐠𝐫𝐞𝐬𝐞 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞 / 𝐥𝐢𝐧𝐤 𝐝𝐞 𝐘𝐨𝐮𝐓𝐮𝐛𝐞.*';
  let enviando;
  if (enviando) return  
      enviando = true    
  let youtubeLink = '';
  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    const index = parseInt(args[0]) - 1;
    if (index >= 0) {
      if (Array.isArray(global.videoList) && global.videoList.length > 0) {
        const matchingItem = global.videoList.find((item) => item.from === m.sender);
        if (matchingItem) {
          if (index < matchingItem.urls.length) {
            youtubeLink = matchingItem.urls[index];
          } else {
            enviando = false  
            throw `*[❗] 𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐨 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞 𝐩𝐚𝐫𝐚 𝐞𝐬𝐞 𝐧𝐮𝐦𝐞𝐫𝐨, 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐢𝐧𝐠𝐫𝐞𝐬𝐞 𝐮𝐧 𝐧𝐮𝐦𝐞𝐫𝐨 𝐞𝐧𝐭𝐫𝐞 𝐞𝐥 𝟏 𝐲 𝐞𝐥 ${matchingItem.urls.length}*`;
          }
        } else {
          enviando = false  
          throw `*[❗] 𝐏𝐚𝐫𝐚 𝐩𝐨𝐝𝐞𝐫 𝐡𝐚𝐜𝐞𝐫 𝐮𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐞 𝐞𝐬𝐭𝐚 𝐟𝐨𝐫𝐦𝐚 (${usedPrefix + command} <numero>), 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐫𝐞𝐚𝐥𝐢𝐳𝐚 𝐥𝐚 𝐛𝐮𝐬𝐪𝐮𝐞𝐝𝐚 𝐝𝐞 𝐯𝐢𝐝𝐞𝐨𝐬 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${usedPrefix}playlist <texto>*`;
        }
      } else {
        enviando = false  
        throw `*[❗] 𝐏𝐚𝐫𝐚 𝐩𝐨𝐝𝐞𝐫 𝐡𝐚𝐜𝐞𝐫 𝐮𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐞 𝐞𝐬𝐭𝐚 𝐟𝐨𝐫𝐦𝐚 (${usedPrefix + command} <numero>), 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐫𝐞𝐚𝐥𝐢𝐳𝐚 𝐥𝐚 𝐛𝐮𝐬𝐪𝐮𝐞𝐝𝐚 𝐝𝐞 𝐯𝐢𝐝𝐞𝐨𝐬 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${usedPrefix}playlist <texto>*`;
      }
    }
  }
  const { key } = await m.reply(`*_⏳Sᴇ ᴇsᴛᴀ ᴘʀᴏᴄᴇsᴀɴᴅᴏ Sᴜ ᴠɪᴅᴇᴏ...⏳_*\n\n*◉ Sɪ Sᴜ ᴠɪᴅᴇᴏ ɴᴏ ᴇs ᴇɴᴠɪᴀᴅᴏ, ᴘʀᴜᴇʙᴇ ᴄᴏɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ #playdoc ᴏ #play.2 ᴏ #ytmp4doc ◉*`);
  try {
    const formats = await bestFormat(youtubeLink, 'video');
    const buff = await getBuffer(formats.url);
    const yt_1 = await youtubedl(youtubeLink).catch(async (_) => await youtubedlv2(youtubeLink));
    const ttl_1 = `${yt_1?.title ? yt_1.title : 'Tu_video_descargado'}`;
    const fileSizeInBytes = buff.byteLength;
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;
    const roundedFileSizeInMB = fileSizeInMB.toFixed(2);
   if (fileSizeInMB > 100) {
    await conn.sendMessage(m.chat, {document: buff, caption: `*▢ Titulo:* ${ttl_1}\n*▢ Peso Del Video:* ${roundedFileSizeInMB} MB`, fileName: ttl_1 + '.mp4', mimetype: 'video/mp4'}, {quoted: m});
    await conn.sendMessage(m.chat, {text: `*[ ✔ ] 𝐕𝐢𝐝𝐞𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐲 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞.*\n\n*—◉ 𝐒𝐞 𝐞𝐧𝐯í𝐨 𝐞𝐧 𝐟𝐨𝐫𝐦𝐚𝐭𝐨 𝐝𝐞 𝐝𝐨𝐜𝐮𝐞𝐦𝐧𝐭𝐨 𝐝𝐞𝐛𝐢𝐝𝐨 𝐚 𝐪𝐮𝐞 𝐞𝐥 𝐯𝐢𝐝𝐞𝐨 𝐩𝐞𝐬𝐚 ${roundedFileSizeInMB} 𝐌𝐁 𝐲 𝐬𝐮𝐩𝐞𝐫𝐚 𝐞𝐥 𝐥𝐢𝐦𝐢𝐭𝐞 𝐞𝐬𝐭𝐚𝐛𝐥𝐞𝐜𝐢𝐝𝐨 𝐩𝐨𝐫 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩.*\n*◉ Titulo:* ${ttl_1}`, edit: key}, {quoted: m});
    enviando = false
   } else {
    await conn.sendMessage(m.chat, {video: buff, caption: `*▢ Titulo:* ${ttl_1}\n*▢ Peso Del Video:* ${roundedFileSizeInMB} MB`, fileName: ttl_1 + '.mp4', mimetype: 'video/mp4'}, {quoted: m});
    await conn.sendMessage(m.chat, {text: `*[ ✔ ] 𝐕𝐢𝐝𝐞𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞.*`, edit: key}, {quoted: m});
    enviando = false   
   }
 } catch (ee) {
    console.log(ee)
  try {
    const qu = args[1] || '360';
    const q = qu + 'p';
    const v = youtubeLink;
    const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
    const dl_url = yt.video[q].download();
    const ttl = yt.title;
    const size = yt.video[q].fileSizeH;
    await conn.sendMessage(m.chat, {video: {url: dl_url}, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `*▢ Titulo:* ${ttl}\n*▢ Peso Del Video:* ${size}`, thumbnail: await fetch(yt.thumbnail)}, {quoted: m});
    await conn.sendMessage(m.chat, {text: '*[ ✔ ] 𝐕𝐢𝐝𝐞𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞.*', edit: key}, {quoted: m});
    enviando = false
  } catch (ee2) {
    console.log(ee2)
    try {
      const mediaa = await ytMp4(youtubeLink);
      await conn.sendMessage(m.chat, {video: {url: mediaa.result}, fileName: `error.mp4`, caption: `_Furious-Bot_`, thumbnail: mediaa.thumb, mimetype: 'video/mp4'}, {quoted: m});
      await conn.sendMessage(m.chat, {text: '*[ ✔ ] 𝐕𝐢𝐝𝐞𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞.*', edit: key}, {quoted: m});
      enviando = false
    } catch {
      try {
        const lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${youtubeLink}`);
        const lolh = await lolhuman.json();
        const n = lolh.result.title || 'error';
        const n2 = lolh.result.link;
        const n3 = lolh.result.size;
        const n4 = lolh.result.thumbnail;
        await conn.sendMessage(m.chat, {video: {url: n2}, fileName: `${n}.mp4`, mimetype: 'video/mp4', caption: `*▢ Titulo:* ${n}\n*▢ Peso Del Video:* ${n3}`, thumbnail: await fetch(n4)}, {quoted: m});
        await conn.sendMessage(m.chat, {text: '*[ ✔ ] 𝐕𝐢𝐝𝐞𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞.*', edit: key}, {quoted: m});
        enviando = false
      } catch {
        await conn.sendMessage(m.chat, {text: `*[ ❌ ] 𝐄𝐥 𝐯𝐢𝐝𝐞𝐨 𝐧𝐨 𝐩𝐮𝐝𝐨 𝐬𝐞𝐫 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐧𝐢 𝐞𝐧𝐯𝐢𝐚𝐝𝐨, 𝐯𝐮𝐞𝐥𝐯𝐚 𝐚 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫𝐥𝐨.*`, edit: key}, {quoted: m});
        throw '*[❗] 𝐄𝐫𝐫𝐨𝐫, 𝐧𝐨 𝐟𝐮𝐞 𝐩𝐨𝐬𝐢𝐛𝐥𝐞 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐫 𝐞𝐥 𝐯𝐢𝐝𝐞𝐨.*';
      }
    }
  }
}};
handler.command = /^(video|fgmp4|dlmp4|getvid|yt(v|mp4)?)$/i;
export default handler;

function bytesToSize(bytes) {
  return new Promise((resolve, reject) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) resolve(`${bytes} ${sizes[i]}`);
    resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
  });
}

async function ytMp3(url) {
  return new Promise((resolve, reject) => {
    ytdl.getInfo(url).then(async (getUrl) => {
      const result = [];
      for (let i = 0; i < getUrl.formats.length; i++) {
        const item = getUrl.formats[i];
        if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
          const {contentLength} = item;
          const bytes = await bytesToSize(contentLength);
          result[i] = {audio: item.url, size: bytes};
        }
      }
      const resultFix = result.filter((x) => x.audio != undefined && x.size != undefined);
      const tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
      const tinyUrl = tiny.data;
      const title = getUrl.videoDetails.title;
      const thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
      resolve({title, result: tinyUrl, result2: resultFix, thumb});
    }).catch(reject);
  });
}

async function ytMp4(url) {
  return new Promise(async (resolve, reject) => {
    ytdl.getInfo(url).then(async (getUrl) => {
      const result = [];
      for (let i = 0; i < getUrl.formats.length; i++) {
        const item = getUrl.formats[i];
        if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
          const {qualityLabel, contentLength} = item;
          const bytes = await bytesToSize(contentLength);
          result[i] = {video: item.url, quality: qualityLabel, size: bytes};
        }
      }
      const resultFix = result.filter((x) => x.video != undefined && x.size != undefined && x.quality != undefined);
      const tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
      const tinyUrl = tiny.data;
      const title = getUrl.videoDetails.title;
      const thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
      resolve({title, result: tinyUrl, rersult2: resultFix[0].video, thumb});
    }).catch(reject);
  });
}

async function ytPlay(query) {
  return new Promise((resolve, reject) => {
    yts(query).then(async (getData) => {
      const result = getData.videos.slice( 0, 5 );
      const url = [];
      for (let i = 0; i < result.length; i++) {
        url.push(result[i].url);
      }
      const random = url[0];
      const getAudio = await ytMp3(random);
      resolve(getAudio);
    }).catch(reject);
  });
}

async function ytPlayVid(query) {
  return new Promise((resolve, reject) => {
    yts(query).then(async (getData) => {
      const result = getData.videos.slice( 0, 5 );
      const url = [];
      for (let i = 0; i < result.length; i++) {
        url.push(result[i].url);
      }
      const random = url[0];
      const getVideo = await ytMp4(random);
      resolve(getVideo);
    }).catch(reject);
  });
}

const getBuffer = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });

    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};
