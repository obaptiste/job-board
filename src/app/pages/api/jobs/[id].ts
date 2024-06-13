import React from 'react';

// src/pages/api/jobs/[id].ts

// job applications component

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { jobId } = req.query;
    const job = await prisma.job.findUnique({
        where: {
            id: Number(jobId),
        },
        include: {
            applications: {
                include: {
                    applicant: true,
                    status: true
                },
            },
        }
    });

    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job.applications);
    res.status(200).json(job);
}
// Path: src/pages/api/jobs/[id].ts