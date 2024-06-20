const Order = require('../modules/order');

const updateOrderStatus = (orderId, newStatus) => {
    return Order.findByIdAndUpdate(orderId, {
        shippingStatus: newStatus,
        $push: { statusHistory: { status: newStatus } }
    }, { new: true })
        .exec()
        .then(updatedOrder => {
            if (!updatedOrder) {
                throw new Error('Order not found');
            }
            console.log('Order updated:', updatedOrder);
            return updatedOrder;
        })
        .catch(err => {
            console.error('Error updating order status:', err);
            throw err;
        });
};
