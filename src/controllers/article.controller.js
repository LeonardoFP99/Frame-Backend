import { createService, findAllService } from '../services/article.service.js';

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        if (!title || !text || !banner) {
            res.status(400).send({message: "Submit all fields"});
        }
        await createService({
            title,
            text,
            banner,
            user: req.userId,
        });
        res.status(201).send({message: "Article published"});
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    try {
        const articles = await findAllService();
        if (articles.length === 0){
            return res.status(400).send({ message: "There are no published articles" });
        }
        res.status(200).send(articles);
    }catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export {
    create,
    findAll,
};