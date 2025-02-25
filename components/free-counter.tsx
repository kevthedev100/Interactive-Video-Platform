import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";

export const FreeCounter = ({
  isPro = false,
}: {
  isPro: boolean,
}) => {
  const [countdown, setCountdown] = useState(0);
  const proModal = useProModal();

  useEffect(() => {
    // Definiert das Startdatum
    const startDate = new Date(2025, 1, 24); // 5. März 2024, Monate sind 0-basiert
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Startdatum + 7 Tage

    const updateCountdown = () => {
      const now = new Date();
      // @ts-ignore
      const timeLeft = endDate - now;
      const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

      if (daysLeft >= 0) {
        setCountdown(daysLeft);
      } else {
        setCountdown(0); // Hält den Countdown bei 0, auch wenn das Datum überschritten wurde
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isPro) {
    return null;
  }

  // Berechnet den Fortschritt in Prozent für die verstrichene Zeit
  const progressValue = (countdown / 7) * 100;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4">
            {/* Bedingung für die Anzeige der Nachricht */}
            {countdown > 0 ? (
              <p className="mb-2">
                Noch {countdown} Tage kostenlos verfügbar
              </p>
            ) : (
              <p className="mb-2">
                Testzeitraum abgelaufen
              </p>
            )}
            {/* Fortschrittsbalken */}
            <div className="w-full bg-red-500" style={{ marginBottom: '8px', height: '20px', borderRadius: '5px' }}>
              <div className="bg-green-500 h-full" style={{ width: `${progressValue}%`, borderRadius: '5px' }}></div>
            </div>
          </div>
          <Button onClick={proModal.onOpen} variant="premium" className="w-full">
            Abonnieren
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
