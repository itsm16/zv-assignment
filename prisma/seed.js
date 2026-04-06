import {createHash} from 'crypto'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client.js'

const connectionString = process.env.DATABASE_URL || ''
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// config
const name = "admin"
const email = "admin@example.com"
const password = "admin@123"

const hashedPassword = (password)  => createHash("sha256").update(password).digest("hex")

async function main() {
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
        omit: {
            password: true,
            refreshToken: true,
        },
    });

    if(existingUser){
        console.error("User already exists");
        return;
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword(password),
            role: "ADMIN",
        },
    });

    console.log(user);
}

main()
.then(() => {
    console.log("\nSeed completed");
})
.catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
