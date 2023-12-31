import fetch from 'node-fetch';
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
const handler = async (m, {args, usedPrefix, command}) => {
  if (!args[0]) throw `_*< DESCARGAS - GITCLONE />*_\n\n*[ ❗ ] 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞 𝐝𝐞 𝐆𝐢𝐭𝐇𝐮𝐛.*\n\n*[ 💡 ] 𝐄𝐣𝐞𝐦𝐩𝐥𝐨:* _${usedPrefix + command} https://www.instagram.com/gonza_04_05/_`;
  if (!regex.test(args[0])) throw '_*< DESCARGAS - GITCLONE />*_\n\n*[ ❗ ] 𝐄𝐥 𝐞𝐧𝐥𝐚𝐜𝐞 𝐪𝐮𝐞 𝐩𝐫𝐨𝐩𝐨𝐫𝐜𝐢𝐨𝐧ó 𝐞𝐬 𝐢𝐧𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐨.*';
  let [_, user, repo] = args[0].match(regex) || [];
  repo = repo.replace(/.git$/, '');
  const url = `https://api.github.com/repos/${user}/${repo}/zipball`;
  const filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
  m.reply(`_*< DESCARGAS - GITCLONE />*_\n\n*[ ❗ ] 𝐒𝐞 𝐞𝐬𝐭á 𝐞𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐞𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨. 𝐞𝐬𝐩𝐞𝐫𝐞...*\n\n*[ ❗ ] 𝐒𝐢 𝐧𝐨 𝐬𝐞 𝐞𝐧𝐯í𝐚, 𝐩𝐨𝐝𝐫í𝐚 𝐬𝐞𝐫 𝐩𝐨𝐫𝐪𝐮𝐞 𝐬𝐮𝐩𝐞𝐫𝐚 𝐞𝐥 𝐥í𝐦𝐢𝐭𝐞 𝐝𝐞 𝐭𝐚𝐦𝐚ñ𝐨.*`);
  conn.sendFile(m.chat, url, filename, null, m);
};
handler.command = /gitclone/i;
export default handler;
