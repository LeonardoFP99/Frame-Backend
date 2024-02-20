import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    banner: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    likes: {
        type: Array,
        require: true
    },
    comments: {
        type: Array,
        require: true
    }
});

const Article = mongoose.model("article", ArticleSchema);

export default Article;