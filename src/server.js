const axios = require('axios');

async function getToken() {
    try {
        const urlToken = `https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/autenticacao/57441afd5a59ccd4c62816683fcc8d665c42bb7b12857fc64a6cace4ababdc67f78c70b044`;
        const response = await axios.post(urlToken, null, {
            auth: {
                username: "teste_fiqon",
                password: "senha@115#"
            }
        });
        return response.data.api_token;
    } catch (error) {
        console.error("Erro ao obter o token:", error.response.status);
        throw error;
    }
}

getToken().then(token => {
    console.log("Token:", token);
});

async function fetchPilares() {
    try {
        const token = await getToken();
        const totalPages = 5;
        const pilaresArray = [];

        for (let page = 1; page <= totalPages; page++) {
            const urlPilares = `https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126?page=${page}&api_token=${token}`;
            const response = await axios.get(urlPilares);
            pilaresArray.push(response.data);
        }

        return pilaresArray;
    } catch (error) {
        console.error("Erro ao obter os pilares:", error.message);
        throw error;
    }
}

// Chama a função fetchPilares e manipula o array de respostas
fetchPilares()
    .then(pilaresArray => {
        console.log("Array de respostas dos pilares:", pilaresArray);
        // Faça o que for necessário com o array de respostas aqui
    })
    .catch(error => {
        console.error("Erro ao obter os pilares:", error.message);
    });



