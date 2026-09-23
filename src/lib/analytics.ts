export function trackScrollMilestone(sectionId: string, milestone: string) {
  // If a global tracking function is available (e.g. Plausible or Google Analytics), fire it.
  if (typeof window !== "undefined") {
    // Example: (window as any).plausible?.("Scroll Milestone", { props: { section: sectionId, step: milestone } });
    console.debug(`[Analytics] Scroll Milestone Reached: ${sectionId} - ${milestone}`);
  }
}
