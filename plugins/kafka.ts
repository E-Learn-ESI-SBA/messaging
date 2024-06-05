import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Kafka, logLevel } from "kafkajs";

// add options also
const topic = "user-update";
export interface KafkaOptions {
  broker: string;
  groupId: string;
  clientId: string;
}
const kafkaPlugin: FastifyPluginAsync<KafkaOptions> = async (
  fastify,
  options,
) => {
  const kafka = new Kafka({
    clientId: options.clientId,
    brokers: [options.broker],
    logLevel: logLevel.ERROR,
  });
  const producer = kafka.producer();
  const consumer = kafka.consumer({ groupId: options.groupId });
  await Promise.all([producer.connect(), consumer.connect()]);

  fastify.decorate("kafka", kafka);
  fastify.decorate("consumer", consumer);
  fastify.decorate("producer", producer);
};

export default fp(kafkaPlugin);
