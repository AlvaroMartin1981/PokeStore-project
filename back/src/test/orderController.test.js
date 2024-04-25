const Order = require("../models/OrderModel.js");
const User = require("../models/UserModel.js");
const orderController = require('../controllers/orderController');

jest.mock("../models/OrderModel.js", () => ({
    create: jest.fn(),
    findByIdAndUpdate: jest.fn()
}));

jest.mock("../models/UserModel.js", () => ({
    findByIdAndUpdate: jest.fn()
}));

const mockUser = { _id: 1 };
const mockOrder = { _id: 1, status: 'pending', deliveryDate: new Date().setDate(new Date().getDate() + 2), userId: 1 };

describe('orderController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new order', async () => {
            Order.create.mockResolvedValue(mockOrder);
            User.findByIdAndUpdate.mockResolvedValue(mockUser);

            const req = { body: {}, user: { _id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await orderController.create(req, res);

            expect(Order.create).toHaveBeenCalledWith({ ...req.body, status: 'pending', deliveryDate: expect.any(Date), userId: 1 });
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(1, { $push: { orderIds: 1 } });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(mockOrder);
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error creating order');
            Order.create.mockRejectedValue(mockError);

            const req = { body: {}, user: { _id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await orderController.create(req, res);

            expect(Order.create).toHaveBeenCalledWith({ ...req.body, status: 'pending', deliveryDate: expect.any(Date), userId: 1 });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });

    describe('update', () => {
        it('should update an existing order', async () => {
            Order.findByIdAndUpdate.mockResolvedValue(mockOrder);

            const req = { params: { _id: 1 }, body: {}, user: { _id: 1 } };
            const res = {
                send: jest.fn()
            };

            await orderController.update(req, res);

            expect(Order.findByIdAndUpdate).toHaveBeenCalledWith(1, { ...req.body, userId: 1 }, { new: true });
            expect(res.send).toHaveBeenCalledWith({ message: 'Orden actualizada correctamente', order: mockOrder });
        });

        it('should handle order not found', async () => {
            Order.findByIdAndUpdate.mockResolvedValue(null);

            const req = { params: { _id: 1 }, body: {}, user: { _id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await orderController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ message: 'Orden no encontrada' });
        });

        it('should handle unauthorized update', async () => {
            const unauthorizedOrder = { ...mockOrder, userId: 2 };
            Order.findByIdAndUpdate.mockResolvedValue(unauthorizedOrder);

            const req = { params: { _id: 1 }, body: {}, user: { _id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await orderController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith({ message: 'No tienes permiso para actualizar esta orden' });
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error updating order');
            Order.findByIdAndUpdate.mockRejectedValue(mockError);

            const req = { params: { _id: 1 }, body: {}, user: { _id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await orderController.update(req, res);

            expect(Order.findByIdAndUpdate).toHaveBeenCalledWith(1, { ...req.body, userId: 1 }, { new: true });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });
});
