const authController = require("./controllers/auth-controller");
const orderController = require("./controllers/order-controller");
const paymentController = require("./controllers/payment-controller");
const productController = require("./controllers/product-controller");
const userController = require("./controllers/user-controller");
const authenticate = require("./middlewares/authenticate");

const router = require("express").Router();

// AUTH ROUTE
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/refresh", authController.refresh);
router.get("/auth/logout", authenticate, authController.logout);

// USER ROUTE
router.put("/user/update", authenticate, userController.updateUser);
router.get("/user/:id", authenticate, userController.getUser);
router.get("/users/", authenticate, userController.getUsers);
router.delete("/user/delete/:id", authenticate, userController.removeUser);
router.get("/auth/stats", authenticate, authController.getUserStats);
router.put(
  "/user/update/password/:id",
  authenticate,
  userController.resetPassword
);
router.put(
  "/user/forget-password",
  userController.forgotPassword
);

// PRODUCT ROUTE
router.post("/product/create", authenticate, productController.productCreate);
router.put(
  "/product/update/:id",
  authenticate,
  productController.productUpdate
);
router.delete(
  "/product/delete/:id",
  authenticate,
  productController.productRemove
);
router.get("/product/:slug", productController.getProduct);
router.get("/products", productController.getProducts);

// ORDER ROUTE
router.post("/order/create", authenticate, orderController.orderCreate);
router.get("/orders", authenticate, orderController.getOrders);
router.get("/order/stats", authenticate, orderController.getStats);
router.get("/order/income", authenticate, orderController.getIncome);
router.post("/payment", authenticate, paymentController.payment);
router.get("/post-payment", authenticate, paymentController.post_payment);

module.exports = router;
