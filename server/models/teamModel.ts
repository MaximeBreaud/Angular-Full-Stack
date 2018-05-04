import * as mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  tname: String,
  img: String,
  flag: String,
  players: [{ name: String }]
});

const teamModel = mongoose.model('team', teamSchema);

export default teamModel;
