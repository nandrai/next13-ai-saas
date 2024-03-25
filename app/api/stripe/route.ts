import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const { packageName }: any = (await req.json()) || null;

    if (packageName === "Plus") {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price: "price_1Oy8qTJ9LPevMgKdDUpH8kOK",
            quantity: 1,
          },
        ],
        metadata: {
          userId: userId,
          subscriptionType: "Plus",
        },
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    if (packageName === "Pro") {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price: "price_1Oy8zFJ9LPevMgKdN92EGVeJ",
            quantity: 1,
          },
        ],
        metadata: {
          userId: userId,
          subscriptionType: "Pro",
        },
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    if (packageName === "Enterprise") {
      return new NextResponse(
        JSON.stringify({ url: "mailto:nandrai4444@gmail.com" })
      );
    }
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
