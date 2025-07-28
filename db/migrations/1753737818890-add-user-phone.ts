import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhone1753737818890 implements MigrationInterface {
    name = 'AddUserPhone1753737818890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "twoFASecret" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "enable2FA" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "apiKey" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "apiKey"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "enable2FA"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twoFASecret"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
