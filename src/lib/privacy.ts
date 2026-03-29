export const PRIVACY_PREFERENCES_STORAGE_KEY = "cosmic-privacy-preferences";

export interface PrivacyPreferences {
  necessary: true;
  analytics: boolean;
  personalization: boolean;
  saleOfData: boolean;
  updatedAt: string;
}

export const defaultPrivacyPreferences = (): PrivacyPreferences => ({
  necessary: true,
  analytics: false,
  personalization: false,
  saleOfData: false,
  updatedAt: new Date().toISOString(),
});

export const readPrivacyPreferences = (rawValue: string | null): PrivacyPreferences => {
  if (!rawValue) {
    return defaultPrivacyPreferences();
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<PrivacyPreferences>;

    return {
      necessary: true,
      analytics: parsed.analytics === true,
      personalization: parsed.personalization === true,
      saleOfData: parsed.saleOfData === true,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return defaultPrivacyPreferences();
  }
};
