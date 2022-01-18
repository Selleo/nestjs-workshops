import { MigrationInterface, QueryRunner } from 'typeorm';

export class renamePictureUrlColumnInUser1642496916592
  implements MigrationInterface
{
  name = 'renamePictureUrlColumnInUser1642496916592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`pictureUrl\` \`picture_url\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`picture_url\` \`pictureUrl\` varchar(255) NULL`,
    );
  }
}
