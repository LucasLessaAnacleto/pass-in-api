import { FastifyInstance } from "fastify";
import { BadRequest } from "./routes/_errors/bad-request";
import { NotFound } from "./routes/_errors/not-found";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({
            error: {
                code: 400,
                status: "Bad Request",
                message: `Error validating request`,
                fields: error.flatten().fieldErrors
            }
        })
    }

    if(error instanceof NotFound){
        return reply.status(404).send({ error: { code: 404, status: "Not Found", message: error.message } })
    }

    if(error instanceof BadRequest){
        return reply.status(400).send({ error: { code: 400, status: "Bad Request",message: error.message } })
    }

    return reply.status(500).send({ error: { code: 500, status: "Internal Server Error!", message: error.message } })
}