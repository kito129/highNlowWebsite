const mongoose = require('mongoose');

const formazioneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    paragraph: { type: String, required: true },
    date: { type: Date, required: true },
    tag: { type: Array, required: true },
    photoGallery: { type: Array, required: false }
});

module.exports = mongoose.model('Formazione', formazioneSchema);