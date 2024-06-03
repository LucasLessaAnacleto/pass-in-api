import { prisma } from "../src/lib/prisma.ts";
import { faker } from "@faker-js/faker";

async function seed() {
    const eventId = "2197ef89-7dfc-4082-b85c-522abe26443d";
    try{
        await prisma.event.create({
            data: {
                id: eventId,
                title: "nlw unite",
                details: "Um evento para apaixonados em programação",
                slug: "nlw-unite",
                maximumAttendees: 200
            }
        });
    }catch(err){
        console.info(err)
    }
    
    
    await Promise.all( Array.from( {length: 121}, async() => {
        let attendeeId = faker.number.int({min: 100, max: 1000000});

        await prisma.attendee.create({
            data: {
                id: attendeeId,
                name: faker.person.fullName(),
                email: faker.internet.email(),
                createdAt: faker.date.recent({ days: 30 }),
                eventId
            }
        });
        if(Math.random() < 0.67){
            await prisma.checkIn.create({
                data: {
                    attendeeId,
                    createdAt: faker.date.recent({ days: 7 }),
                }
            });
        }
    }) )
}

seed().then(() => {
    console.log("Database seeded!");
    prisma.$disconnect();
})