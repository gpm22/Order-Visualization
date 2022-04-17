const orders = require("./data/orders.json");
const sellers = require("./data/sellers.json");

const getSellerName = (sellerId) =>
    sellers.filter((seller) => seller.id === sellerId)[0].name;

module.exports = {
  orders: orders.map((order) => {
    return {
      ...order,
      seller: getSellerName(order.seller),
    };
  }),
  sellers,
};
