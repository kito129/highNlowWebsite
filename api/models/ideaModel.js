const mongoose = require('mongoose');

const ideaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    date: { type: Date, required: true },
    ticker: { type: String, required: true },
    view: { type: String, required: true },
    tradingviewLink: { type: String, required: true },
    photoGallery: { type: Array, required: false }
});

module.exports = mongoose.model('Idea', ideaSchema);