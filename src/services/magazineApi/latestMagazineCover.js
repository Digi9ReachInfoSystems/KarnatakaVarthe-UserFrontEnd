const MONTH_ORDER = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

/**
 * Returns magazineThumbnail of the latest approved magazine, or null.
 * @param {Array} magazines
 * @returns {string|null}
 */
export function getLatestMagazineThumbnail(magazines) {
  if (!Array.isArray(magazines) || magazines.length === 0) return null;

  const approved = magazines.filter((mag) => mag.status === "approved");
  if (approved.length === 0) return null;

  const sorted = [...approved].sort((a, b) => {
    const yearA = Number(a.publishedYear) || 0;
    const yearB = Number(b.publishedYear) || 0;
    if (yearA !== yearB) return yearB - yearA;

    const monthA = MONTH_ORDER[a.publishedMonth] || 0;
    const monthB = MONTH_ORDER[b.publishedMonth] || 0;
    return monthB - monthA;
  });

  const thumbnail = sorted[0]?.magazineThumbnail;
  return typeof thumbnail === "string" && thumbnail.trim() ? thumbnail.trim() : null;
}
