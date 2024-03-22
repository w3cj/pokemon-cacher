import express from 'express';
import Redis from 'ioredis';
import env from '../env';

const router = express.Router();

const redis = new Redis({
  port: env.REDIS_PORT,
  host: env.REDIS_HOST,
  username: env.REDIS_USERNAME,
  password: env.REDIS_PASSWORD,
});

router.get<{ pokemon_name: string }>(
  '/:pokemon_name',
  async (req, res, next) => {
    try {
      const { pokemon_name } = req.params;
      let cached = await redis.get(pokemon_name);
      let status = await redis.get(pokemon_name + '-status');
      if (!cached || !status) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`,
        );
        cached = await response.text();
        status = response.status.toString();
        await redis.set(pokemon_name + '-status', status);
        await redis.set(pokemon_name, cached);
      }

      if (status !== '200') {
        res.set('content-type', 'text/plain');
      } else {
        res.set('content-type', 'application/json');
      }
      res.status(Number(status));
      res.send(cached);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
