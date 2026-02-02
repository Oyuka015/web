import express from 'express';
import { getSavedFoods, addToSaved,  removeFromSaved} from '../controllers/savedController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();
 
router.use(authenticateToken);

router.get('/', getSavedFoods);
router.post('/:foodId', addToSaved);
router.delete('/:foodId', removeFromSaved);

export default router;