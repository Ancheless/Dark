/* Creditos a https://github.com/ALBERTO9883 */

const handler = async (m, {conn}) => {
  const revoke = await conn.groupRevokeInvite(m.chat);
  await conn.reply(m.chat, `🔹️ *_𝐒𝐞 𝐫𝐞𝐬𝐭𝐚𝐛𝐥𝐞𝐜𝐢ó 𝐜𝐨𝐧 é𝐱𝐢𝐭𝐨 𝐞𝐥 𝐥𝐢𝐧𝐤 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨._*\n♾ • 𝐋𝐢𝐧𝐤 𝐍𝐮𝐞𝐯𝐨: ${'https://chat.whatsapp.com/' + revoke}`, m);
};
handler.command = ['resetlink', 'revoke'];
handler.botAdmin = true;
handler.admin = true;
handler.group = true;
export default handler;
