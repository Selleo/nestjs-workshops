import {MigrationInterface, QueryRunner} from "typeorm";

export class addFlowEntity1642499234189 implements MigrationInterface {
    name = 'addFlowEntity1642499234189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`flow\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`state\` enum ('draft', 'in_process', 'finished', 'cancelled') NOT NULL DEFAULT 'draft', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`flow\` ADD CONSTRAINT \`FK_ce1f9affcd86880e9160ce36e06\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`flow\` DROP FOREIGN KEY \`FK_ce1f9affcd86880e9160ce36e06\``);
        await queryRunner.query(`DROP TABLE \`flow\``);
    }

}
