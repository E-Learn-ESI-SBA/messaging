import { JWTPayload } from "jose";
import { z } from "zod";

// Env Var Schema
export const ConfigSchema = {
    type: "object",
    required: ["JWT_SECRET", "MONGO_URI"],
    properties: {
        JWT_SECRET: {
            type: "string",
            default: "aTZ6czFOcTFHekRrZEJHUTB5cFlZZ0M1aXQyR3FiNlltaWx5aDJFUWpIQT0K",
        },
        NODE_ENV: {
            type: "string",
            default: "development",
        },
        MONGO_URI: {
            type: "string",
            default: "mongodb://localhost:27017",
        },
        KAFKA_GROUP_ID: {
            type: "string",
        },
        KAFKA_BROKER: {
            type: "string",
        },
        KAFKA_TOPIC: {
            type: "string",
            default: "notifications",
        },
    },
};

export interface UserClaims extends JWTPayload {
    avatar: string;
    email: string;
    exp: number;
    id: string;
    role: string;
    username: string;
    group: string;
    year: string;
}
/*
{"token_type": "access",
  "exp": 1718551400,
  "iat": 1715959400,
  "jti": "b3d943f6e8f049129573303fcca3ece4",
  "id": "f34c48ca-9404-4036-9026-917b4a1240e8",
  "avatar": "default",
  "username": "teacher",
  "email": "teacher@host.com",
  "role": "teacher",
  "group": "None",
  "year": "None"}

* */

export const UserClaimValidator = z.object({
    avatar: z.string(),
    email: z.string(),
    exp: z.number(),
    id: z.string(),
    role: z.string(),
    username: z.string(),
    group: z.string(),
    year: z.string(),
    jti: z.string().optional(),
    token_type: z.string().optional(),
    iat: z.number().optional(),

});