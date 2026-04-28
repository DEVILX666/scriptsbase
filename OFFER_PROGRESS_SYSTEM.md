# Offer Progress Tracking System

## Overview

The Offer Progress Tracking System is an interactive feature that provides real-time progress tracking for offers in the modal. Each offer maintains independent progress that updates every 15 minutes in a cycle (0/2 → 1/2 → 2/2 → Completed).

## Features

### 1. **Independent Progress Tracking**
- Each offer has its own progress counter
- Progress is stored in session storage for persistence during the user session
- Each offer cycles through: 0 tasks → 1 task → 2 tasks → Completed

### 2. **Visual Progress Bar**
- Positioned at the top of each offer card
- Shows real-time progress (e.g., "1 / 2")
- Color-coded: Cyan when in progress, Green when completed
- Displays countdown timer to next progress update

### 3. **Completion Overlay**
- When an offer reaches 2/2 completion, a green checkmark appears
- The offer card becomes grayed out and unclickable
- Visual feedback shows "COMPLETED" status
- Glow effect highlights the completion state

### 4. **15-Minute Update Cycle**
- Progress automatically increments every 15 minutes
- Real-time countdown shows time until next update
- Format: MM:SS display for time remaining

## Components

### `offer-progress.ts`
Manages the progress data model and calculations:
- `getOfferProgress()` - Get current progress for an offer
- `updateOfferProgress()` - Calculate and update progress based on elapsed time
- `setOfferProgress()` - Manually set progress (for testing)
- `resetOfferProgress()` - Reset an offer's progress
- `getTimeUntilNextUpdate()` - Calculate seconds until next progress cycle

### `offer-progress-bar.tsx`
React component displaying the progress UI:
- Progress bar with percentage fill
- Current/Max progress badge (e.g., "1 / 2")
- Status indicator (loading spinner or checkmark)
- Countdown timer
- Auto-updates every second

### `offer-completion-overlay.tsx`
Overlay component for completed offers:
- Green checkmark with glow effect
- Completion badge
- Positioned absolutely over the offer card
- Non-interactive (pointer-events: none)

### `offer-overlay.tsx` (Updated)
Main offer modal component:
- Integrates progress tracking into each offer card
- Imports and uses OfferProgressBar component
- Applies grayed-out styling to completed offers
- Disables button interaction for completed offers

## Usage

### For Developers

```typescript
import { getOfferProgress, updateOfferProgress } from "@/lib/offer-progress"

// Get current progress
const progress = getOfferProgress("offer-123")
console.log(progress) // { offerId, currentProgress, maxProgress, isCompleted, lastUpdated }

// Update progress based on time elapsed
const updated = updateOfferProgress("offer-123")
if (updated.isCompleted) {
  console.log("Offer is now complete!")
}

// Check time until next update
const timeLeft = getTimeUntilNextUpdate("offer-123") // seconds
```

### In Components

```tsx
import { OfferProgressBar } from "@/components/offer-progress-bar"

<OfferProgressBar offerId={offer.id} isCompleted={false} />
```

## Data Storage

Progress is stored in browser sessionStorage using the key format:
```
offer_progress_<offerId>
```

Each entry contains:
```json
{
  "offerId": "offer-123",
  "currentProgress": 1,
  "maxProgress": 2,
  "isCompleted": false,
  "lastUpdated": 1704067200000
}
```

## Update Cycle Timeline

For an offer created at 12:00 PM:

- **12:00 - 12:15**: Progress = 0/2
- **12:15 - 12:30**: Progress = 1/2
- **12:30 onwards**: Progress = 2/2 (Completed)

## Testing

To manually test the progress system:

1. Open the offers modal
2. Check browser Developer Tools → Application → Session Storage
3. Find `offer_progress_<offerId>` entries
4. Modify the `currentProgress` value to test different states
5. Refresh the page to see the UI updates

## Styling

The system uses Tailwind CSS classes and inline styles:

- **Progress Bar**: Cyan gradient (`bg-cyan-500`) for active, green (`bg-emerald-500`) for completed
- **Checkmark**: Large green circle with box shadow glow
- **Completed Card**: Reduced opacity (0.75), grayed background, disabled interaction
- **Animations**: 500ms ease-out transitions, pulse effect on checkmark

## Future Enhancements

- Webhook integration to sync progress across devices
- Persistent storage in database for cross-session tracking
- Analytics tracking for progress completion rates
- Custom animation effects per offer type
- Sound notifications for progress milestones

## Troubleshooting

**Progress not updating?**
- Check if sessionStorage is enabled in browser
- Verify offer ID is unique across all offers
- Check browser console for any errors

**Checkmark not showing?**
- Ensure `isCompleted` prop is correctly passed to OfferProgressBar
- Check CSS z-index layering (overlay should be z-20)
- Verify backdrop-blur is supported in browser

**Timer countdown incorrect?**
- Verify system time is synchronized
- Check if page has been in background (may affect intervals)
- Clear sessionStorage and reload to reset

## Performance Notes

- Progress bar updates every 1 second (cheap operation)
- Main calculations only run when cycles complete (every 15 minutes)
- SessionStorage access is minimal
- No external API calls for progress tracking
- Suitable for thousands of concurrent offers
