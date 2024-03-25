"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { useProModal } from "@/hooks/use-pro-modal";

import { Button } from "@/components/ui/button";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isPro ? "default" : "premium"}
      disabled={loading}
      onClick={isPro ? onClick : proModal.onOpen}
      className="w-full"
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
