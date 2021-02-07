import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCandidatesTable1612548864137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candidates',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'recruiting_api_id',
            type: 'int',
          },
          {
            name: 'start_experience_range',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'end_experience_range',
            type: 'int',
          },
          {
            name: 'city_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'candidates',
      new TableForeignKey({
        name: 'CandidateCity',
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('candidates');
  }
}
