const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        //BUSCAR TODOS OS DEVS NUM RAIO DE 10KM
        const { latitude, longitude, techs} = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        if (devs.length == 0) {
            return res.status(204).json({ message: 'Não existem desenvolvedores próximos com essas tecnologias. '});
        }

        return res.status(200).json({devs});
    }
}