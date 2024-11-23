const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const Stripe = require('stripe')

const app = express()

app.use(cors())
app.use(express.json({ limit: "10mb" }))

const PORT = process.env.PORT || 8080

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Database"))
    .catch((error) => console.log(error))

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
    cart: {
        type: Array,
        default: []
    }
})

const userModel = mongoose.model("user", userSchema)

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

const productModel = mongoose.model("product", productSchema)

app.get("/", (req, res) => {
    res.send("Server is running")
})

// Register API
app.post("/register", async (req, res) => {
    const { email } = req.body

    try {
        const result = await userModel.findOne({ email: email });

        if (result) {
            res.send({ message: "Email id is already registered", alert: false });
        } else {
            const data = new userModel(req.body);
            const savedData = await data.save();
            res.send({ message: "Registered Successfully", alert: true });
        }
    } catch (error) {
        res.status(500).send({ message: "Error occurred during registration", alert: false });
    }
});

//Login API
app.post("/login", async (req, res) => {
    const { email } = req.body
    const result = await userModel.findOne({ email: email });

    if (result) {
        const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            image: result.image,
        }
        res.send({ message: "Login successfully", alert: true, data: dataSend });
    } else {
        res.send({ message: "Email is not registered, Please Register", alert: false });
    }
})

app.post("/uploadProduct", async (req, res) => {
    const data = new productModel(req.body);
    const savedData = await data.save();
    res.send({ message: "Uploaded Successfully" })
})

app.get("/product", async (req, res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

// Get user cart
app.get("/user/:userId", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user cart" });
    }
});

// Verify payment and cart status
app.post("/verify-payment", async (req, res) => {
    const { userId } = req.body;
    
    try {
        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        if (user.cart.length === 0) {
            return res.json({ success: true, message: "Payment verified and cart is empty" });
        } else {
            await userModel.findByIdAndUpdate(userId, { cart: [] });
            return res.json({ success: true, message: "Payment verified and cart cleared" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ success: false, message: "Error verifying payment" });
    }
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/checkout-payment", async (req, res) => {
    const { userId, productCartItem } = req.body;

    try {
        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [{ shipping_rate: "shr_1PaYNUCCputDw3HDfnSg7GbY" }],

            line_items: productCartItem.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                },
                quantity: item.qty,
            })),

            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }

        const session = await stripe.checkout.sessions.create(params);
        await userModel.findByIdAndUpdate(userId, { cart: [] });
        res.status(200).json({ id: session.id });
    }
    catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message })
    }
})

app.listen(PORT, () => console.log("Server listening on port " + PORT))