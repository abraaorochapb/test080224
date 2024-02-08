const axios = require('axios');

const allPilares = [];

async function getToken() {
    try {
        const username = "teste_fiqon";
        const password = "senha@115#";
        const credentials = Buffer.from(`${username}:${password}`).toString('base64');

        const urlToken = `https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/autenticacao/57441afd5a59ccd4c62816683fcc8d665c42bb7b12857fc64a6cace4ababdc67f78c70b044`;
        
        const response = await axios.post(urlToken, null, {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        return response.data.api_token;
    } catch (error) {
        console.error("Erro ao obter o token:", error.response.status);
        throw error;
    }
}

async function getPilares(page, token) {
    try {
        const urlPilares = `https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/listar_pilares/76b07f1dbf18eabde7b8e3611ab078daa0f34b094cc9856d20d6d0b15fb3b7a99f697e451d?page=${page}&api_token=${token}`;
        const response = await axios.get(urlPilares);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter os pilares:", error.response.status);
        throw error;
    }
}

async function postPilares() {
    try {
        const token = await getToken();
        console.log("Token:", token);

        for (let page = 0; page <= 4; page++) {
            const pilares = await getPilares(page, token);
            console.log("Pilares da página", page, ":", pilares);
            allPilares.push(...pilares.data);
        }

        const stringPilares = allPilares.join("");
        console.log("Pilares concatenados:", stringPilares);

        const base64Pilares = Buffer.from(stringPilares).toString('base64');
        console.log("Pilares em base64:", base64Pilares);

        const urlPostPilares = `https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/envia_resposta/7b56940678e89802e02e1981a8657206d639f657d4c58efb8d8fb74814799d1c001ec121c6?api_token=${token}`;
        const response = await axios.post(urlPostPilares, {
            answer: base64Pilares
        });
        console.log("Resposta do envio:", response.data);
    } catch (error) {
        console.error("Erro ao enviar os pilares:", error.message);
    }
}

postPilares();

