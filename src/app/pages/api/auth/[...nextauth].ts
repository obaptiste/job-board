import NextAuth, { RequestInternal, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

interface MyUser extends User {
    id: string;
    email: string;
    password: string;
    name: string;
    roleId: number;
    roleName: string;
}

// Function to map role ID to role name
const mapRoleIdToRoleName = (roleId: number): string => {
    // Replace this with your own logic to map the role ID to the role name
    if (roleId === 1) {
        return 'hiring_manager';
    } else if (roleId === 2) {
        return 'applicant';
    } else {
        return 'visitor';
    }
};

export default NextAuth({
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials: Record<string, string> | undefined, req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>) {
                const { email, password } = credentials || {};

                // Check if the user exists
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) {
                    throw new Error('UserNotFound');
                }

                // Check if the password is correct
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error('InvalidPassword');
                }

                // Convert the user object to the expected format
                const authUser: MyUser = {
                    id: user.id.toString(),
                    email: user.email,
                    password: user.password,
                    name: user.name,
                    roleId: user.roleId,
                    roleName: '',
                };

                // Map the role ID to the role name
                authUser.roleName = mapRoleIdToRoleName(user.roleId);

                // Return the authUser object
                return authUser;
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
});