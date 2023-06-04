import express from 'express';
import { validateSplit } from '../middleware/validate';
import asyncHandler from 'express-async-handler';
import { Tts } from '@webonjour/util-interface';
import { textToSpeech } from '../controllers/tts.controller';
import { paramsParser } from '../middleware/requestPreParsers';

const ttsRouter = express.Router();

// Register user route
ttsRouter.post(
  '/',
  validateSplit(undefined, undefined, Tts.ttsSchema),
  asyncHandler(textToSpeech)
);

export default ttsRouter;
