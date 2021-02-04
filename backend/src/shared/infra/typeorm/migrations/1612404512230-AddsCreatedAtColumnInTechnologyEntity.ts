import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class AddsCreatedAtColumnInTechnologyEntity1612404512230
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'technologies',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('technologies', 'created_at');
  }
}
