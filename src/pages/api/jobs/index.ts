// pages/api/jobs/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../app/lib/prisma';

type Job = {
    id: number;
    title: string;
    description: string;
    company: string;
    salary: number;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    creatorId: number;
};

type Data = { jobs: Job[] } | { error: string };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        try {
            const { search = '', filter = '' } = req.query;

            let whereClause = {};

            if (search) {
                whereClause = {
                    ...whereClause,
                    title: {
                        contains: Array.isArray(search) ? search[0] : search,
                        mode: 'insensitive',
                    },
                };
            }

            if (filter) {
                whereClause = {
                    ...whereClause,
                    type: Array.isArray(filter) ? filter[0] : filter,
                };
            }

            const jobs: Job[] = await prisma.job.findMany({
                where: whereClause,
            });

            res.status(200).json({ jobs });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: 'Method not allowed' });
    }
}