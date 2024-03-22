import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import pokemon from './pokemon';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/pokemon/', pokemon);

export default router;
