import express from 'express';
import { validate } from '../middleware/validate';
import asyncHandler from 'express-async-handler';
import { Tts } from '@webonjour/util-interface';
import { textToSpeech } from '../controllers/tts.controller';

const ttsRouter = express.Router();

// Register user route
ttsRouter.get(
  '/:text/:slow',
  validate(Tts.ttsSchema),
  asyncHandler(textToSpeech)
);

export default ttsRouter;
