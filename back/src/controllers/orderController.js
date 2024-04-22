const Order = require("../models/OrderModel.js");
const User = require("../models/UserModel.js");

const orderController = {
  async create(req, res) {
    try {
      const order = await Order.create({
        ...req.body,
        status: "pending",
        deliveryDate: new Date().setDate(new Date().getDate() + 2),
        userId: req.user._id,
      });

      if (!order) {
        return res.status(500).send({ message: "Error al crear la orden" });
      }

      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        $push: { orderIds: order._id },
      });

      if (!updatedUser) {
        return res.status(500).send({ message: "Error al actualizar el usuario" });
      }

      res.status(201).send(order);
    } catch (error) {
      console.error("Error al crear la orden:", error);
      res.status(500).send({ message: "Error interno del servidor" });
    }
  },

  async update(req, res) {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params._id,
        { ...req.body, userId: req.user._id },
        { new: true }
      );

      if (!order) {
        return res.status(404).send({ message: "Orden no encontrada" });
      }

      if (order.userId !== req.user._id.toString()) {
        return res.status(403).send({ message: "No tienes permiso para actualizar esta orden" });
      }

      res.send({ message: "Orden actualizada correctamente", order });
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
      res.status(500).send({ message: "Error interno del servidor" });
    }
  },
};

module.exports = orderController;
