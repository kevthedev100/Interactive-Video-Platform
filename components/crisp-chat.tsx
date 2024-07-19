"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a5dcc67a-14bd-47d8-8e16-f343ca1e7649");
  }, []);

  return null;
};
