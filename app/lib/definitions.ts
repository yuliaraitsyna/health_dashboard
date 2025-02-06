export type User = {
    id: number;
    username: string;
}

export type HeartRateRecord = {
    id: number;
    heartRate: number;
    date: Date;
    user: User;
}