import { CreateNotificationRequest, NotificationType } from "src/generated/notification";

export class CreateNotificationDto implements CreateNotificationRequest{
    postId: string;
    userId: string;
    notifType: NotificationType;
}
