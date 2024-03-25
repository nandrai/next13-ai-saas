import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";
import { SubscriptionButton } from "./subscription-button";

export const FreeCounter = ({
  isPro = false,
  apiLimitCount = 0,
  limit = 5,
}: {
  isPro: boolean;
  apiLimitCount: number;
  limit: number;
}) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // if (isPro) {
  //   return null;
  // }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {limit} {!isPro && "Free"} Generations
            </p>
            <Progress className="h-3" value={(apiLimitCount / limit) * 100} />
          </div>
          <div className="flex justify-center">
            <SubscriptionButton isPro={isPro} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
