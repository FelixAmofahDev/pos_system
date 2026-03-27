const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

// Get all products (public)
router.get('/', ProductController.getAllProducts);

// Get product by barcode (POS)
router.get('/barcode/scan', ProductController.getProductByBarcode);

// Get all categories
router.get('/categories/list/all', ProductController.getAllCategories);

// Search products
router.get('/search', ProductController.searchProducts);

// Get products by category
router.get('/category/:categoryId', ProductController.getProductsByCategory);

// Get low stock products (manager/admin)
router.get('/stock/low', verifyToken, checkRole(['manager', 'admin']), ProductController.getLowStockProducts);

// Get single product
router.get('/:id', ProductController.getProductById);

// Create product (admin only)
router.post('/', verifyToken, checkRole(['admin']), ProductController.createProduct);

// Update product (admin only)
router.put('/:id', verifyToken, checkRole(['admin']), ProductController.updateProduct);

// Delete product (admin only)
router.delete('/:id', verifyToken, checkRole(['admin']), ProductController.deleteProduct);

module.exports = router;
