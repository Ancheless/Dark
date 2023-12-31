// TheMystic-Bot-MD@BrunoSobrino - _antiprivado.js

export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`_*< ANTI-PRIVADO />*_\n\n*[ ❗ ] 𝐋𝐚 𝐟𝐮𝐧𝐜𝐢ó𝐧 𝐚𝐧𝐭𝐢𝐩𝐫𝐢𝐯𝐚𝐝𝐨 𝐞𝐬𝐭á 𝐡𝐚𝐛𝐢𝐥𝐢𝐭𝐚𝐝𝐚, 𝐩𝐨𝐫 𝐥𝐨 𝐭𝐚𝐧𝐭𝐨 𝐬𝐞𝐫á𝐬 𝐛𝐥𝐨𝐪𝐮𝐞𝐚𝐝𝐨.*`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
}
