import Article from '../models/Article.js';

const createService = (body) => Article.create(body);
const findAllService = () => Article.find();

export {
    createService,
    findAllService
};