/** Cross-component exclusive media playback on the homepage hero. */
export const MEDIA_PLAY_EVENT = "dipr:media-play";

export const MEDIA_SOURCES = {
  LIVE_TV: "live-tv",
  HERO_SHORTS: "hero-shorts",
};

export function announceMediaPlay(source) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(MEDIA_PLAY_EVENT, { detail: { source } })
  );
}

export function onOtherMediaPlay(ownSource, handler) {
  const listener = (event) => {
    const source = event?.detail?.source;
    if (!source || source === ownSource) return;
    handler(source);
  };
  window.addEventListener(MEDIA_PLAY_EVENT, listener);
  return () => window.removeEventListener(MEDIA_PLAY_EVENT, listener);
}
