export abstract class IGenericRepository<T> {
  abstract getAll(...rest): Promise<T[]>;

  abstract get(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract delete(id: string);

  abstract count(): Promise<number>;
}
