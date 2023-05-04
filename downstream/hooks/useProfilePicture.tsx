import React, { useEffect, useState } from "react";
import { useAppState } from "./useAppState";

const API_URL = (seed: String) =>
  `https://api.dicebear.com/6.x/pixel-art/svg?seed=${seed}`;

function hashProfile(s: string): String {
  const hash = s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  return hash.toString();
}

export function useProfilePicture() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { profileViewState } = useAppState();
  const { userId } = profileViewState;

  useEffect(() => {
    if (userId) {
      const hash = hashProfile(userId);
      setProfilePicture(API_URL(hash));
    }
  }, [userId]);

  return profilePicture;
}
