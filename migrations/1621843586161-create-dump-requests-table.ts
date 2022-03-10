import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDumpRequestsTable1621843586161
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS dump_requests (
            id int NOT NULL AUTO_INCREMENT,
            service varchar(255) NOT NULL,
            status enum ('Completed', 'Terminated', 'Pending', 'Downloaded') NOT NULL DEFAULT 'Pending',
            file varchar(255) NULL,
            reason varchar(255) NULL,
            createdAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updatedAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            PRIMARY KEY(\`id\`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `dump_requests`');
  }
}
