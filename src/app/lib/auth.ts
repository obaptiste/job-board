import bcrypt from 'bcrypt';
import prisma from './prisma';

export const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const { name, email, password } = data;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Find the 'Applicant' role
    const applicantRole = await prisma.role.findUnique({
        where: {
            name: 'APPLICANT',
        },
    });

    if (!applicantRole) {
        throw new Error('Applicant role not found');
    }


    // Create a new user in the database
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: {
                connect: {
                    id: applicantRole.id,
                },
            },
        },
    });

    return user;
};
