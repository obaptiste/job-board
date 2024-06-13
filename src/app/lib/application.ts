import prisma from './prisma';
import { getSession } from 'next-auth/react';

export const createApplication = async (
    jobId: number,
    resume: File,
    coverLetter: string
) => {
    const session = await getSession();

    if (!session) {
        throw new Error('You must be logged in to apply for jobs');
    }
    else (session && session?.user)

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!,
        },
    });




    if (!user) {
        throw new Error('User not found');
    }

    const resumeUrl = await uploadResume(resume);

    const application = await prisma.application.create({
        data: {
            jobId,
            applicantId: user.id,
            resume: resumeUrl,
            coverLetter,
            statusId: 1
        },
        include: {
            job: true,
        },
    });

    return application;
};

export async function updateApplicationStatus(applicationId: number, statusName: string) {
    //First, find the applicationStatus record that matches the statusName
    const status = await prisma.applicationStatus.findFirst({
        where: {
            name: statusName,
        },
    });

    if (!status) {
        throw new Error(`Status '${statusName}' not found`);
    }

    const updatedApplication = await prisma.application.update({
        where: {
            id: applicationId,
        },
        data: {
            statusId: status.id,
        },
    });

    return updatedApplication;

}

const uploadResume = async (resume: File): Promise<string> => {
    // Logic for uploading the resume to a file storage service
    // return the url of the uploaded resume
    return 'https://example.com/resume.pdf';
};
