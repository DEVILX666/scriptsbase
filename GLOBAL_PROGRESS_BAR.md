# Global Progress Bar System

## Overview
A modern, fixed position progress bar that displays at the top of the screen when the offers modal is open. This single progress bar tracks completion across all offers, matching the reference design aesthetic.

## Design Features

### Visual Components
- **Spinning Loader Icon**: Cyan rotating SVG circle with gradient effect on top, gray background circle
- **Main Text**: "Checking Completion..." in white, bold typography
- **Subtitle**: Dynamic task count text that updates based on language and remaining tasks
- **Progress Badge**: Lock icon + progress counter (0/2, 1/2, 2/2) in a bordered box on the right
- **Animated Underline**: Continuous flowing cyan gradient line at the bottom that moves infinitely

### Modern Styling
- Dark navy/slate background (gradient from 95% to 80% opacity)
- Backdrop blur for glassmorphism effect
- Cyan accent color (#06b8d4) throughout
- Responsive padding and spacing (md: prefixes for responsive design)
- Smooth animations with 2-second loop duration
- Border with cyan glow effect

## Component Props

```typescript
interface GlobalProgressBarProps {
  currentProgress: number    // Current completed tasks (0-2)
  maxProgress: number        // Total tasks (usually 2)
  language: string          // Current user language (en, es, fr, de, etc)
}
```

## Usage Example

```tsx
<GlobalProgressBar 
  currentProgress={1} 
  maxProgress={2} 
  language="en" 
/>
```

## Internationalization

The subtitle text updates based on the language prop:
- **English**: "1 Task left to unlock scripts" / "2 Tasks left to unlock scripts"
- **Spanish**: "1 Tarea para desbloquear scripts" / "2 Tareas para desbloquear scripts"
- **French**: "1 Tâche pour déverrouiller les scripts" / "2 Tâches pour déverrouiller les scripts"
- **German**: "1 Aufgabe um Scripts freizuschalten" / "2 Aufgaben um Scripts freizuschalten"

## Animation Details

### Spinner Animation
- SVG-based circular loading icon
- CSS `animate-spin` for continuous rotation
- Gradient from transparent to cyan
- Smooth, modern appearance

### Underline Animation
Two-layer effect:
1. **Base Layer**: Subtle gradient background (cyan/20% opacity)
2. **Animated Layer**: Bright sliding gradient (cyan/60% opacity) that moves horizontally
   - Duration: 2 seconds per cycle
   - Infinite loop
   - Timing: Linear (constant speed)

The animation slides from left to right continuously, creating a modern "loading" effect.

## Integration

The progress bar is displayed when the offer modal (`OfferOverlay`) is open:

```tsx
{isOpen && (
  <GlobalProgressBar 
    currentProgress={completedOffers} 
    maxProgress={totalOffers} 
    language={language} 
  />
)}
```

## Fixed Positioning
- Position: `fixed` (stays at top of viewport)
- Z-index: 50 (appears above most content)
- Width: 100% (full screen width)
- Padding: Responsive (4 on mobile, 6 on desktop)
- Max-width: 7xl (constrains content on large screens)

## Responsive Design
- Mobile: Smaller font sizes (text-sm), compact spacing
- Desktop: Larger fonts (text-base, text-lg), more generous spacing
- Touch-friendly icon sizes (w-8 h-8)
- Flexible layout using flexbox

## Future Enhancements
- Real-time progress updates via WebSocket
- Completion confetti animation
- Sound effects on progress milestone
- Custom branding colors configurable via props
