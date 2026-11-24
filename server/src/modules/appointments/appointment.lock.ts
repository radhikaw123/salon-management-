import { redisClient } from '../../config/redis';

export class DistributedLock {
  static async acquireSlotLock(
    salonId: string,
    staffId: string,
    dateString: string,
    ttlSeconds = 10
  ): Promise<boolean> {
    const lockKey = `lock:salon:${salonId}:staff:${staffId}:${dateString}`;
    // SET lockKey 'locked' NX EX ttlSeconds
    const result = await redisClient.set(lockKey, 'locked', 'EX', ttlSeconds, 'NX');
    return result === 'OK';
  }

  static async releaseSlotLock(
    salonId: string,
    staffId: string,
    dateString: string
  ): Promise<void> {
    const lockKey = `lock:salon:${salonId}:staff:${staffId}:${dateString}`;
    await redisClient.del(lockKey);
  }
}
