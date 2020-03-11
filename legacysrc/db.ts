import * as mongoose from 'mongoose';
import { Playset, PlaysetModel } from './model/Playset';

type PageQuery = {
  pageIndex?: number,
  pageSize?: number,
};

export class PlaysetDB {
  private constructor() {}

  static async create (): Promise<PlaysetDB> {
    if (mongoose.connection.readyState !== 1) {
      const mongoURI = process.env.MONGO_URI as string;
      await mongoose.connect(mongoURI, { useNewUrlParser: true });
    }

    return new PlaysetDB();
  }

  create (playset: Playset): Promise<Playset> {
    const model = new PlaysetModel(playset);
    return model.save();
  }

  count (): mongoose.Query<number> {
    return PlaysetModel.countDocuments();
  }

  read (query: any, pageQuery: PageQuery): mongoose.DocumentQuery<Playset[], Playset> {
    const { pageIndex, pageSize } = pageQuery;

    return PlaysetModel.find(query)
      .limit(pageSize ?? 20)
      .skip((pageSize ?? 20) * ((pageIndex ?? 1) - 1));
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
