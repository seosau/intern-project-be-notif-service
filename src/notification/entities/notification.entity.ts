import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'uuid'})
    postId: string

    @Column({type: 'uuid'})
    userId: string

    @Column()
    notifType: number

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt: Date

}
