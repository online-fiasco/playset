import * as mongoose from 'mongoose';
import { Playset, PlaysetModel } from './model/Playset';

export class PlaysetDB {
  constructor() { }

  create (playset: Playset): Promise<Playset> {
    const model = new PlaysetModel(playset);
    return model.save();
  }

  read (query: any): mongoose.DocumentQuery<Playset[], Playset> {
    return PlaysetModel.find(query);
  }

  readOne (query: any): mongoose.DocumentQuery<Playset | null, Playset> {
    return PlaysetModel.findOne(query);
  }

  update (playset: Playset): mongoose.Query<number> {
    return PlaysetModel.update({ _id: playset._id }, { ...playset });
  }

  delete (playset: Playset) {
    return PlaysetModel.remove({ _id: playset._id });
  }
}
