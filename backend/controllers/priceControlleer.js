import Stripe from 'stripe';
import userModel from '../models/user.js';

const paymentController = async (req, res) => {
    try {

        const { planId } = req.body;

        const plans = {
            Basic: {
                price: 50,
                credits: 10,
            },

            Advanced: {
                price: 100,
                credits: 50,
            },

            Business: {
                price: 150,
                credits: 100,
            },


        }

        const selectedPlan = plans[planId];
        if (!selectedPlan) return res.status(400).json({ error: 'Invalid plan ID' });

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',

                        product_data: {
                            name: `Buy ${selectedPlan.credits} credits`,
                        },
                        unit_amount: selectedPlan.price * 100,
                    },
                    quantity: 1,
                },
            ],

            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
            metadata: {
                clerkId: req.user,         // From your auth middleware
                credits: selectedPlan.credits.toString(),
            }
        });

        res.json({ url: session.url });

    } catch (error) {
        console.log("error in paymentController", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

const addCredit = async (req, res) => {

    try {

        const clerkId = req.user

        const user = await userModel.findOne({ clerkId });

        res.status(200).json({ success: true, message: 'Credits updated', creditBalance: user.creditBalance });

    } catch (error) {

        console.log("error in addCredit", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

const stripeWebhook = async (req, res) => {
    console.log("📩 Webhook endpoint hit");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('⚠️ Webhook signature verification failed:', err.message);
        return res.status(400).json({ success: false, message: "Webhook signature verification failed." });

    }

    // Handle successful checkout session

    try {
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // Get metadata
            const clerkId = session.metadata.clerkId;
            const credits = Number(session.metadata.credits);

            console.log("✅ Payment success webhook for:", clerkId, credits);

            if (clerkId && credits) {
                await userModel.findOneAndUpdate(
                    { clerkId },
                    { $inc: { creditBalance: credits } }
                );
            }
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.log("Error processing Stripe webhook:", error.message);
        return res.status(500).json({ success: false });
    }
};

export { paymentController, addCredit, stripeWebhook }