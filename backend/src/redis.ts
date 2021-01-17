import Redis from 'ioredis';

const {
    REDIS_PORT = '6379',
    REDIS_HOST = '127.0.0.1',
    REDIS_PASS = 'secret4redis',
} = process.env;

export const redis = new Redis({
    port: parseInt(REDIS_PORT),
    host: REDIS_HOST,
    family: 4,
    password: REDIS_PASS,
    db: 0,
});
