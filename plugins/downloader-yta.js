import {youtubedl, youtubedlv2} from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios'
import {bestFormat, getUrlDl} from '../lib/y2dl.js';
const handler = async (m, {text, conn, args, usedPrefix, command}) => {
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
            throw `*[❗] 𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐨 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞 𝐩𝐚𝐫𝐚 𝐞𝐬𝐞 𝐧𝐮𝐦𝐞𝐫𝐨, 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐢𝐧𝐠𝐫𝐞𝐬𝐞 𝐮𝐧 𝐧𝐮𝐦𝐞𝐫𝐨 𝐞𝐧𝐭𝐫𝐞 𝐞𝐥 𝟏 𝐲 𝐞𝐥 ${matchingItem.urls.length}*`;
          }
        } else {
          throw `*[❗] 𝐏𝐚𝐫𝐚 𝐩𝐨𝐝𝐞𝐫 𝐡𝐚𝐜𝐞𝐫 𝐮𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐞 𝐞𝐬𝐭𝐚 𝐟𝐨𝐫𝐦𝐚 (${usedPrefix + command} <numero>), 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐫𝐞𝐚𝐥𝐢𝐳𝐚 𝐥𝐚 𝐛𝐮𝐬𝐪𝐮𝐞𝐝𝐚 𝐝𝐞 𝐯𝐢𝐝𝐞𝐨𝐬 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${usedPrefix}playlist <texto>*`;
        }
      } else {
        throw `*[❗] 𝐏𝐚𝐫𝐚 𝐩𝐨𝐝𝐞𝐫 𝐡𝐚𝐜𝐞𝐫 𝐮𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐞 𝐞𝐬𝐭𝐚 𝐟𝐨𝐫𝐦𝐚 (${usedPrefix + command} <numero>), 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐫𝐞𝐚𝐥𝐢𝐳𝐚 𝐥𝐚 𝐛𝐮𝐬𝐪𝐮𝐞𝐝𝐚 𝐝𝐞 𝐯𝐢𝐝𝐞𝐨𝐬 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${usedPrefix}playlist <texto>*`;
      }
    }
  }
  const { key } = await conn.sendMessage(m.chat, {text: `*_⏳Sᴇ ᴇsᴛᴀ ᴘʀᴏᴄᴇsᴀɴᴅᴏ Sᴜ ᴀᴜᴅɪᴏ...⏳_*\n\n*◉ Sɪ Sᴜ ᴀᴜᴅɪᴏ ɴᴏ ᴇs ᴇɴᴠɪᴀᴅᴏ, ᴘʀᴜᴇʙᴇ ᴄᴏɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ #playdoc ᴏ #play.2 ᴏ #ytmp4doc ◉*`}, {quoted: m});
  try {
    const formats = await bestFormat(youtubeLink, 'audio');
    const dl_url = await getUrlDl(formats.url);
    const buff = await getBuffer(dl_url.download);    
    const yt_1 = await youtubedl(youtubeLink).catch(async (_) => await youtubedlv2(youtubeLink));
    const ttl_1 = `${yt_1?.title ? yt_1.title : 'Tu_audio_descargado'}`;
    const fileSizeInBytes = buff.byteLength;
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;
    const roundedFileSizeInMB = fileSizeInMB.toFixed(2);
   if (fileSizeInMB > 50) {
    await conn.sendMessage(m.chat, {document: buff, caption: `*▢ Titulo:* ${ttl_1}\n*▢ Peso Del Audio:* ${roundedFileSizeInMB} MB`, fileName: ttl_1 + '.mp3', mimetype: 'audio/mpeg'}, {quoted: m});
    await conn.sendMessage(m.chat, {text: `*[ ✔ ] 𝐀𝐮𝐝𝐢𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐲 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞.*\n\n*—◉ 𝐒𝐞 𝐞𝐧𝐯í𝐨 𝐞𝐧 𝐟𝐨𝐫𝐦𝐚𝐭𝐨 𝐝𝐞 𝐝𝐨𝐜𝐮𝐦𝐞𝐧𝐭𝐨 𝐝𝐞𝐛𝐢𝐝𝐨 𝐚 𝐪𝐮𝐞 𝐞𝐥 𝐚𝐮𝐝𝐢𝐨 𝐩𝐞𝐬𝐚 ${roundedFileSizeInMB} 𝐌𝐁 𝐲 𝐬𝐮𝐩𝐞𝐫𝐚 𝐞𝐥 𝐥𝐢𝐦𝐢𝐭𝐞 𝐞𝐬𝐭𝐚𝐛𝐥𝐞𝐜𝐢𝐝𝐨 𝐩𝐨𝐫 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩.*\n*◉ Titulo:* ${ttl_1}`, edit: key}, {quoted: m});
    enviando = false
   } else {
    await conn.sendMessage(m.chat, {audio: buff, caption: `*▢ Titulo:* ${ttl_1}\n*▢ Peso Del Audio:* ${roundedFileSizeInMB} MB`, fileName: ttl_1 + '.mp3', mimetype: 'audio/mpeg'}, {quoted: m});
    await conn.sendMessage(m.chat, {text: `*[ ✔ ] 𝐀𝐮𝐝𝐢𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐲 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞.*`, edit: key}, {quoted: m});
    enviando = false   
   }    
  } catch {
    console.log('noooooo')
  try {
    const q = '128kbps';
    const v = youtubeLink;
    const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
    const dl_url = await yt.audio[q].download();
    const ttl = await yt.title;
    const size = await yt.audio[q].fileSizeH;
    await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, {mimetype: 'audio/mpeg'});
    await conn.sendMessage(m.chat, {text: '*[ ✔ ] 𝐀𝐮𝐝𝐢𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞.*', edit: key}, {quoted: m});
  } catch {
    try {
      const lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${youtubeLink}`);
      const lolh = await lolhuman.json();
      const n = lolh.result.title || 'error';
      await conn.sendMessage(m.chat, {audio: {url: lolh.result.link}, fileName: `${n}.mp3`, mimetype: 'audio/mpeg'}, {quoted: m});
      await conn.sendMessage(m.chat, {text: '*[ ✔ ] 𝐀𝐮𝐝𝐢𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞.*', edit: key}, {quoted: m});
    } catch {
      try {
        const searchh = await yts(youtubeLink);
        const __res = searchh.all.map((v) => v).filter((v) => v.type == 'video');
        const infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId);
        const ress = await ytdl.chooseFormat(infoo.formats, {filter: 'audioonly'});
        conn.sendMessage(m.chat, {audio: {url: ress.url}, fileName: __res[0].title + '.mp3', mimetype: 'audio/mpeg'}, {quoted: m});
        await conn.sendMessage(m.chat, {text: '*[ ✔ ] 𝐀𝐮𝐝𝐢𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞.*', edit: key}, {quoted: m});
      } catch {
        await conn.sendMessage(m.chat, {text: `*[ ❌ ] 𝐄𝐥 𝐚𝐮𝐝𝐢𝐨 𝐧𝐨 𝐩𝐮𝐝𝐨 𝐬𝐞𝐫 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨 𝐧𝐢 𝐞𝐧𝐯𝐢𝐚𝐝𝐨, 𝐯𝐮𝐞𝐥𝐯𝐚 𝐚 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫𝐥𝐨.*`, edit: key}, {quoted: m});
        throw '*[❗] 𝐄𝐫𝐫𝐨𝐫, 𝐧𝐨 𝐟𝐮𝐞 𝐩𝐨𝐬𝐢𝐛𝐥𝐞 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐫 𝐞𝐥 𝐚𝐮𝐝𝐢𝐨.*';
      }
    }
  }
}};
handler.command = /^(audio|fgmp3|dlmp3|getaud|yt(a|mp3))$/i;
export default handler

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
