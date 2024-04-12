import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";
import { NotFound } from "./_errors/not-found";

export async function getEventAttendees(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .get("/events/:eventId/attendees", {
        schema: {
            summary: "Get an event attendees",
            tags: ["attendees"],
            params: z.object({
                eventId: z.string(),
            }),
            querystring: z.object({
                pageIndex: z.string().nullish().default("0").transform(Number),
                query: z.string().nullish().default("")
            }),
            response: {
                200: z.object({
                    attendees: z.array(
                        z.object({
                            id: z.number().int(),
                            name: z.string(),
                            email: z.string().email(),
                            createdAt: z.date(),
                            checkedInAt: z.date().nullable()
                        }
                    )),
                    totalAttendees: z.number().int()
                })
            },
        }
    }, async(request, reply) => {
        const { eventId } = request.params;
        let { pageIndex, query } = request.query;

        if( pageIndex < 1 ) pageIndex = 0;

        const [
            attendees, 
            totalAttendees
        ] = await Promise.all([
        prisma.attendee.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                checkIn: {
                    select: {
                        createdAt: true
                    },
                }
            },
            where: {
                eventId,
                name: {
                    contains: query!
                }
            },
            take: 10,
            skip: (pageIndex || 0) * 10,
            orderBy: {
                createdAt: "desc"
            }}),
            prisma.attendee.count({
                where: { 
                    eventId,
                    name: {
                        contains: query!
                    } 
                }
            })
        ]);

        if(attendees === null)
            throw new NotFound("The 'eventId' sent does not refer to any existing event");

        return reply.send({
            attendees: attendees.map(attendee => {
                return {
                    id: attendee.id,
                    name: attendee.name,
                    email: attendee.email,
                    createdAt: attendee.createdAt,
                    checkedInAt: attendee.checkIn?.createdAt ?? null
                }   
            }),
            totalAttendees: totalAttendees || 0
        });
    })
}