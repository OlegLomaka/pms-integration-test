import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1699639114544 implements MigrationInterface {
    name = 'InitMigration1699639114544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`properties\` (
                \`id\` varchar(36) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`address\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`units\` (
                \`id\` varchar(36) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`roomNumber\` int NOT NULL,
                \`isDirty\` tinyint NOT NULL,
                \`isOccupied\` tinyint NOT NULL,
                \`unitGroupId\` varchar(255) NOT NULL,
                UNIQUE INDEX \`IDX_08f5a377996d32d638a24d0d18\` (\`roomNumber\`, \`unitGroupId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`rate-plan\` (
                \`id\` varchar(36) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`cancellationPolicy\` varchar(255) NOT NULL,
                \`rate\` json NOT NULL,
                \`unitGroupId\` varchar(36) NULL,
                UNIQUE INDEX \`REL_6e478bcd713b78c6870ddd5bfe\` (\`unitGroupId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`unit-groups\` (
                \`id\` varchar(36) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`amountOfUnits\` int NOT NULL,
                \`numberOfBeds\` int NOT NULL,
                \`numberOfFreeUnits\` int NOT NULL,
                \`restrictions\` json NOT NULL,
                \`propertyId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`ari-update\` (
                \`id\` varchar(36) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`unitGroupId\` varchar(255) NOT NULL,
                \`restrictions\` json NOT NULL,
                \`availability\` int NOT NULL,
                \`prices\` json NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`units\`
            ADD CONSTRAINT \`FK_8ac2eba3caa72db6ec477a87b10\` FOREIGN KEY (\`unitGroupId\`) REFERENCES \`unit-groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`rate-plan\`
            ADD CONSTRAINT \`FK_6e478bcd713b78c6870ddd5bfe1\` FOREIGN KEY (\`unitGroupId\`) REFERENCES \`unit-groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`unit-groups\`
            ADD CONSTRAINT \`FK_dab699bb0bd081f2cdfa89a6908\` FOREIGN KEY (\`propertyId\`) REFERENCES \`properties\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`unit-groups\` DROP FOREIGN KEY \`FK_dab699bb0bd081f2cdfa89a6908\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rate-plan\` DROP FOREIGN KEY \`FK_6e478bcd713b78c6870ddd5bfe1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`units\` DROP FOREIGN KEY \`FK_8ac2eba3caa72db6ec477a87b10\`
        `);
        await queryRunner.query(`
            DROP TABLE \`ari-update\`
        `);
        await queryRunner.query(`
            DROP TABLE \`unit-groups\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_6e478bcd713b78c6870ddd5bfe\` ON \`rate-plan\`
        `);
        await queryRunner.query(`
            DROP TABLE \`rate-plan\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_08f5a377996d32d638a24d0d18\` ON \`units\`
        `);
        await queryRunner.query(`
            DROP TABLE \`units\`
        `);
        await queryRunner.query(`
            DROP TABLE \`properties\`
        `);
    }

}
