import { MigrationInterface, QueryRunner } from 'typeorm';

export class Start1730692232455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        CREATE TABLE users(
            id            INT AUTO_INCREMENT PRIMARY KEY,
            tax_id        VARCHAR(11) UNIQUE NOT NULL,
            name          VARCHAR(100)       NOT NULL,
            is_admin      BOOLEAN            DEFAULT FALSE,
            password      VARCHAR(200),
            external_id    VARCHAR(100),

            created_at    DATETIME                   DEFAULT CURRENT_TIMESTAMP,
            updated_at    DATETIME                   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            removed_at    DATETIME
        );

        INSERT INTO users (tax_id, name, is_admin, password, external_id)
        VALUES ('61033267023', 'admin', true, '6f00bbe26477cf4780b1d0abf3b20028:83184c79bba0d39f50cce2bee7bce34696d0c12cb4cffecac1463334cc8a918e5234f8f7f98a80170be7f41cc541244989b8ce7358e5f86caad3958087f2afcb', 'cus_000005219613');

        CREATE TABLE IF NOT EXISTS billing(
            id            INT AUTO_INCREMENT PRIMARY KEY,
            user_id       INT NOT NULL REFERENCES users (id),
            external_id   VARCHAR(100),
            status        VARCHAR(100),
            object        VARCHAR(100),
            value         DECIMAL(10,2),
            net_value     DECIMAL(10,2),
            original_value DECIMAL(10,2),
            due_date      DATETIME,
            billing_type  VARCHAR(100),

            created_at    DATETIME                   DEFAULT CURRENT_TIMESTAMP,
            updated_at    DATETIME                   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            removed_at    DATETIME
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS users;
  `);
  }
}
