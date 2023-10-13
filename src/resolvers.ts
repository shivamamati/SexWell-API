import { PrismaClient } from "@prisma/client";
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
    },
};
