import express from 'express';
import { validate } from '../middleware/validate';
import asyncHandler from 'express-async-handler';
import { ttsSchema } from '../schemas/tts.schema';
import { textToSpeech } from '../controllers/tts.controller';

const ttsRouter = express.Router();

// Register user route
ttsRouter.get('/:text/:slow', validate(ttsSchema), asyncHandler(textToSpeech));

export default ttsRouter;
