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
        },
    });

    return application;
};

const uploadResume = async (resume: File): Promise<string> => {
    // Logic for uploading the resume to a file storage service
    // return the url of the uploaded resume
    return 'https://example.com/resume.pdf';
};
