import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, In, Repository } from "typeorm";
import { Notification } from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { GetNotificationsDto } from "./dto/get-notification.dto";
import { CreateNotificationRequest, DeleteNotificationsRequest, DeleteNotificationsResponse, GetNotificationsResponse, MarkAsReadNotificationRequest, MarkAsReadNotificationsRequest, Notification as ProtoNotification } from "src/generated/notification";
import { notificationTypeFromJSON } from "src/generated/notification_enum";

@Injectable()
export class NotificationReposotory extends Repository<Notification> {
    constructor(
        data: DataSource
    ) {
        super(Notification, data.createEntityManager());
    }

    async createNotif(data: CreateNotificationRequest) {
        try {
            const notif = this.create(data);
            const saved = await this.save(notif);

            return saved;
        } catch (err) {
            console.error('Create notification error: ', err)
            throw err
        }
    }

    async getNotif(data: GetNotificationsDto): Promise<GetNotificationsResponse> {
        try {
            const notifList = await this.find({
                where: {
                    receiverId: data.userId
                },
                order: {
                    createdAt: 'DESC'
                }
            });

            const formatedNotifList: ProtoNotification[] = notifList.map((notif: Notification) => ({
                id: notif.id,
                postId: notif.postId,
                creatorId: notif.creatorId,
                creatorAvtUrl: notif.creatorAvtUrl,
                receiverId: notif.receiverId,
                notifType: notificationTypeFromJSON(notif.notifType),
                message: notif.message,
                isRead: notif.isRead,
                createdAt: !!notif.createdAt ? notif.createdAt.toISOString() : '',
                deletedAt: !!notif.deletedAt ? notif.deletedAt.toISOString() : '',
            }))

            return {
                notifications: formatedNotifList
            } as GetNotificationsResponse;
        } catch (err) {
            console.error('Get notification error: ', err)
            throw err
        }
    }
    async deleteNotif(data: DeleteNotificationsRequest) {
        try {
            const resq = await this.softRemove({
                id: data.id
            })

            // const notifResp: DeleteNotificationsResponse = {
            //     notifications: {
            //         id: resq.id,
            //         postId: resq.postId,
            //         creatorId: resq.creatorId,
            //         creatorAvtUrl: resq.creatorAvtUrl,
            //         receiverId: resq.receiverId,
            //         notifType: resq.notifType,
            //         message: resq.message,
            //         createdAt: resq.createdAt.toISOString(),
            //         deletedAt: resq.deletedAt.toISOString(),
            //     }
            // }

            // return notifResp

            return resq
        } catch (err) {
            console.error('Delete notif error in notif service: ', err)
            throw err
        }
    }

    async updateNotif(data: Notification) {
        try {
            const resq = await this.save(data)

            return resq
        } catch (err) {
            console.error('Update notif err: ', err)
            throw err
        }
    }

    async updateNotifs(data: Notification[]) {
        try {
            const resq = await this.save(data)

            return resq
        } catch (err) {
            console.error('Update notif err: ', err)
            throw err
        }
    }

    async markAsReadNotif(data: MarkAsReadNotificationRequest): Promise<Notification> {
        try {
            const notif = await this.findOne({
                where: {
                    id: data.id
                }
            })

            if (!notif) {
                console.error('Can not find notif with id: ', data.id)
                throw new NotFoundException('Can not find notif with id: ', data.id)
            }

            if (notif.isRead === true) {
                console.error('Notif already read!')
                throw new BadRequestException('Notif already read!')
            }

            notif.isRead = true

            const saved = await this.updateNotif(notif)

            return saved
        } catch (err) {
            console.error('Mark as read notif err: ', err)
            throw err
        }
    }

    async markAsReadNotifs(data: MarkAsReadNotificationsRequest): Promise<Notification[]> {
        try {
            const notifs = await this.find({
                where: {
                    id: In(data.ids)
                }
            })

            if (!notifs) {
                console.error('Can not find notifs with ids: ', data.ids)
                throw new NotFoundException('Can not find notifs with ids: ')
            }
            
            const updated = notifs.map((notif) => ({
                ...notif,
                isRead: true,
            }))

            const saved = await this.save(updated)

            return saved;
        } catch (err) {
            console.error('Mark as read notif err: ', err)
            throw err
        }
    }

    async findById(id: string) {
        return this.findOne({
            where: {
                id: id
            }
        })
    }

    async findByCreatorId(creatorId: string) {
        return this.find({
            where: {
                creatorId: creatorId
            }
        })
    }
}