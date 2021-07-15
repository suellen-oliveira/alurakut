import axios from 'axios';

const baseURL = `https://api.github.com/users/suellen-oliveira`;

export const currentAlurakutUser = async () => {
    const { data } = await axios.get(baseURL);

    return data;
}

export const alurakutFriends = async () => {
    const { data } = await axios.get(`${baseURL}/followers`);
    console.log('requisicao arquivo api: ', data)
    return data;
}
