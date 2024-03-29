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

const updateService = (id, title, text, banner) =>
  Article.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

const eraseService = (id) => Article.findOneAndDelete({_id: id});

const likeArticleService = (articleId, userId) => Article.findOneAndUpdate(
  {_id : articleId, "likes.userId": {$nin: [userId]}}, {$push: {likes: {userId, createdAt: new Date()}}}
);

const dislikeArticleService = (articleId, userId) => Article.findOneAndUpdate(
  {_id : articleId}, {$pull: {likes: {userId}}}
);

const addCommentService = (articleId, comment, userId) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return Article.findOneAndUpdate(
    {_id: articleId},
    {$push: {comments: {
      idComment, userId, comment, createdAt: new Date()
    }}}
  );
};

const deleteCommentService = (articleId, commentId, userId) => Article.findOneAndUpdate(
  {_id: articleId}, {$pull: {comments: {idComment: commentId, userId: userId}}}
);

export {
  createService,
  findAllService,
  countArticles,
  topArticleService,
  findByIdService,
  searchByTitleService,
  findByUserService,
  updateService,
  eraseService,
  likeArticleService,
  dislikeArticleService,
  addCommentService,
  deleteCommentService
};
