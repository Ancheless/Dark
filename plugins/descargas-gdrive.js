import fetch from 'node-fetch';
import {sizeFormatter} from 'human-readable';
const formatSize = sizeFormatter({
  std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`});

const handler = async (m, {conn, args, usedPrefix, command}) => {
  if (!args[0]) throw `_*< DESCARGAS - GDRIVE />*_\n\n*[ ❗ ] 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞 𝐝𝐞 𝐆𝐨𝐨𝐠𝐥𝐞 𝐃𝐫𝐢𝐯𝐞.*\n\n*[ 💡 ] 𝐄𝐣𝐞𝐦𝐩𝐥𝐨:* _${usedPrefix + command} https://drive.google.com/file/d/1dmHlx1WTbH5yZoNa_ln325q5dxLn1QHU/view_`;
  try {
    GDriveDl(args[0]).then(async (res) => {
      conn.reply(m.chat, '_*< DESCARGAS - GDRIVE />*_\n\n*[ ❗ ] 𝐒𝐞 𝐞𝐬𝐭á 𝐞𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐞𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨. 𝐞𝐬𝐩𝐞𝐫𝐞...*\n\n*[ ❗ ] 𝐒𝐢 𝐧𝐨 𝐬𝐞 𝐞𝐧𝐯í𝐚, 𝐩𝐨𝐝𝐫í𝐚 𝐬𝐞𝐫 𝐩𝐨𝐫𝐪𝐮𝐞 𝐬𝐮𝐩𝐞𝐫𝐚 𝐞𝐥 𝐥í𝐦𝐢𝐭𝐞 𝐝𝐞 𝐭𝐚𝐦𝐚ñ𝐨.*', m);
      if (!res) throw res;
      conn.sendFile(m.chat, res.downloadUrl, res.fileName, '', m, null, {mimetype: res.mimetype, asDocument: true});
    });
  } catch (e) {
    m.reply('_*< DESCARGAS - GDRIVE />*_\n\n*[ ❗ ] 𝐎𝐜𝐮𝐫𝐫𝐢ó 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫. 𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐢𝐧𝐭é𝐧𝐭𝐚𝐥𝐨 𝐝𝐞 𝐧𝐮𝐞𝐯𝐨 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞.*');
    console.log(e);
  }
};
handler.command = /^(gdrive)$/i;
export default handler;
async function GDriveDl(url) {
  let id;
  if (!(url && url.match(/drive\.google/i))) throw 'Invalid URL';
  id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
  if (!id) throw 'ID Not Found';
  const res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
    method: 'post',
    headers: {
      'accept-encoding': 'gzip, deflate, br',
      'content-length': 0,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'origin': 'https://drive.google.com',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
      'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
      'x-drive-first-party': 'DriveWebUi',
      'x-json-requested': 'true'}});
  const {fileName, sizeBytes, downloadUrl} = JSON.parse((await res.text()).slice(4));
  if (!downloadUrl) throw 'Link Download Limit!';
  const data = await fetch(downloadUrl);
  if (data.status !== 200) throw data.statusText;
  return {downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type')};
}
