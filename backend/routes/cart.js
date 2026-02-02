import express from 'express';
import { getCartFoods, addCartFood, removeCartFood, updateCartQuantity } from '../controllers/cartController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticateToken);

router.get('/', getCartFoods);
router.post('/:foodId', addCartFood);
router.delete('/:foodId', removeCartFood);
router.put('/:foodId', updateCartQuantity);

export default router;