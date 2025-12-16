import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('seller_channel', { schema: 'public' })
@Index('seller_channel_pk', ['id'])
export class SellerChannel  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ name: 'store_id', type: 'int', nullable: false })
    storeId: number;

    @Column({ name: 'seller_channel_code', type: 'varchar', length: 255, nullable: true })
    sellerChannelCode: string;

    @Column({ name: 'seller_channel_description', type: 'varchar', length: 255, nullable: true })
    sellerChannelDescription: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
    updatedAt: Date;

    @Column({name: 'confirmation_required', type: 'boolean', default: false })
    confirmationRequired: boolean;

    @Column({ name: 'seller_channel_name', type: 'varchar', length: 255, nullable: false })
    sellerChannelName: string;

    @Column({ name: 'company_name', type: 'varchar', length: 255, nullable: false })
    companyName: string;

}