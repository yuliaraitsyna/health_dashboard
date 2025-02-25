export type User = {
    id: string;
    email: string;
    createdAt: Date;
}

export type HeartRateData = {
    id: number;
    hr: number;
    date: Date;
    user: User;
}

export type HeartRateVariabilityData = {
    sdnn: number;
    rmssd: number;
}