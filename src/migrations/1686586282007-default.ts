import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1686586282007 implements MigrationInterface {
    name = 'Default1686586282007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "role" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "role"`);
    }

}
