import { Router } from 'express';
import { createRoom } from '../controllers/rooms.controller.js';
import auth from '../middleware/auth.middleware.js';

const roomRouter = Router();

roomRouter.post('/', auth, createRoom);

export default roomRouter;
