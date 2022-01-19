import {MigrationInterface, QueryRunner} from "typeorm";

export class addUniqueIndexOnFlowAndFilenameInPdfFiles1642592123258 implements MigrationInterface {
    name = 'addUniqueIndexOnFlowAndFilenameInPdfFiles1642592123258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f3388515780484b09c85153bfd\` ON \`pdf_file\` (\`flowId\`, \`filename\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f3388515780484b09c85153bfd\` ON \`pdf_file\``);
    }

}
