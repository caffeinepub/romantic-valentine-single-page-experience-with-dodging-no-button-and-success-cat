# Specification

## Summary
**Goal:** Build a single full-screen Valentine page with “Yes/No” choices where “No” evades interaction, and a “Yes” success state showing “Good choice” with a cute couple-cat image.

**Planned changes:**
- Create a single full-viewport React page with romantic pink/white styling and the Valentine question plus “Yes” and “No” buttons.
- Implement evasive “No” button behavior on hover (pointer) and touch start, keeping the button within viewport bounds.
- Add a “Yes” click state transition (no reload) that replaces the UI with the text “Good choice” and displays a couple-cat image.
- Add the generated image as a static asset under `frontend/public/assets/generated` and load it directly from the frontend.

**User-visible outcome:** The user sees a romantic Valentine prompt with “Yes” and a “No” button that moves away; clicking “Yes” shows “Good choice” and a cute couple-cats image.
