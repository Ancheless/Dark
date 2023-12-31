import {sticker} from '../lib/sticker.js';

const handler = (m) => m;

handler.all = async function(m) {
  const chat = db.data.chats[m.chat];
  const user = db.data.users[m.sender];

  if (chat.autosticker && m.isGroup) {
    const q = m;
    let stiker = false;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/webp/g.test(mime)) return;
    if (/image/g.test(mime)) {
      const img = await q.download?.();
      if (!img) return;
      stiker = await sticker(img, false, packname, author);
    } else if (/video/g.test(mime)) {
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) return await m.reply(`_*< FUNCIONES - AUTOSTICKER />*_\n\n*[ ❗ ] 𝐋𝐚 𝐝𝐮𝐫𝐚𝐜𝐢ó𝐧 𝐝𝐞𝐥 𝐯í𝐝𝐞𝐨 𝐧𝐨 𝐩𝐮𝐞𝐝𝐞 𝐬𝐮𝐩𝐞𝐫𝐚𝐫 𝐥𝐨𝐬 𝟕 𝐬𝐞𝐠𝐮𝐧𝐝𝐨𝐬.*\n\n*[ 💡 ] 𝐏𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫 𝐥𝐚 𝐟𝐮𝐧𝐜𝐢ó𝐧 𝐝𝐞* _𝐚𝐮𝐭𝐨𝐬𝐭𝐢𝐜𝐤𝐞𝐫_ *𝐞𝐧𝐯𝐢𝐞 𝐞𝐥 𝐬𝐢𝐠𝐮𝐢𝐞𝐧𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:* _/𝚍𝚒𝚜𝚊𝚋𝚕𝚎 𝚊𝚞𝚝𝚘𝚜𝚝𝚒𝚌𝚔𝚎𝚛_`);
      // await this.sendButton(m.chat, '*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾 𝙽𝙾 𝙿𝚄𝙴𝙳𝙴 𝙳𝚄𝚁𝙰𝚁 𝙼𝙰𝚂 𝙳𝙴 7 𝚂𝙴𝙶𝚄𝙽𝙳𝙾𝚂*', wm, [['𝙳𝙴𝚂𝙰𝙲𝚃𝙸𝚅𝙰𝚁 𝙰𝚄𝚃𝙾𝚂𝚃𝙸𝙲𝙺𝙴𝚁', '/disable autosticker']], m)
      const img = await q.download();
      if (!img) return;
      stiker = await sticker(img, false, packname, author);
    } else if (m.text.split(/\n| /i)[0]) {
      if (isUrl(m.text)) stiker = await sticker(false, m.text.split(/\n| /i)[0], packname, author);
      else return;
    }
    if (stiker) {
      await mconn.conn.sendFile(m.chat, stiker, null, {asSticker: true});
    }
  }
  return !0;
};
export default handler;

const isUrl = (text) => {
  return text.match(new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'));
};
