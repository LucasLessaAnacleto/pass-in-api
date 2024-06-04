import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors, { OriginFunction } from "@fastify/cors";

import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import { errorHandler } from "./error-handler";

const app = fastify();

app.register(fastifySwagger, {
    swagger: {
        consumes: ["application/json"],
        produces: ["application/json"],
        info: {
            title: "pass.in",
            description: "Específicações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rockeatseat",
            version: "1.0.0"
        }
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
    routePrefix: "/docs"
});

const corsFunction: OriginFunction = function(origin, cb) {
    if([
        'https://pass-in-ivory.vercel.app',
        'https://pass-in-git-main-lucas-lessa-anacletos-projects.vercel.app',
        'https://pass-erj1ti9dp-lucas-lessa-anacletos-projects.vercel.app'
    ].includes(origin || "")){
        cb(null, true);
    }else if(/^http[s]?:\/\/localhost:(.)*$/.test(origin || "")){
        cb(null, true);
    }else{
        cb(null, false);
    }
};
app.register(fastifyCors, {
    origin: corsFunction
})

app.setSerializerCompiler( serializerCompiler );
app.setValidatorCompiler( validatorCompiler );

app.register( createEvent );
app.register( registerForEvent );
app.register( getEvent );
app.register( getAttendeeBadge );
app.register( checkIn );
app.register( getEventAttendees );

app.setErrorHandler( errorHandler );

const port = parseInt(process.env.PORT!);
app.listen({ port: port || 3333, host: "0.0.0.0" }).then(() => {
    console.log("HTTP server running!")
});

