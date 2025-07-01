import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'uuid'})
    postId: string

    @Column({type: 'uuid', nullable: true})
    creatorId: string

    @Column({type: 'uuid', nullable: true})
    receiverId: string

    @Column()
    notifType: number

    @Column({nullable: true})
    creatorAvtUrl: string

    @Column({nullable: true})
    message: string

    @Column({default: false})
    isRead: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

}
