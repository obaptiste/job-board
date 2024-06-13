//src/types/application.ts

export interface Application {
    id: number;
    jobId: number;
    applicantId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    applicant: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}