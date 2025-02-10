export type User = {
    id: string;
    email: string;
    createdAt: Date;
}

export type HeartRateData = {
    id: number;
    value: number;
    date: Date;
    user: User;
}