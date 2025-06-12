import { GetNotificationsRequest } from "src/generated/notification";

export class GetNotificationsDto implements GetNotificationsRequest {
    userId: string;
}