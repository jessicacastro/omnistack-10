const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {

        const devs = await Dev.find();

        return res.status(200).json({ devs });

    },

    async store(req, res) {
        const { github_user, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_user });

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_user}`);

            const { name = login, avatar_url, bio } = response.data;
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
    
            dev =  await Dev.create({
                github_user,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        } else {
            return res.status(401).json({ message: 'Usuário já existe na base de dados.'});
        }

        return res.status(200).json({ status: 200, message: `Desenvolvedor @${github_user} cadastrado com sucesso.`, dev });
    },

    async destroy(req, res) {
        const { github_user } = req.body;

        const dev =  await Dev.findOneAndDelete({ github_user: github_user });

        if (!dev) {
            return res.status(404).json({ message: 'Usuário não encontrado. '});
        }

        return res.status(200).json({ message: 'Usuário removido com sucesso.'});
    } 
};