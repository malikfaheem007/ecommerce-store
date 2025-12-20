import {Metadata} from "@/actions/createCheckoutSession";
import stripe from "@/lib/sripe";
import {backendClient} from "@/sanity/lib/backendClient";
import {headers} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {Stripe} from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();

  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      {error: "No signature found for stripe"},
      {status: 400}
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      {error: "Stripe webhook secret is not set"},
      {status: 400}
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.log("Webhook signature verification failed.", error);
    return NextResponse.json({error: `Webhook Error: ${error}`}, {status: 400});
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const invoice =
      session.invoice ?
        await stripe.invoices.retrieve(session.invoice as string)
      : null;
    console.log("console 14");

    try {
      console.log("console 15");

      await createOrderInSanity(session, invoice);
    } catch (error) {
      console.log("console 16");

      console.error("Error Creating order in sanity:", error);
      return NextResponse.json(
        {error: `Error creating order : ${error}`},
        {status: 400}
      );
    }
    console.log("console 17");

    return NextResponse.json({received: true}, {status: 200});
  }
}
console.log("console 18");

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  console.log("console 19");

  const {id, amount_total, currency, metadata, payment_intent, total_details} =
    session;
  console.log("console 20");

  const {orderNumber, customerName, customerEmail, clerkUserId, address} =
    metadata as unknown as Metadata & {address: string};
  console.log("console 21");

  const parsedAddress = address ? JSON.parse(address) : null;
  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {expand: ["data.price.product"]}
  );
  console.log("console 22");

  //Create Sanity product references and prepare stock updates
  const sanityProducts = [];
  const stockUpdates = [];
  console.log("console 23");

  for (const item of lineItemsWithProduct.data) {
    console.log("console 24");

    const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
    const quantity = item.quantity || 0;
    console.log("console 25");

    if (!productId) continue;
    console.log("console 26");

    sanityProducts.push({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity,
    });
    console.log("console 27");

    stockUpdates.push({productId, quantity});
    console.log("console 28");
  }
  //Create order in Sanity
  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    clerkUserId: clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount:
      total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice:
      invoice ?
        {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : null,
    address:
      parsedAddress ?
        {
          state: parsedAddress.state,
          zip: parsedAddress.zip,
          city: parsedAddress.city,
          address: parsedAddress.address,
          name: parsedAddress.name,
        }
      : null,
  });
  console.log("console 29");

  // Update stock levels in Sanity
  await updateStockLevels(stockUpdates);
  console.log("console 30");

  return order;
}

// Function to update stock levels
async function updateStockLevels(
  stockUpdates: {productId: string; quantity: number}[]
) {
  console.log("console 31");

  for (const {productId, quantity} of stockUpdates) {
    try {
      console.log("console 32");

      // Fetch current stock
      const product = await backendClient.getDocument(productId);
      console.log("console 33");

      if (!product || typeof product.stock !== "number") {
        console.warn(
          `Product with ID ${productId} not found or stock is invalid.`
        );
        console.log("console 34");

        continue;
      }
      console.log("console 35");

      const newStock = Math.max(product.stock - quantity, 0); //Ensure stock does not go negative
      console.log("console 36");

      // Update stock in Sanity
      await backendClient.patch(productId).set({stock: newStock}).commit();
      console.log("console 37");
    } catch (error) {
      console.log("console 38");

      console.error(`Failed to update stock for product  ${productId}:`, error);
    }
  }
  console.log("console 39");
}
