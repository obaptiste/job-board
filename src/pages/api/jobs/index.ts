// pages/api/jobs/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../app/lib/prisma';

// Update your Job type if the `company` is an object
type Job = {
    id: number;
    title: string;
    description: string;
    company: string; // Assume Company is another type you have defined
    salary: number;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    creatorId: number;
};

type Data = {
    jobs: Job[];
} | {
    error: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        try {
            // Fetch jobs with the company data included
            const jobs: Job[] = await prisma.job.findMany({
                where: {
                    title: {
                        contains: Array.isArray(req.query.search) ? req.query.search[0] : req.query.search,  // Case-insensitive search
                    },
                },

            });
            // Send the jobs array wrapped in an object as per the Data type
            res.status(200).json({ jobs });
        } catch (error) {
            // Return an error object if there's an exception
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        // Return a 405 error if the method is not GET
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: 'Method not allowed' });
    }
}
