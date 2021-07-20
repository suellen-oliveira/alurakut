import axios from 'axios';

const baseURL = `https://api.github.com/users`;

export const currentAlurakutUser = async (user) => {
    const { data } = await axios.get(`${baseURL}/${user}`);

    return data;
}

export const alurakutFriends = async (user) => {
    const { data } = await axios.get(`${baseURL}/${user}/followers`);

    return data;
}
