// import { SiteClient } from 'datocms-client';

// export const recebedorDaResposta = async (request, response) => {
//     const TOKEN = '49825ca773eb331462a377cb5f3456';

//     const client = new SiteClient(TOKEN);

//     const registroCriado = await client.items.create({
//         itemType: '968855',
//         title: 'Comunidade teste',
//         imageUrl: 'https://github.com/suellen-oliveira.png',
//         creatorSlug: 'suellen-oliveira',
//     })

//     response.json({
//         dados: 'qualquer coisa',
//         registroCriado: registroCriado,
//     })
// }

import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') {
        const TOKEN = '49825ca773eb331462a377cb5f3456';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "968855",
            ...request.body,
        })

        console.log(registroCriado);

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}