// TheMystic-Bot-MD@BrunoSobrino - _antilink2.js

const linkRegex = /https:/i;
export async function before(m, {conn, isAdmin, isBotAdmin, text}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const delet = m.key.participant;
  const bang = m.key.id;
  const bot = global.db.data.settings[this.user.jid] || {};
  const user = `@${m.sender.split`@`[0]}`;
  const isGroupLink = linkRegex.exec(m.text);
  if (chat.antiLink2 && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      const linkThisGroup2 = `https://www.youtube.com/`;
      const linkThisGroup3 = `https://youtu.be/`;
      if (m.text.includes(linkThisGroup)) return !0;
      if (m.text.includes(linkThisGroup2)) return !0;
      if (m.text.includes(linkThisGroup3)) return !0;
    }
    await this.sendMessage(m.chat, {text: `_*< ANTI-LINK 2 />*_\n\n*[ ❗ ] 𝐄𝐥 𝐩𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚𝐧𝐭𝐞 @𝐮𝐬𝐞𝐫 𝐞𝐧𝐯𝐢ó 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞 𝐝𝐞 𝐮𝐧 𝐠𝐫𝐮𝐩𝐨 𝐝𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩, 𝐩𝐨𝐫 𝐥𝐨 𝐪𝐮𝐞 𝐬𝐞𝐫á 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐝𝐨.*`, mentions: [m.sender]}, {quoted: m});
    if (!isBotAdmin) return m.reply('_*< ANTI-LINK 2 />*_\n\n*[ ❗ ] 𝐏𝐚𝐫𝐚 𝐪𝐮𝐞 𝐞𝐥 𝐚𝐧𝐭𝐢-𝐥𝐢𝐧𝐤 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐞 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞 𝐞𝐬 𝐧𝐞𝐜𝐞𝐬𝐚𝐫𝐢𝐨 𝐪𝐮𝐞 𝐞𝐥 𝐛𝐨𝐭 𝐬𝐞𝐚 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.*');
    if (isBotAdmin && bot.restrict) {
      await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}});
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    } else if (!bot.restrict) return m.reply('_*< ANTI-LINK 2 />*_\n\n*[ ❗ ] 𝐄𝐬𝐭𝐚 𝐟𝐮𝐧𝐜𝐢ó𝐧 𝐞𝐬𝐭á 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐚 𝐝𝐞𝐛𝐢𝐝𝐨 𝐚 𝐪𝐮𝐞 𝐥𝐚 𝐟𝐮𝐧𝐜𝐢ó𝐧* _𝐫𝐞𝐬𝐭𝐫𝐢𝐜𝐭_ *𝐞𝐬𝐭á 𝐡𝐚𝐛𝐢𝐥𝐢𝐭𝐚𝐝𝐚.*');
  }
  return !0;
}
