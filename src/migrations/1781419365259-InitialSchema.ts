import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1781419365259 implements MigrationInterface {
    name = 'InitialSchema1781419365259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contract_type" ("id" SERIAL NOT NULL, "long_name" character varying NOT NULL, "short_name" character varying NOT NULL, "code" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_81571d09e5be06a0ea8fda145e8" UNIQUE ("code"), CONSTRAINT "PK_07d20d769c7b0de44f6367bab1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document_type" ("id" SERIAL NOT NULL, "long_name" character varying NOT NULL, "short_name" character varying NOT NULL, "character_count" integer NOT NULL, "code" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8736291c18c1dda6cb8918bbc19" UNIQUE ("code"), CONSTRAINT "PK_2e1aa55eac1947ddf3221506edb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "system_role" ("id" SERIAL NOT NULL, "long_name" character varying NOT NULL, "short_name" character varying NOT NULL, "code" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7863c91c56002bec4910375af03" UNIQUE ("code"), CONSTRAINT "PK_708183b4a8d53f3b34d778c8031" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "create_user_request" ("id" SERIAL NOT NULL, "first_names" character varying NOT NULL, "last_names" character varying NOT NULL, "document_number" character varying NOT NULL, "position" character varying NOT NULL, "ticket_id" integer NOT NULL, "document_type_id" integer NOT NULL, "contract_type_id" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2ad34f83201bf59aee6948cb176" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "priority" ("id" SERIAL NOT NULL, "short_name" character varying NOT NULL, "long_name" character varying NOT NULL, "emoji" character varying NOT NULL, "value" integer NOT NULL, "code" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b7851bd2cff11435acb7b55f1f" UNIQUE ("code"), CONSTRAINT "PK_413921aa4a118e20f361ceba8b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request_type" ("id" SERIAL NOT NULL, "short_name" character varying NOT NULL, "long_name" character varying NOT NULL, "code" character varying NOT NULL, "emoji" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b55d2dadff30625c0a14264ab73" UNIQUE ("code"), CONSTRAINT "PK_ea486e08f500f3500119900a477" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "state" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "is_terminal" boolean NOT NULL, "flow_order" integer, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_674a683ae959c1416104d17d20e" UNIQUE ("code"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "support_mode" ("id" SERIAL NOT NULL, "short_name" character varying NOT NULL, "long_name" character varying NOT NULL, "code" character varying NOT NULL, "emoji" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bee11b3c63b57ede5ede8f34216" UNIQUE ("code"), CONSTRAINT "PK_e20ae0fb85c1327a27735c59b2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technical_support_request" ("id" SERIAL NOT NULL, "ticket_id" integer NOT NULL, "support_mode_id" integer NOT NULL, "speciality" character varying, "office_number" character varying, "problem_description" character varying NOT NULL, "contact_phone" character varying, "anydesk_code" character varying, "preferred_support_date" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0ec2eee4eea0dea73e21ba342a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_reassign_request" ("id" SERIAL NOT NULL, "ticket_id" integer NOT NULL, "ticket_numbers" text NOT NULL, "new_responsible" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0ef6a9c89f86f75eb0dc55b222b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "must_change_password" boolean NOT NULL DEFAULT false, "email" character varying, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "state_id" integer NOT NULL, "request_type_id" integer NOT NULL, "priority_id" integer NOT NULL, "user_id" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2ebff7c458ed09689a53242fec3" UNIQUE ("code"), CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "voucher_action_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1a77a8895d9f98136a15bda3b3f" UNIQUE ("code"), CONSTRAINT "PK_3d8c9170489c695ae08f4fefb82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "voucher_request" ("id" SERIAL NOT NULL, "ticket_id" integer NOT NULL, "voucher_action_type_id" integer NOT NULL, "voucher_code" character varying NOT NULL, "speciality" character varying, "motive" character varying, "attachment_key" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d46be3d271596a021c7f456a18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-problem-request" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "problem_description" character varying NOT NULL, "system_name" character varying NOT NULL, "affected_module" character varying NOT NULL, "ticket_id" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2a18d28fa5eb0156039a4a302db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_state_history" ("id" SERIAL NOT NULL, "ticket_id" integer NOT NULL, "state_id" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d94d1504e965eb4a7b36d417dcf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_comment" ("id" SERIAL NOT NULL, "ticket_id" integer NOT NULL, "user_id" integer, "author_type" character varying NOT NULL, "message" text NOT NULL, "read_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_375385ad29b177463987f0a14a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "push_subscription" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "endpoint" character varying NOT NULL, "p256dh_key" character varying NOT NULL, "auth_key" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_27ae9074fc39a09bc1aee263df5" UNIQUE ("endpoint"), CONSTRAINT "PK_07fc861c0d2c38c1b830fb9cb5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "create_user_request_system_role" ("create_user_request_id" integer NOT NULL, "system_role_id" integer NOT NULL, CONSTRAINT "PK_79139add098173da4957fb57ff1" PRIMARY KEY ("create_user_request_id", "system_role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c3392299915de641ee42dc3a87" ON "create_user_request_system_role" ("create_user_request_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5ef967081afc0f5fd15954915b" ON "create_user_request_system_role" ("system_role_id") `);
        await queryRunner.query(`ALTER TABLE "create_user_request" ADD CONSTRAINT "FK_3c2eff930fe45fd75260898afa7" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "create_user_request" ADD CONSTRAINT "FK_fe61ba80e7d05df376dc350ea91" FOREIGN KEY ("document_type_id") REFERENCES "document_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "create_user_request" ADD CONSTRAINT "FK_8869f058f2ab83f6a0c1a21a143" FOREIGN KEY ("contract_type_id") REFERENCES "contract_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technical_support_request" ADD CONSTRAINT "FK_1dc84dee7bed28282be1138a0f8" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technical_support_request" ADD CONSTRAINT "FK_78c71c693808122fb0883979747" FOREIGN KEY ("support_mode_id") REFERENCES "support_mode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_reassign_request" ADD CONSTRAINT "FK_80396cde12a64c4d9aa8ee85932" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_bbb4e2b183f650ca18ab7e12782" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_6e0a9774583c84145852d14138b" FOREIGN KEY ("request_type_id") REFERENCES "request_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_33198c2a1727df734589a69790b" FOREIGN KEY ("priority_id") REFERENCES "priority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_368610dc3312f9b91e9ace40354" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voucher_request" ADD CONSTRAINT "FK_ae19b21d0ebd95750fd50d88db4" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voucher_request" ADD CONSTRAINT "FK_646833a4469d51b5ed468278ce4" FOREIGN KEY ("voucher_action_type_id") REFERENCES "voucher_action_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-problem-request" ADD CONSTRAINT "FK_b949b6ad4d7866faacfee838441" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_state_history" ADD CONSTRAINT "FK_ea6c26c1541a04e25e9569fc24b" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_state_history" ADD CONSTRAINT "FK_1c4e5363425f45d4b22101ed4f3" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_comment" ADD CONSTRAINT "FK_8297608adb992a89a532f09405e" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_comment" ADD CONSTRAINT "FK_c0e99b5c2daea330b6f0cfe04f5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "create_user_request_system_role" ADD CONSTRAINT "FK_c3392299915de641ee42dc3a876" FOREIGN KEY ("create_user_request_id") REFERENCES "create_user_request"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "create_user_request_system_role" ADD CONSTRAINT "FK_5ef967081afc0f5fd15954915b7" FOREIGN KEY ("system_role_id") REFERENCES "system_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "create_user_request_system_role" DROP CONSTRAINT "FK_5ef967081afc0f5fd15954915b7"`);
        await queryRunner.query(`ALTER TABLE "create_user_request_system_role" DROP CONSTRAINT "FK_c3392299915de641ee42dc3a876"`);
        await queryRunner.query(`ALTER TABLE "ticket_comment" DROP CONSTRAINT "FK_c0e99b5c2daea330b6f0cfe04f5"`);
        await queryRunner.query(`ALTER TABLE "ticket_comment" DROP CONSTRAINT "FK_8297608adb992a89a532f09405e"`);
        await queryRunner.query(`ALTER TABLE "ticket_state_history" DROP CONSTRAINT "FK_1c4e5363425f45d4b22101ed4f3"`);
        await queryRunner.query(`ALTER TABLE "ticket_state_history" DROP CONSTRAINT "FK_ea6c26c1541a04e25e9569fc24b"`);
        await queryRunner.query(`ALTER TABLE "user-problem-request" DROP CONSTRAINT "FK_b949b6ad4d7866faacfee838441"`);
        await queryRunner.query(`ALTER TABLE "voucher_request" DROP CONSTRAINT "FK_646833a4469d51b5ed468278ce4"`);
        await queryRunner.query(`ALTER TABLE "voucher_request" DROP CONSTRAINT "FK_ae19b21d0ebd95750fd50d88db4"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_368610dc3312f9b91e9ace40354"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_33198c2a1727df734589a69790b"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_6e0a9774583c84145852d14138b"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_bbb4e2b183f650ca18ab7e12782"`);
        await queryRunner.query(`ALTER TABLE "ticket_reassign_request" DROP CONSTRAINT "FK_80396cde12a64c4d9aa8ee85932"`);
        await queryRunner.query(`ALTER TABLE "technical_support_request" DROP CONSTRAINT "FK_78c71c693808122fb0883979747"`);
        await queryRunner.query(`ALTER TABLE "technical_support_request" DROP CONSTRAINT "FK_1dc84dee7bed28282be1138a0f8"`);
        await queryRunner.query(`ALTER TABLE "create_user_request" DROP CONSTRAINT "FK_8869f058f2ab83f6a0c1a21a143"`);
        await queryRunner.query(`ALTER TABLE "create_user_request" DROP CONSTRAINT "FK_fe61ba80e7d05df376dc350ea91"`);
        await queryRunner.query(`ALTER TABLE "create_user_request" DROP CONSTRAINT "FK_3c2eff930fe45fd75260898afa7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5ef967081afc0f5fd15954915b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3392299915de641ee42dc3a87"`);
        await queryRunner.query(`DROP TABLE "create_user_request_system_role"`);
        await queryRunner.query(`DROP TABLE "push_subscription"`);
        await queryRunner.query(`DROP TABLE "ticket_comment"`);
        await queryRunner.query(`DROP TABLE "ticket_state_history"`);
        await queryRunner.query(`DROP TABLE "user-problem-request"`);
        await queryRunner.query(`DROP TABLE "voucher_request"`);
        await queryRunner.query(`DROP TABLE "voucher_action_type"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "ticket_reassign_request"`);
        await queryRunner.query(`DROP TABLE "technical_support_request"`);
        await queryRunner.query(`DROP TABLE "support_mode"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "request_type"`);
        await queryRunner.query(`DROP TABLE "priority"`);
        await queryRunner.query(`DROP TABLE "create_user_request"`);
        await queryRunner.query(`DROP TABLE "system_role"`);
        await queryRunner.query(`DROP TABLE "document_type"`);
        await queryRunner.query(`DROP TABLE "contract_type"`);
    }

}
