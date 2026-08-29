"use client";

import { useEffect } from "react";

interface InArticleAdProps {
  slotId: string;
  className?: string;
}

export default function InArticleAd({
  slotId,
  className = "",
}: InArticleAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense execution error:", err);
    }
  }, []);

  if (process.env.NODE_ENV === "development") {
    return (
      <div
        className={`my-8 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-center text-xs text-slate-400 font-mono ${className}`}
      >
        [AdSense Unit Preview Slot: {slotId}]
      </div>
    );
  }

  return (
    <div className={`my-8 overflow-hidden text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
      />
    </div>
  );
}
