import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Onboarding() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Clear the onboarding cookie and redirect to home
    // document.cookie = "onboarding=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    navigate("/", { replace: true });
  }

  return (
    <div className="i flex h-full min-h-svh w-full flex-col">
      <main className="relative mx-auto flex w-full max-w-lg flex-1 flex-grow">
        <div className="w-full flex-col items-start justify-center space-y-6 py-20">
          <Logo />

          <div className="space-y-0">
            <h1 className="text-3xl font-bold">Hello!</h1>
            <p className="text-muted-foreground text-base">
              Let&apos;s set up your account in just a few clicks.
            </p>
          </div>

          <div className="flex w-full flex-col items-center justify-center space-y-6">
            <Card className="relative w-full space-y-5 rounded-xl p-4">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">1. Enter your details</h2>
                <p className="text-muted-foreground text-sm">
                  Provide your phone number, Aadhaar, and PAN to continue.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter Aadhaar number"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pan">PAN Card</Label>
                  <Input
                    id="pan"
                    type="text"
                    placeholder="Enter PAN"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    className="uppercase"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-md">
                  Continue
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
