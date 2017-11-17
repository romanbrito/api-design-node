import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({

});

export default mongoose.model('post', PostSchema);