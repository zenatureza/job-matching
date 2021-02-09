import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCandidatesView1612786449958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create or replace view candidates_view as
        select
          ct.id,
          ct.technology_id,
          c2.city_id,
          c2.start_experience_range,
          c2.end_experience_range,
          ct.candidate_id,
          ct.is_main_tech,
          c.state_initials,
          t.name as technology,
          concat(c.name, ' - ', c.state_initials) as city
        from
          candidates_technologies ct
        join
          candidates c2 on
          c2.id = ct.candidate_id
        join
          cities c on
          c.id = c2.city_id
        join technologies t on
          t.id = ct.technology_id;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop view if exists candidates_view');
  }
}
