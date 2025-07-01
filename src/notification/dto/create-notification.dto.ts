import { CreateNotificationRequest } from "src/generated/notification";
import { NotificationType } from "src/generated/notification_enum";

export class CreateNotificationDto implements CreateNotificationRequest{
    postId: string;
    creatorId: string;
    creatorAvtUrl: string;
    receiverId: string;
    notifType: NotificationType;
    message: string;
}
