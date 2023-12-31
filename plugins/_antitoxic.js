// TheMystic-Bot-MD@BrunoSobrino - _antitoxic.js

const toxicRegex = /puto|puta|rata|estupido|imbecil|rctmre|mrd|verga|vrga|maricon/i;

export async function before(m, {isAdmin, isBotAdmin, isOwner}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) {
    return !1;
  }
  const user = global.db.data.users[m.sender];
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[mconn.conn.user.jid] || {};
  const isToxic = toxicRegex.exec(m.text);

  if (isToxic && chat.antiToxic && !isOwner && !isAdmin) {
    user.warn += 1;
    if (!(user.warn >= 5)) await m.reply('_*< ANTI-TOXIC />*_\n\n*[ ❗ ] ' + `${user.warn == 1 ? `@${m.sender.split`@`[0]}` : `@${m.sender.split`@`[0]}`}, 𝐞𝐧𝐯𝐢𝐚𝐫 𝐥𝐚 𝐩𝐚𝐥𝐚𝐛𝐫𝐚 "${isToxic}" 𝐞𝐬𝐭á 𝐩𝐫𝐨𝐡𝐢𝐛𝐢𝐝𝐨 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.\n\n▢ *𝐀𝐝𝐯𝐞𝐫𝐭𝐞𝐧𝐜𝐢𝐚:* ${user.warn}/5` + '*', false, {mentions: [m.sender]});
  }

  if (user.warn >= 5) {
    user.warn = 0;
    await m.reply(`_*< ANTI-TOXIC />*_\n\n*[ ❗ ] 𝐄𝐥 𝐩𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚𝐧𝐭𝐞 @${m.sender.split('@')[0]}, 𝐬𝐮𝐩𝐞𝐫ó 𝐥𝐚𝐬 𝟓 𝐚𝐝𝐯𝐞𝐫𝐭𝐞𝐧𝐜𝐢𝐚𝐬, 𝐩𝐨𝐫 𝐥𝐨 𝐪𝐮𝐞 𝐬𝐞𝐫á 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐝𝐨 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.*`, false, {mentions: [m.sender]});
    user.banned = true;
    await mconn.conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    // await this.updateBlockStatus(m.sender, 'block')
  }
  return !1;
}
