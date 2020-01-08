const express = require("express");
const router = express.Router();


// Load Order model
const Order = require("../../models/Order");

router.post('/', (req, res) => {
    const user = req.body.user;
    const orderTotal = req.body.total;
    const deliveryStatus = req.body.status;
    const dateCreated = Date.now();
    const items = [];

    for (var i=0;i< req.body.items.length;i++) {
        const item = {
            productID: req.body.items[i].productID,
            productName: req.body.items[i].productName,
            productPrice: req.body.items[i].productPrice,
            quantity: req.body.items[i].quantity
        }
        items.push(item);
    };
    console.log(items);
    Order.create({
        user: user,
        orderTotal: orderTotal,
        dateCreated: dateCreated,
        deliveryStatus: deliveryStatus,
        items: items
    })
        .then(() => res.end());
});

router.get('/', (req, resu) => {
    Order.find({ user: req.query.id }, function (err, result) {
        if (err) throw err;
        console.log(result);
        return (resu.send(result));
    })
});

router.delete('/', (req, res) => {
    Order.findByIdAndRemove(req.query.id)
        .then(() => res.end())
        .catch((err) => res.send(err));
});

module.exports = router;