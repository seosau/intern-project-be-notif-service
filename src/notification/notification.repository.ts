import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Notification } from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { GetNotificationsDto } from "./dto/get-notification.dto";
import { CreateNotificationRequest } from "src/generated/notification";

@Injectable()
export class NotificationReposotory extends Repository<Notification> {
    constructor(
        data: DataSource
    ) {
        super(Notification, data.createEntityManager());
    }

    async createNotif(data: CreateNotificationRequest) {
        try{
            const notif = this.create(data);
            const saved = await this.save(notif);

            return saved;
        } catch(err) {
            console.error('Create notification error: ', err)
            throw err
        }
    }

    async getNotif(data: GetNotificationsDto) {
        try{
            const notifList = await this.find({
                where: {
                    userId: data.userId
                }
            });

            return notifList;
        } catch(err) {
            console.error('Get notification error: ', err)
            throw err
        }
    }
}