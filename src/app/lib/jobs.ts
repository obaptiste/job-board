import prisma from "./prisma";
import { getSession } from 'next-auth/react';

export const createJob = async (data: {
    title: string;
    company: string;
    location: string;
    description: string;
    salary?: number;
}) => {
    const session = await getSession();
    if (!session) {
        throw new Error('You must be logged in to create a job listing.');
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!
        },
        include: {
            role: true
        },
    });

    if (!user || user.role.name !== 'HIRING_MANAGER') {
        throw new Error('You do not have permission to create job listings.');
    }

    const job = await prisma.job.create({
        data: {
            title: data.title,
            salary: data.salary ?? 0,
            description: data.description,
            location: data.location,
            company: data.company,
            creatorId: user.id,
        },
    });

    return job;
};

// jobs.ts
export const getJobs = async () => {
    const jobs = await prisma.job.findMany();
    return jobs;
};