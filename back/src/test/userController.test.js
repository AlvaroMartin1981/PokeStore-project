const User = require("../models/UserModel");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const app = require('../config/firebase');
const UserController = require('../controllers/userController');

jest.mock('../models/UserModel', () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn()
}));

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn()
}));

const mockUser = { _id: 1, email: 'test@example.com', password: 'password', role: 'user' };

describe('UserController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user', async () => {
            User.create.mockResolvedValue(mockUser);

            const req = { body: { email: 'test@example.com', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await UserController.register(req, res);

            expect(User.create).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password', role: 'user' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith({ message: 'Usuario registrado con éxito', user: mockUser });
        });

        it('should handle validation errors', async () => {
            const req = { body: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await UserController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ message: 'Por favor, proporcione un correo electrónico y una contraseña válidos.' });
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error registering user');
            User.create.mockRejectedValue(mockError);

            const req = { body: { email: 'test@example.com', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await UserController.register(req, res);

            expect(User.create).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password', role: 'user' });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ message: 'Error al registrar el usuario' });
        });
    });

    describe('login', () => {
        it('should login the user', async () => {
            const req = { body: { email: 'test@example.com', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await UserController.login(req, res);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
        });

        // Add more test cases for login function
    });

    describe('logout', () => {
        it('should logout the user', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await UserController.logout(req, res);

            expect(signOut).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
        });

        // Add more test cases for logout function
    });

    describe('getInfo', () => {
        it('should get user information', async () => {
            User.findById.mockResolvedValue(mockUser);

            const req = { user: { _id: 1 } };
            const res = {
                send: jest.fn()
            };

            await UserController.getInfo(req, res);

            expect(User.findById).toHaveBeenCalledWith(1);
            expect(res.send).toHaveBeenCalledWith(mockUser);
        });

        
    });
});
