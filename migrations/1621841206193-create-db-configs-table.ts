import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDbConfigsTable1621841206193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS db_configs (
        id int NOT NULL AUTO_INCREMENT,
        service varchar(255) NOT NULL,
        type varchar(255) NOT NULL,
        host varchar(255) NOT NULL,
        port int NOT NULL,
        password varchar(255) NOT NULL,
        username varchar(255) NOT NULL,
        db varchar(255) NOT NULL,
        createdAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX\`IDX_64c46ce79eee86ae821782a0ca\`(\`service\`),
        PRIMARY KEY(\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `db_configs`');
  }
}
