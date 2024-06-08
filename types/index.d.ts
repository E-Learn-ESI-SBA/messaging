import "fastify";

import { Consumer, Kafka, Producer } from "kafkajs";
import { UserClaims } from "./config.ts";
import {Server} from "socket.io";
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "../socket/events.js";
declare module "fastify" {
  interface FastifyInstance {
    kafka: Kafka;
    socket:Server<ClientToServerEvents,ServerToClientEvents,InterServerEvents,SocketData>
    consumer: Consumer;
    producer: Producer;
    config: {
      MONGO_URI: string;
      KAFKA_BROKER: string;
      JWT_SECRET: string;
      NODE_ENV: string;
      KAFKA_GROUP_ID: string;
      KAFKA_TOPIC: string;
    };
  }
  interface FastifyRequest {
    user: UserClaims;
  }
}
