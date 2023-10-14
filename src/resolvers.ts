import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        GetEventById: async (_: any, { UUID }) => {
            console.log(UUID);
            UUID = Number(UUID);
            return await prisma.entrys.findUniqueOrThrow({
                where: {
                    UUID: UUID,
                },
            });
        },
        GetEvents: () => {
            return prisma.entrys.findMany();
        },
        VerifyUser: async (_: any, { user } ) => {
            const hash = await prisma.users.findUnique({
                where: {
                    username:  user.username
                }
            });
            const result = await bcrypt.compare(user.password, hash.password);
            if (result) {
                return true;
            } else {
                return false;
            }
        }
    },

    Mutation: {
        AddEvent: async (_: any, { entry }) => {
            console.log(entry);
            return prisma.entrys
                .create({ data: entry })
                .then(() => {
                    console.log("sucess");
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                });
        },
        UpdateEvent: async (_: any, { entry }) => {
            console.log(entry);
            entry.UUID = Number(entry.UUID);
            return await prisma.entrys
                .update({
                    where: {
                        UUID: entry.UUID,
                    },
                    data: entry,
                })
                .then(() => {
                    console.log("sucess");
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                });
        },
        DeleteEvent: async (_: any, { UUID }) => {
            return await prisma.entrys
                .delete({
                    where: {
                        UUID: Number(UUID),
                    },
                })
                .then(() => {
                    console.log("sucess");
                    return true;
                })
                .catch(() => {
                    console.log("error");
                    return false;
                });
        },
        AddUser: async (_: any, { user }) => {
            return await prisma.users.create({
                data: {
                    username: user.username,
                    password: await bcrypt.hash(user.password, 10), 
                }
            }).then(() => {
                console.log("created user successfully");
                return true;
            }).catch((err) => {
                console.log("error creating user" + err);
                return false;
            });
        },
    },
};
