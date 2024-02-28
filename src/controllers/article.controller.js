import {
  createService,
  findAllService,
  countArticles,
  topArticleService,
  findByIdService,
  searchByTitleService,
  findByUserService,
  updateService
} from "../services/article.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    if (!title || !text || !banner) {
      res.status(400).send({ message: "Submit all fields" });
    }
    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });
    res.status(201).send({ message: "Article published" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const articles = await findAllService(offset, limit);
    const total = await countArticles();
    const currentURL = req.baseUrl;

    const next = offset + limit;
    const nextURL =
      next < total ? `${currentURL}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousURL =
      previous !== null
        ? `${currentURL}?limit=${limit}&offset=${previous}`
        : null;

    if (articles.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no published articles" });
    }
    res.status(200).send({
      nextURL,
      previousURL,
      limit,
      offset,
      total,
      results: articles.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.username,
        useravatar: item.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const topArticle = async (req, res) => {
  try {
    const article = await topArticleService();

    if (!article) {
      return res
        .status(400)
        .send({ message: "There are no published articles" });
    }

    res.status(200).send({
      article: {
        id: article._id,
        title: article.title,
        text: article.text,
        banner: article.banner,
        likes: article.likes,
        comments: article.comments,
        name: article.user.name,
        username: article.user.username,
        useravatar: article.user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
    try{
        const { id } = req.params;
        const article = await findByIdService(id);
        return res.status(200).send({
            article: {
                id: article._id,
                title: article.title,
                text: article.text,
                banner: article.banner,
                likes: article.likes,
                comments: article.comments,
                name: article.user.name,
                username: article.user.username,
                useravatar: article.user.avatar,
              },
        });
    }catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const searchByTitle = async (req, res) => {
    try{
        const { title } = req.query;
        const articles = await searchByTitleService(title);
        if(articles.length === 0){
            return res.status(400).send({ message: "There are no articles with this title" });
        }

        return res.status(200).send({
            results: articles.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                useravatar: item.user.avatar,
            }),
        )});

    }catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const findByUser = async (req, res) => {
  try{
    const id = req.userId;
    const articles = await findByUserService(id);

    if(articles.length === 0){
      return res.status(400).send({ message: "There are no articles published by this user" });
    }

    return res.status(200).send({
      results: articles.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.username,
        useravatar: item.user.avatar,
      }),
    )});

  }catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try{
    const {title, text, banner} = req.body;
    const {id} = req.params;

    if(!title && !banner && !text) {
      return res.status(400).send({message: "Submit at least one field to update the article"});
    }

    const article = await findByIdService(id);

    if(!article.user._id.equals(req.userId)){
      return res.status(401).send({message: "You can only update articles created by you"});
    }

    await updateService(id, title, text, banner);

    return res.status(200).send({message: "Article updated"});
  }catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export { 
  create, 
  findAll, 
  topArticle, 
  findById, 
  searchByTitle, 
  findByUser, 
  update,
};
