import { Model } from 'mongoose';
import { QueryHelper } from './helpers/query-helper';

export class BaseRepository<T> {
  constructor(protected schemaModel: Model<T>) {}

  async save(data: any): Promise<any> {
    const entity = new this.schemaModel(data);
    const saved = await entity.save();
    return saved;
  }

  async findOne(parameter: any, populate?: string[]): Promise<any> {
    return this.schemaModel.findOne(parameter).populate(populate);
  }

  async findAll(queryhelper:QueryHelper = {}): Promise<any[]> {
    let result = this.schemaModel.find(queryhelper.filters).populate(queryhelper.populate)

    if(queryhelper.select){
      return result.select(queryhelper.select).exec()
    }

    return result.exec() 
  }

  async update(id: string, data: any): Promise<any> {
    return this.schemaModel.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  async delete(param: any): Promise<any> {
    return this.schemaModel.findOneAndRemove(param);
  }
}
