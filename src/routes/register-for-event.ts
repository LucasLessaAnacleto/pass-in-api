import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function registerForEvent(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>()
    .post("/events/:eventId/attendees", {
        schema: {
            summary: "Register an attendee",
            tags: ["attendees"],
            body: z.object({
                name: z.string().min(3),
                email: z.string().email(),
            }),
            params: z.object({
                eventId: z.string().uuid()
            }),
            response: {
                201: z.object({
                    attendeeId: z.number().int()
                })
            }
        }
    }, async (request, reply) => {
        const { eventId } = request.params;
        const { name, email } = request.body;
        
        const attendeeRegisteredInThisEvent = await prisma.attendee.findUnique({
            where: {
                eventId_email: {
                    email,
                    eventId
                }
            }
        });

        if(attendeeRegisteredInThisEvent !== null)
            throw new BadRequest("This attendee is already registered for this event");

        const [
            amountAttendeesForEvent, 
            event
        ] = await Promise.all([
            prisma.attendee.count({
                where: {
                    eventId,
                }
            }), 
            prisma.event.findUnique({
                where: {
                    id: eventId,
                },
                select: {
                    maximumAttendees: true,
                }
            })
        ]);

        if(!event)
            throw new BadRequest("The participant cannot register for an event that does not exist")

        if( event?.maximumAttendees && amountAttendeesForEvent >= event?.maximumAttendees )
            throw new BadRequest("The event has no more places available");

        const attendee = await prisma.attendee.create({
            data: {
                name,
                email,
                eventId
            }
        });

        return reply.status(201).send({ attendeeId: attendee.id })
    })
}