import { Processor, WorkerHost } from "@nestjs/bullmq";
import { NOTIF_QUEUE_NAME, UPDATE_NOTIF_BY_USER } from "./notif.bull.constants";
import { Job } from "bullmq";
import { NotificationService } from "../notification.service";
import { IUser } from "./notif.bull.interfaces";

@Processor(NOTIF_QUEUE_NAME)
export class notifBullProcessor extends WorkerHost {

    constructor(
        private readonly notifService: NotificationService,
    ) {
        super()
    }

    async process(job: Job, token?: string): Promise<any> {
        if(job.name === UPDATE_NOTIF_BY_USER) {
            return this.notifService.updateNotifByUser(job.data as IUser)
        }
    }
}