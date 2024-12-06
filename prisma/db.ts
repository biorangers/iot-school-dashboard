import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export function getValue(key: number) {
  return prisma.data.findUnique({
    where: {
      key,
    },
  });
}

export function setValue(key: number, value: unknown) {
  return prisma.data.upsert({
    where: {
      key,
    },
    update: {
      value: JSON.stringify(value),
    },
    create: {
      key,
      value: JSON.stringify(value),
    },
  });
}
