import { PrismaClient } from "@prisma/client/edge";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient();
  }
  prisma = global.__db__;
  prisma.$connect();
}

export { prisma };

// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: "prisma://aws-us-east-1.prisma-data.com/?api_key=T8r6vz0SFbQnIyLynu96Hj2SWHBQ_et5xHYvslf1ZmMWLKFK-4080bwMruzHU9Ss",
//     },
//   },
// });

// export { prisma };

// let db: PrismaClient;

// declare global {
//   var __db: PrismaClient | undefined;
// }

// // this is needed because in development we don't want to restart
// // the server with every change, but we want to make sure we don't
// // create a new connection to the DB with every change either.
// if (process.env.NODE_ENV === "production") {
//   db = new PrismaClient();
// } else {
//   if (!global.__db) {
//     global.__db = new PrismaClient();
//   }
//   db = global.__db;
// }

// export { db };
