"use client";
import useStore from "@/store";
import {useUser} from "@clerk/nextjs";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {motion} from "motion/react";
import {Check} from "lucide-react";
const SuccessPage = () => {
  const {user} = useUser();
  const {resetCart} = useStore();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const orderNumber = searchParams.get("orderNumber");
  useEffect(() => {
    if (session_id) {
      resetCart();
    }
  }, [session_id, resetCart]);
  return (
    <div className="py-5 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center mx-4">
      <div>
        <motion.div
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{delay: 0.2, type: "spring", stiffness: 200}}
          className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Check className="text-white w-10 h-10" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <div className="space-y-4 mb-4 text-left">
          <p className="text-gray-700">
            Thank you for your purchase. We&apos;re processing your order and
            will ship it soon. A confirmation email with your order details will
            be sent to your inbox shortly.
          </p>
          <p className="text-gray-700">
            Order Number:
            <span className="text-black font-semibold ">{orderNumber}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
