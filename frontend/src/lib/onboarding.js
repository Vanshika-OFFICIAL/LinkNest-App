const ONBOARDING_KEY_PREFIX = "linknest:onboarding-complete";

const getKey = (userId = "anonymous") => `${ONBOARDING_KEY_PREFIX}:${userId}`;

export const hasCompletedOnboarding = (userId) => {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(getKey(userId)) === "true";
};

export const completeOnboarding = (userId) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getKey(userId), "true");
};

export const resetOnboarding = (userId) => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(getKey(userId));
};
