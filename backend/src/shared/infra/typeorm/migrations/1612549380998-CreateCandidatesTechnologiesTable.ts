import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCandidatesTechnologiesTable1612549380998
  implements MigrationInterface {
  private tableName = 'candidates_technologies';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candidates_technologies',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'recruiting_api_candidate_id',
            type: 'int',
          },
          {
            name: 'candidate_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'technology_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'is_main_tech',
            type: 'boolean',
            default: false,
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
      `${this.tableName}`,
      new TableForeignKey({
        name: 'CandidateTechnologyCandidate',
        columnNames: ['candidate_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'candidates',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      `${this.tableName}`,
      new TableForeignKey({
        name: 'CandidateTechnologyTechnology',
        columnNames: ['technology_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'technologies',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey(
    //   `${this.tableName}`,
    //   'CandidateTechnologyTechnology',
    // );

    // await queryRunner.dropForeignKey(
    //   `${this.tableName}`,
    //   'CandidateTechnologyCandidate',
    // );

    await queryRunner.dropTable(`${this.tableName}`);
  }
}
