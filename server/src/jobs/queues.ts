import { Queue } from 'bullmq';
import { redisClient } from '../config/redis';

// BullMQ Queues for Background Tasks (Reminders & Daily Closing Digest)
export const reminderQueue = new Queue('appointment-reminders', {
  connection: redisClient,
});

export const dailyClosingQueue = new Queue('daily-closing-digest', {
  connection: redisClient,
});
