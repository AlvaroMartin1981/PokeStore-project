const ProductoModel = require('../models/Producto');
const productController = require('../controllers/productController');

jest.mock('../models/Producto', () => ({
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn()
}));

describe('productController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return all products', async () => {
            const mockProducts = [{ id: 1, nombre: 'Producto 1' }, { id: 2, nombre: 'Producto 2' }];
            ProductoModel.find.mockResolvedValue(mockProducts);

            const req = {};
            const res = {
                json: jest.fn()
            };

            await productController.getAll(req, res);

            expect(ProductoModel.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockProducts);
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error getting products');
            ProductoModel.find.mockRejectedValue(mockError);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await productController.getAll(req, res);

            expect(ProductoModel.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error getting products' });
        });
    });

    describe('getById', () => {
        it('should return product by ID', async () => {
            const mockProduct = { id: 1, nombre: 'Producto 1' };
            ProductoModel.findById.mockResolvedValue(mockProduct);

            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn()
            };

            await productController.getById(req, res);

            expect(ProductoModel.findById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error getting product by ID');
            ProductoModel.findById.mockRejectedValue(mockError);

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await productController.getById(req, res);

            expect(ProductoModel.findById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error getting product by ID' });
        });

        it('should return 404 if product not found', async () => {
            ProductoModel.findById.mockResolvedValue(null);

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await productController.getById(req, res);

            expect(ProductoModel.findById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Producto no encontrado' });
        });
    });

    describe('getProductsByName', () => {
        it('should return product by name', async () => {
            const mockProduct = { id: 1, nombre: 'Producto 1' };
            ProductoModel.findOne.mockResolvedValue(mockProduct);

            const req = { params: { nombre: 'Producto 1' } };
            const res = {
                json: jest.fn()
            };

            await productController.getProductsByName(req, res);

            expect(ProductoModel.findOne).toHaveBeenCalledWith({ nombre: 'Producto 1' });
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error getting product by name');
            ProductoModel.findOne.mockRejectedValue(mockError);

            const req = { params: { nombre: 'Producto 1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await productController.getProductsByName(req, res);

            expect(ProductoModel.findOne).toHaveBeenCalledWith({ nombre: 'Producto 1' });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error getting product by name' });
        });
    });

    
});
