import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeSessionEntity1642421994543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('session');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`session\` (\`id\` varchar(36) NOT NULL, \`expiresAt\` date NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` ADD CONSTRAINT \`FK_3d2f174ef04fb312fdebd0ddc53\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
