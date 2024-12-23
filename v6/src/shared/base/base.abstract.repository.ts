import {
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';
import { IFindAllResponse } from 'src/interfaces/common';
import { IBaseRepository } from './base.interface.repository';
import { BaseEntity } from './base.schema';

export abstract class BaseRepositoryAbstract<T extends BaseEntity>
  implements IBaseRepository<T>
{
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  async create(dto: T | any): Promise<T> {
    const created_data = await this.model.create(dto);
    return created_data.save();
  }

  async bulkCreate(dtos: Array<T> | any): Promise<T[]> {
    const createdItems = await this.model.insertMany(dtos);
    return createdItems;
  }

  async findOneById(id: string): Promise<T> {
    const item = await this.model.findById(id);
    return item.deleted_at ? null : item;
  }

  async findOneByCondition(condition: FilterQuery<T>): Promise<T> {
    // Kiểm tra nếu không có deleted_at trong condition thì mặc định là null
    return await this.model.findOne({ ...condition, deleted_at: null }).exec();
  }

  async findAll(
    condition: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<IFindAllResponse<T>> {
    // Kiểm tra nếu không có deleted_at trong condition thì mặc định là null
    const [count, items] = await Promise.all([
      this.model.countDocuments({ ...condition, deleted_at: null }),
      this.model.find(
        { ...condition, deleted_at: null },
        options?.projection,
        options,
      ),
    ]);
    return {
      count,
      items,
    };
  }

  async count(condition: FilterQuery<T>): Promise<number> {
    // Kiểm tra nếu không có deleted_at trong condition thì mặc định là null
    return await this.model.countDocuments({
      ...condition,
      deleted_at: null,
    });
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return await this.model.findOneAndUpdate(
      { _id: id, deleted_at: null },
      dto,
      { new: true },
    );
  }

  async updateMany(
    condition: FilterQuery<T>,
    dto: UpdateQuery<T>,
  ): Promise<UpdateWriteOpResult> {
    // Kiểm tra nếu không có deleted_at trong condition thì mặc định là null
    const updateResult = await this.model
      .updateMany({ ...condition, deleted_at: null }, dto)
      .exec();
    return updateResult;
  }

  async softDelete(id: string): Promise<T> {
    return await this.model
      .findByIdAndUpdate<T>(id, { deleted_at: new Date() }, { new: true })
      .exec();
  }

  async softDeleteMany(condition: FilterQuery<T>): Promise<number> {
    const updateResult = await this.model.updateMany(
      { ...condition, deleted_at: null },
      { deleted_at: new Date() },
    );
    return updateResult.modifiedCount;
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    const delete_item = await this.model.findById(id);
    if (!delete_item) {
      return false;
    }
    return !!(await this.model.findByIdAndDelete(id));
  }

  async permanentlyDeleteMany(condition: FilterQuery<T>): Promise<number> {
    // Kiểm tra nếu không có deleted_at trong condition thì mặc định là null
    const count = await this.model.countDocuments({
      ...condition,
      deleted_at: null,
    });
    if (!count) {
      return 0;
    }
    const deleteResult = await this.model.deleteMany({
      ...condition,
      deleted_at: null,
    });
    return deleteResult.deletedCount;
  }
}
