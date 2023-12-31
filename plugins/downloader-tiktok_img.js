// Code by Xnuvers007 ft. Jikarinka
// https://github.com/Xnuvers007/
// 
// Mejorado por @BrunoSobrino
////////////////////////////////////

import axios from 'axios';
import cheerio from 'cheerio';
let handler = async (m, { conn, text: tiktok, args, command, usedPrefix}) => {
if (!tiktok) throw '*[❗] 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞 𝐝𝐞 𝐭𝐢𝐤𝐭𝐨𝐤 𝐢𝐦𝐚𝐠𝐞𝐧𝐞𝐬, 𝐞𝐣𝐞𝐦𝐩𝐥𝐨: "https://vm.tiktok.com/ZM2cqBRVS/".*';        
let imagesSent
if (imagesSent) return;
imagesSent = true    
try {   
let tioShadow = await ttimg(tiktok); 
let result = tioShadow?.data;
for (let d of result) {
  await conn.sendMessage(m.chat, {image: {url: d}}, {quoted: m});
 };
imagesSent = false
} catch {
    imagesSent = false    
    throw '*[❗] 𝐍𝐨 𝐬𝐞 𝐨𝐛𝐭𝐮𝐯𝐨 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚 𝐝𝐞 𝐥𝐚 𝐩á𝐠𝐢𝐧𝐚, 𝐢𝐧𝐭𝐞𝐧𝐭𝐞 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞.*'
 }
};
handler.command = /^(ttimg|tiktokimg)$/i;
export default handler;

async function ttimg(link) {
    try {    
        let url = `https://dlpanda.com/es?url=${link}&token=G7eRpMaa`;    
        let response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        let imgSrc = [];
        $('div.col-md-12 > img').each((index, element) => {
            imgSrc.push($(element).attr('src'));
        });
        if (imgSrc.length === 0) {
            return { data: '*[❗] 𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐫𝐨𝐧 𝐢𝐦á𝐠𝐞𝐧𝐞𝐬 𝐞𝐧 𝐞𝐥 𝐞𝐧𝐥𝐚𝐜𝐞 𝐩𝐫𝐨𝐩𝐨𝐫𝐜𝐢𝐨𝐧𝐚𝐝𝐨.*' };
        }
        return { data: imgSrc }; 
    } catch (error) {
        console.lo (error);
        return { data: '*[❗] 𝐍𝐨 𝐬𝐞 𝐨𝐛𝐭𝐮𝐯𝐨 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚 𝐝𝐞 𝐥𝐚 𝐩á𝐠𝐢𝐧𝐚, 𝐢𝐧𝐭𝐞𝐧𝐭𝐞 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞.*'};
    };
};
