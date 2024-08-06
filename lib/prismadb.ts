// lib/prismadb.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Vermeidung von mehrfacher Deklaration von Prisma-Client im globalen Namespace
  var prisma: PrismaClient | undefined;
}

// Initialisiere PrismaClient nur einmal während der Entwicklungszeit
const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Setze die Prisma-Client-Instanz in die globale Variable, um mehrfaches Erstellen zu verhindern
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
