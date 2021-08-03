import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItems1627950256738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "items",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "switched",
            type: "boolean",
            isNullable: false,
            default: false,
          },
          {
            name: "date_turn_on",
            type: "timestamp with time zone",
            isNullable: true,
          },
          {
            name: "date_turn_off",
            type: "timestamp with time zone",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("items");
  }
}
