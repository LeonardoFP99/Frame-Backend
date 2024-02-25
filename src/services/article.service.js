import Article from "../models/Article.js";

const createService = (body) => Article.create(body);

const findAllService = (offset, limit) =>
  Article.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countArticles = () => Article.countDocuments();

const topArticleService = () => Article.findOne().sort({_id: -1}).populate("user");

const findByIdService = (id) => Article.findById(id).populate("user");

export { createService, findAllService, countArticles, topArticleService, findByIdService };