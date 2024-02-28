import Article from "../models/Article.js";

const createService = (body) => Article.create(body);

const findAllService = (offset, limit) =>
  Article.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countArticles = () => Article.countDocuments();

const topArticleService = () =>
  Article.findOne().sort({ _id: -1 }).populate("user");

const findByIdService = (id) => Article.findById(id).populate("user");

const searchByTitleService = (title) =>
  Article.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const findByUserService = (id) =>
  Article.find({ user: id }).sort({ _id: -1 }).populate("user");

export {
  createService,
  findAllService,
  countArticles,
  topArticleService,
  findByIdService,
  searchByTitleService,
  findByUserService,
};
