// Because Next API functions run in a serveless environment, we're going to cache our Prisma client and reuse it when possible to avoid having too many connections.

// Import the PrismaClient class from the "@prisma/client" package
import { PrismaClient } from "@prisma/client";

// Declare a "global" object, so that we can extend its type definition
declare global {
  // Disable the "no-var" rule from ESLint for the following line
  // eslint-disable-next-line no-var
  // Declare a new property "cachedPrisma" on the global object, with a type of PrismaClient
  var cachedPrisma: PrismaClient;
}

// Declare a variable named "prisma" with a type of PrismaClient
let prisma: PrismaClient;

// Check if the current environment is a production environment
if (process.env.NODE_ENV === "production") {
  // If it's a production environment, create a new instance of PrismaClient and assign it to the "prisma" variable
  prisma = new PrismaClient();
} else {
  // If it's not a production environment (e.g. development or testing)
  // Check if the "cachedPrisma" property on the global object is not yet defined
  if (!global.cachedPrisma) {
    // If "cachedPrisma" is not defined, create a new instance of PrismaClient
    // and assign it to the "cachedPrisma" property on the global object
    // This is to reuse the same PrismaClient instance across multiple invocations
    // in development and testing environments, improving performance
    global.cachedPrisma = new PrismaClient();
  }
  // Assign the "cachedPrisma" instance to the "prisma" variable
  prisma = global.cachedPrisma;
}

// Export the "prisma" variable as a named export "db"
export const db = prisma;
