import expresss from 'express';
import { test } from '../controllers/user.controller.js';
const router = expresss.Router();

router.get('/test',test);
export default router;