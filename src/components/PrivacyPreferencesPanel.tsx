"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { PRIVACY_PREFERENCES_STORAGE_KEY, defaultPrivacyPreferences, readPrivacyPreferences, type PrivacyPreferences } from "@/lib/privacy";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface PrivacyPreferencesPanelProps {
  variant?: "full" | "do-not-sell";
}

const PrivacyPreferencesPanel = ({ variant = "full" }: PrivacyPreferencesPanelProps) => {
  const [preferences, setPreferences] = useState<PrivacyPreferences>(defaultPrivacyPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const nextPreferences = readPrivacyPreferences(window.localStorage.getItem(PRIVACY_PREFERENCES_STORAGE_KEY));
    setPreferences(nextPreferences);
    setIsLoaded(true);
  }, []);

  const persistPreferences = (nextPreferences: PrivacyPreferences, successMessage: string) => {
    setPreferences(nextPreferences);
    window.localStorage.setItem(PRIVACY_PREFERENCES_STORAGE_KEY, JSON.stringify(nextPreferences));
    toast.success(successMessage);
  };

  if (!isLoaded) {
    return <div className="rounded-3xl border bg-card p-8 text-sm text-muted-foreground shadow-sm">Loading your privacy preferences...</div>;
  }

  return (
    <div className="space-y-6 rounded-3xl border bg-card p-8 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="rounded-full bg-primary/10 p-2 text-primary">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Privacy Preference Center</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Your selections are stored locally in this browser so you can control analytics, personalization, and data-sharing preferences from the storefront.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border bg-background p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">Strictly necessary</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Required to keep the storefront, cart, and authentication flows working.
              </p>
            </div>
            <Switch checked disabled aria-label="Strictly necessary cookies are always enabled" />
          </div>
        </div>

        {variant === "full" ? (
          <>
            <div className="rounded-2xl border bg-background p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">Analytics</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Allow measurement tools to understand visits, content performance, and conversion trends.
                  </p>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences((current) => ({
                      ...current,
                      analytics: checked,
                      updatedAt: new Date().toISOString(),
                    }))
                  }
                  aria-label="Toggle analytics cookies"
                />
              </div>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">Personalization</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Allow content tailoring, saved preferences, and marketing relevance improvements.
                  </p>
                </div>
                <Switch
                  checked={preferences.personalization}
                  onCheckedChange={(checked) =>
                    setPreferences((current) => ({
                      ...current,
                      personalization: checked,
                      updatedAt: new Date().toISOString(),
                    }))
                  }
                  aria-label="Toggle personalization cookies"
                />
              </div>
            </div>
          </>
        ) : null}

        <div className="rounded-2xl border bg-background p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">Sale or sharing of personal information</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Keep this off to opt out of advertising-related sharing and similar disclosures under applicable law.
              </p>
            </div>
            <Switch
              checked={preferences.saleOfData}
              onCheckedChange={(checked) =>
                setPreferences((current) => ({
                  ...current,
                  saleOfData: checked,
                  updatedAt: new Date().toISOString(),
                }))
              }
              aria-label="Toggle sale or sharing of personal information"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {variant === "full" ? (
          <Button
            type="button"
            onClick={() => persistPreferences({ ...preferences, updatedAt: new Date().toISOString() }, "Cookie preferences saved.")}
          >
            Save Preferences
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() =>
              persistPreferences(
                {
                  ...preferences,
                  saleOfData: false,
                  updatedAt: new Date().toISOString(),
                },
                "Opt-out saved. Sale or sharing is now disabled for this browser.",
              )
            }
          >
            Confirm Opt-Out
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            persistPreferences(
              {
                necessary: true,
                analytics: false,
                personalization: false,
                saleOfData: false,
                updatedAt: new Date().toISOString(),
              },
              "Non-essential privacy preferences have been turned off.",
            )
          }
        >
          Reject Non-Essential
        </Button>
        {variant === "full" ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              persistPreferences(
                {
                  necessary: true,
                  analytics: true,
                  personalization: true,
                  saleOfData: true,
                  updatedAt: new Date().toISOString(),
                },
                "All privacy preferences have been enabled for this browser.",
              )
            }
          >
            Accept All
          </Button>
        ) : null}
      </div>

      <p className="text-xs text-muted-foreground">
        Last updated:{" "}
        {new Date(preferences.updatedAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
        . Review our <Link href="/privacy-policy" className="underline underline-offset-2">Privacy Policy</Link> for more detail.
      </p>
    </div>
  );
};

export default PrivacyPreferencesPanel;
