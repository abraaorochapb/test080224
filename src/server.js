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


