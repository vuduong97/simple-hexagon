import { FilterQuery, UpdateQuery, UpdateWriteOpResult } from 'mongoose';
import { IFindAllResponse } from 'src/interfaces/common';

export interface IBaseRepository<T> {
  create(dto: T | any): Promise<T>;

  bulkCreate(dto: Array<T> | any): Promise<T[]>;

  findOneById(id: string, projection?: string, option?: object): Promise<T>;

  findOneByCondition(condition?: object, projection?: string): Promise<T>;

  findAll(
    condition: FilterQuery<T>,
    options?: object,
  ): Promise<IFindAllResponse<T>>;

  count(condition: FilterQuery<T>): Promise<number>;

  update(id: string, dto: Partial<T>): Promise<T>;

  updateMany(
    condition: FilterQuery<T>,
    dto: UpdateQuery<T>,
  ): Promise<UpdateWriteOpResult>;

  softDelete(id: string): Promise<T>;

  softDeleteMany(condition: FilterQuery<T>): Promise<number>;

  permanentlyDelete(id: string): Promise<boolean>;

  permanentlyDeleteMany(condition: FilterQuery<T>): Promise<number>;
}
