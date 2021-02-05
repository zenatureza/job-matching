import Technology from '../infra/typeorm/entities/Technology.entity';

export default interface ITechnologiesRepository {
  findByNames(techNames: string[]): Promise<Technology[] | undefined>;
}
