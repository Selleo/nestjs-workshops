import {MigrationInterface, QueryRunner} from "typeorm";

export class addPasswordSaltAndHashToUser1642405072644 implements MigrationInterface {
    name = 'addPasswordSaltAndHashToUser1642405072644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`salt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hash\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hash\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`salt\``);
    }

}
