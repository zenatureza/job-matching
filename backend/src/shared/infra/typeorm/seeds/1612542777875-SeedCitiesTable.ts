import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import csv from 'csvtojson';
import City from '@modules/cities/infra/typeorm/entities/City.entity';

export class SeedCitiesTable1612542777875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = await csv().fromFile('cities.csv');

    if (data && data.length > 0) {
      const cities: City[] = [];
      data.forEach(city => {
        const newCity = new City();
        newCity.name = city['name'];
        newCity.state_initials = city['state_initials'];

        cities.push(newCity);
      });

      await queryRunner.manager.insert(City, cities);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE cities`);
  }
}
