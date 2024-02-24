import Article from "../models/Article.js";

const createService = (body) => Article.create(body);

const findAllService = (offset, limit) =>
  Article.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countArticles = () => Article.countDocuments();

export { createService, findAllService, countArticles };