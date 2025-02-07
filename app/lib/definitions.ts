export type User = {
    id: string;
    email: string;
}

export type HeartRateRecord = {
    id: number;
    heartRate: number;
    date: Date;
    user: User;
}