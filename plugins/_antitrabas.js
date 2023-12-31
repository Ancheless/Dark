/**
TheMystic-Bot-MD@BrunoSobrino - _antitrabas.js
By @NeKosmic || https://github.com/NeKosmic/
**/

import * as fs from 'fs';

export async function before(m, {conn, isAdmin, isBotAdmin, usedPrefix}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  const delet = m.key.participant;
  const bang = m.key.id;
  const name = await conn.getName(m.sender);
  const fakemek = {'key': {'participant': '0@s.whatsapp.net', 'remoteJid': '0@s.whatsapp.net'}, 'message': {'groupInviteMessage': {'groupJid': '51994429268-1616969743@g.us', 'inviteCode': 'm', 'groupName': 'P', 'caption': 'Furious - Bot', 'jpegThumbnail': null}}};
  if (chat.antiTraba && m.text.length > 5000) { // Cantidad máxima de caracteres aceptados en un mensaje.
    if (isAdmin) return conn.sendMessage(m.chat, {text: `_*< ANTI-TRABAS />*_\n\n*[ ❗ ] 𝐄𝐥 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 @${m.sender.split('@')[0]} 𝐞𝐧𝐯𝐢𝐨 𝐮𝐧 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐪𝐮𝐞 𝐜𝐨𝐧𝐭𝐢𝐞𝐧𝐞 𝐦𝐮𝐜𝐡𝐨𝐬 𝐜𝐚𝐫𝐚𝐜𝐭𝐞𝐫𝐞𝐬.*`, mentions: [m.sender]}, {quoted: fakemek});
    conn.sendMessage(m.chat, `*[ ❗ ] 𝐒𝐞 𝐝𝐞𝐭𝐞𝐜𝐭𝐨 𝐮𝐧 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐪𝐮𝐞 𝐜𝐨𝐧𝐭𝐢𝐞𝐧𝐞 𝐦𝐮𝐜𝐡𝐨𝐬 𝐜𝐚𝐫𝐚𝐜𝐭𝐞𝐫𝐞𝐬 [ ! ]*\n`, `${isBotAdmin ? '' : '𝐍𝐨 𝐬𝐨𝐲 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫, 𝐧𝐨 𝐩𝐮𝐞𝐝𝐨 𝐡𝐚𝐜𝐞𝐫 𝐧𝐚𝐝𝐚 :/'}`, m);
    // await conn.sendButton(m.chat, `*[ ❗ ] 𝐒𝐞 𝐝𝐞𝐭𝐞𝐜𝐭𝐨 𝐮𝐧 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐪𝐮𝐞 𝐜𝐨𝐧𝐭𝐢𝐞𝐧𝐞 𝐦𝐮𝐜𝐡𝐨𝐬 𝐜𝐚𝐫𝐚𝐜𝐭𝐞𝐫𝐞𝐬 [ ! ]*\n`, `${isBotAdmin ? '' : '𝐍𝐨 𝐬𝐨𝐲 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫, 𝐧𝐨 𝐩𝐮𝐞𝐝𝐨 𝐡𝐚𝐜𝐞𝐫 𝐧𝐚𝐝𝐚 :/'}`, author, ['[ DESACTIVAR ANTI TRABAS ]', usedPrefix+'apagar antitraba'], fakemek )
    if (isBotAdmin && bot.restrict) {
      conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}});
        	setTimeout(() => {
        	conn.sendMessage(m.chat, {text: `Marcar el chat como leido ✓\n${'\n'.repeat(400)}\n=> El número : wa.me/${m.sender.split('@')[0]}\n=> Alias : ${name}\n[ ❗ ] 𝐀𝐜𝐚𝐛𝐚 𝐝𝐞 𝐞𝐧𝐯𝐢𝐚𝐫 𝐮𝐧 𝐭𝐞𝐱𝐭𝐨 𝐪𝐮𝐞 𝐜𝐨𝐧𝐭𝐢𝐞𝐧𝐞 𝐦𝐮𝐜𝐡𝐨𝐬 𝐜𝐚𝐫𝐚𝐜𝐭𝐞𝐫𝐞𝐬 𝐪𝐮𝐞 𝐩𝐮𝐞𝐝𝐞 𝐨𝐜𝐚𝐬𝐢𝐨𝐧𝐚𝐫 𝐟𝐚𝐥𝐥𝐨𝐬 𝐞𝐧 𝐥𝐨𝐬 𝐝𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐨𝐬`, mentions: [m.sender]}, {quoted: fakemek});
      }, 0);
      setTimeout(() => {
        	conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      }, 1000);
    } else if (!bot.restrict) return m.reply('[ ❗ ] 𝐏𝐚𝐫𝐚 𝐫𝐞𝐚𝐥𝐢𝐳𝐚𝐫 𝐚𝐜𝐜𝐢𝐨𝐧𝐞𝐬 𝐝𝐞 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐜𝐢ó𝐧, 𝐦𝐢 𝐝𝐮𝐞ñ𝐨 𝐭𝐢𝐞𝐧𝐞 𝐪𝐮𝐞 𝐞𝐧𝐜𝐞𝐧𝐝𝐞𝐫 𝐞𝐥 𝐦𝐨𝐝𝐨 𝐫𝐞𝐬𝐭𝐫𝐢𝐧𝐠𝐢𝐝𝐨!');
  }
  return !0;
}
