import {MigrationInterface, QueryRunner} from "typeorm";

export class addPdfFileEntity1642590756671 implements MigrationInterface {
    name = 'addPdfFileEntity1642590756671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pdf_file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`filename\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`state\` enum ('uploaded', 'pending', 'failed_upload') NOT NULL DEFAULT 'pending', \`flowId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pdf_file\` ADD CONSTRAINT \`FK_16b3445fa40e67e572a68e7eb47\` FOREIGN KEY (\`flowId\`) REFERENCES \`flow\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pdf_file\` DROP FOREIGN KEY \`FK_16b3445fa40e67e572a68e7eb47\``);
        await queryRunner.query(`DROP TABLE \`pdf_file\``);
    }

}
