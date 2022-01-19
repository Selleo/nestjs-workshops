import {MigrationInterface, QueryRunner} from "typeorm";

export class addSettingsToUser1642607993456 implements MigrationInterface {
    name = 'addSettingsToUser1642607993456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`settings\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`settings\``);
    }

}
