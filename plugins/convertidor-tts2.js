/*//////////////////////////////////////////////

        [ ❗ ] CREDITOS - NO MODIFICAR [ ❗ ]

           Codigo hecho por @BrunoSobrino
       Github: https://github.com/BrunoSobrino
       
       Nota: Solo hay disponibles efectos en
       ingles, por lo que el texto en otros
       idiomas puede sonar raro.
       
//////////////////////////////////////////////*/

import axios from 'axios';
import fetch from 'node-fetch';
const handler = async (m, { conn, usedPrefix, command, text, args }) => {
  const [efecto, ...textoArray] = text.split(" ");
  const texto = textoArray.join("");

  if (!efecto) {
    let voiceList = await getVoiceList();
    let responseText = `*[❗] 𝐍𝐨 𝐡𝐚𝐳 𝐢𝐧𝐠𝐫𝐞𝐬𝐚𝐝𝐨 𝐮𝐧 𝐞𝐟𝐞𝐜𝐭𝐨, 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐢𝐧𝐠𝐫𝐞𝐬𝐚 𝐮𝐧 𝐞𝐟𝐞𝐜𝐭𝐨 𝐝𝐞 𝐯𝐨𝐳.*\n\n*—◉ 𝐄𝐥𝐢𝐠𝐞 𝐮𝐧𝐨 𝐝𝐞 𝐥𝐨𝐬 𝐬𝐢𝐠𝐮𝐢𝐞𝐧𝐭𝐞𝐬 𝐞𝐟𝐞𝐜𝐭𝐨𝐬:*\n`;

    for (let i = 0, count = 0; count < 100 && i < voiceList.resultado.length; i++) {
      const entry = voiceList.resultado[i];
      if (entry.ID.length <= 20) {
        responseText += `*◉ ${usedPrefix + command} ${entry.ID} tu_texto_aquí*\n`;
        count++;
      }
    }

    return conn.sendMessage(m.chat, { text: responseText.trim() }, { quoted: m });
  }

  let efectoValido = false;
  let voiceList = await getVoiceList();
  for (const entry of voiceList.resultado) {
    if (entry.ID === efecto) {
      efectoValido = true;
      break;
    }
  }

  if (!efectoValido) return conn.sendMessage(m.chat, { text: `*[❗] 𝐄𝐥 𝐞𝐟𝐞𝐜𝐭𝐨 𝐩𝐫𝐨𝐩𝐨𝐫𝐜𝐢𝐨𝐧𝐚𝐝𝐨 𝐧𝐨 𝐞𝐱𝐢𝐬𝐭𝐞 𝐞𝐧 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚, 𝐮𝐭𝐢𝐥𝐢𝐳𝐚 ${usedPrefix + command} 𝐩𝐚𝐫𝐚 𝐜𝐨𝐧𝐨𝐜𝐞𝐫 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐞𝐟𝐞𝐜𝐭𝐨𝐬.*` }, { quoted: m });

  if (!texto) return conn.sendMessage(m.chat, {text: `*[❗] 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐞𝐥 𝐭𝐞𝐱𝐭𝐨 𝐪𝐮𝐞 𝐪𝐮𝐢𝐞𝐫𝐚𝐬 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐚 𝐚𝐮𝐝𝐢𝐨.*\n\n*—◉ Ejemplo:*\n*◉ ${usedPrefix + command} ${efecto} 𝐇𝐨𝐥𝐚, 𝐞𝐬𝐭𝐞 𝐞𝐬 𝐮𝐧 𝐞𝐣𝐞𝐦𝐩𝐥𝐨 𝐝𝐞 𝐮𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*`}, {quoted: m});

  let masivo = await makeTTSRequest(texto, efecto);
  conn.sendMessage(m.chat, {audio: {url: masivo.resultado}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
};

handler.command = /^(g?tts2)$/i;
export default handler;

const secretKey = 'fe2ee40099494579af0ecf871b5af266';
const userId = 'SrgwcKcLzSY63IdsAxd1PzscFjL2';

async function getVoiceList() {
  const url = 'https://play.ht/api/v2/voices';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      AUTHORIZATION: `Bearer ${secretKey}`,
      'X-USER-ID': userId
    }
  };
  try {
    const response = await fetch(url, options);
    const responseData = await response.json(); 
    const uniqueData = responseData.reduce((acc, current) => {
      if (!acc.some(item => item.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);
    const simplifiedList = uniqueData.map(entry => ({
      ID: entry.id,
      name: entry.name,
      lenguaje: entry.language  
    }));
    return { resultado: simplifiedList ? simplifiedList : '[❗] 𝐄𝐫𝐫𝐨𝐫, 𝐧𝐨 𝐬𝐞 𝐨𝐛𝐭𝐮𝐯𝐨 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚 𝐝𝐞 𝐥𝐚 𝐀𝐏𝐈.' };
  } catch (error) {
    console.error('Error:', error);
    return { resultado: '[❗] 𝐄𝐫𝐫𝐨𝐫, 𝐧𝐨 𝐬𝐞 𝐨𝐛𝐭𝐮𝐯𝐨 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚 𝐝𝐞 𝐥𝐚 𝐀𝐏𝐈.' };
    throw error;
  }
}

async function makeTTSRequest(texto, efecto) {
  const requestData = {text: texto, voice: efecto};
  const headers = {
    'Authorization': `Bearer ${secretKey}`,
    'X-User-Id': userId,
    'accept': 'text/event-stream',
    'content-type': 'application/json'
  };
  try {
    const response = await axios.post('https://play.ht/api/v2/tts', requestData, { headers });
    const events = response.data.split('\r\n\r\n');
    const eventData = events.find(event => event.includes('"stage":"complete"'));
    const urlMatch = eventData.match(/"url":"([^"]+)"/);
    const url = urlMatch ? urlMatch[1] : null;
    return { resultado: url ? url : '[❗] 𝐔𝐑𝐋 𝐧𝐨 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐝𝐚 𝐞𝐧 𝐥𝐚 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚.' };
  } catch (error) {
    console.error('Error:', error);
    return { resultado: '[❗] 𝐄𝐫𝐫𝐨𝐫, 𝐧𝐨 𝐬𝐞 𝐨𝐛𝐭𝐮𝐯𝐨 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚 𝐝𝐞 𝐥𝐚 𝐀𝐏𝐈.' };
  }
}
