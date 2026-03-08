# Responsive Dashboard Plan for Indonesian Market

## Indonesian Device Research Summary

### Target Viewport Widths (by priority)
| Width | Devices | Market Segment |
|-------|---------|----------------|
| **360px** | Samsung A06, Redmi 14C, Infinix/Tecno | Budget (dominant in UMKM) |
| **393-412px** | Galaxy A16/A56, Redmi Note 14 Pro, OPPO, Vivo | Mid-range |
| **534px** | Samsung Galaxy Tab A9 (portrait) | Small tablet |
| **768-820px** | Galaxy Tab A9+/S9 FE, iPad | Standard tablet |

**Critical: 360px is the #1 viewport width in Indonesia (10.56% share). Budget phones dominate the UMKM target audience.**

### Current Tailwind Breakpoints (kept as-is)
- Base: 0px (mobile-first, targets 360px+)
- `sm`: 640px (landscape phones / small tablets)
- `md`: 768px (tablet portrait)
- `lg`: 1024px (tablet landscape / laptop)

---

## Issues Found

1. **Double padding** - Roadmap, Progress, Settings pages add their own `p-6` inside layout's `p-4 md:p-6`
2. **No bottom navigation** - Mobile relies on hamburger menu (poor discoverability)
3. **Tabs overflow** - Roadmap's 6-tab TabsList overflows at 360px
4. **Fixed chart heights** - 250-300px heights too tall on small phones
5. **Score page charts** - Two charts side-by-side at `md:` don't stack on smaller widths
6. **Dashboard score card** - `flex gap-6` layout cramped on 360px
7. **No landscape optimization** - No compact header or hidden nav in landscape
8. **Progress stats grid** - 4-column grid jumps from 1->2->4, skipping 2-column for small tablets

---

## Implementation Plan

### Phase 1: Bottom Navigation Bar (new component)

**Create `components/dashboard/bottom-nav.tsx`**
- Fixed bottom bar, visible only on mobile (`md:hidden`)
- Hidden in landscape mode (`landscape:hidden`)
- 5 nav items: Dashboard, Assessment, Chat, Skor, Pengaturan (most-used pages)
- Active state matches current pathname
- Height: 56px (touch-friendly for thumb reach)
- Safe area padding for notched phones (`pb-safe`)

**Modify `app/dashboard/layout.tsx`**
- Add `<BottomNav />` after `<main>`
- Add bottom padding to `<main>` on mobile to prevent content hiding behind bottom nav: `pb-16 md:pb-0`
- Hide `SidebarTrigger` on mobile since bottom nav replaces it (keep on `md:` for tablet/desktop sidebar toggle)
- Compact header on mobile: reduce from `h-16` to `h-12` on base, keep `h-16` on `md:`

### Phase 2: Fix Double Padding

**Files:** `roadmap/page.tsx`, `progress/page.tsx`, `settings/page.tsx`
- Remove `p-6` from these pages (layout already provides `p-4 md:p-6`)
- Loading skeletons also have `p-6` - remove those too

### Phase 3: Roadmap Page Tabs Overflow

**File:** `app/dashboard/roadmap/page.tsx`
- Wrap TabsList in a horizontal scroll container on mobile: `overflow-x-auto`
- Use `flex-nowrap` so tabs don't wrap and become unreadable
- Add `-mx-4 px-4 md:mx-0 md:px-0` for edge-to-edge scroll with padding
- Alternative: Use a Select dropdown on mobile (`md:hidden`) and keep TabsList on desktop (`hidden md:block`)
  - **Recommended: Select on mobile** since 6 tabs is too many to scroll on 360px

### Phase 4: Responsive Chart Heights

**Files:** `components/dashboard/score-gauge.tsx`, `components/dashboard/score-radar-chart.tsx`, `components/dashboard/progress-chart.tsx`
- Use a `useIsMobile()` hook or CSS-based approach to reduce chart heights
- Mobile: 180-200px height
- Desktop: keep 250-300px
- Approach: Pass responsive height prop or use a wrapper with CSS height

### Phase 5: Score Page Layout

**File:** `app/dashboard/score/page.tsx`
- Change grid from `md:grid-cols-2` to `grid-cols-1 md:grid-cols-2`
- Charts already stack on mobile (grid-cols-1 default) - just verify
- The "Lihat Roadmap" button at bottom: make full-width on mobile (`w-full sm:w-auto`)

### Phase 6: Dashboard Overview Page

**File:** `app/dashboard/page.tsx`
- Score card: Change `flex items-center gap-6` to `flex flex-col items-center gap-4 sm:flex-row sm:gap-6`
- On 360px: stack score number above description vertically
- On sm+: side-by-side layout (current)
- Score number: slightly smaller on mobile (`text-4xl` base, `sm:text-5xl`)

### Phase 7: Progress Page Stats Grid

**File:** `app/dashboard/progress/page.tsx`
- Change `grid gap-4 sm:grid-cols-2 lg:grid-cols-4` to `grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4`
- Show 2 columns even on mobile (stat cards are small enough at 360px with 2-col)
- Reduce gap from `gap-4` to `gap-3` on mobile
- Stat card text: `text-xl` on mobile, `sm:text-2xl` for the big numbers

### Phase 8: Chat Page Adjustments

**File:** `app/dashboard/chat/page.tsx`
- Account for bottom nav: change `h-[calc(100vh-4rem)]` to `h-[calc(100vh-4rem-3.5rem)]` on mobile (subtract bottom nav height), keep `md:h-[calc(100vh-4rem)]`
- Simplify: use `h-[calc(100dvh-7.5rem)] md:h-[calc(100dvh-4rem)]` (dvh for dynamic viewport on mobile)
- Mobile header: already shows history toggle - keep as-is

### Phase 9: Landscape Mode Optimization

**File:** `app/globals.css`
- Add landscape utility using `@media (orientation: landscape)`
- Bottom nav: `landscape:hidden` (already in Phase 1)
- Dashboard header: reduce to `h-10` in landscape for more content space
- Apply via Tailwind arbitrary variant: `max-md:landscape:h-10`

### Phase 10: Assessment Form Touch Targets

**File:** `components/forms/assessment-form.tsx`
- Radio group items: increase touch target height with `py-2` on the label wrapper
- Switch toggles: the `flex items-center justify-between` layout is already good
- Form card `max-w-2xl` is fine - form fills width on mobile naturally
- Step navigation buttons: make full-width on mobile for easier thumb reach

### Phase 11: Settings Page Responsive

**File:** `app/dashboard/settings/page.tsx`
- Already decent with `sm:grid-cols-2` for form fields
- Account buttons `flex flex-col gap-3 sm:flex-row` already responsive
- No major changes needed beyond padding fix (Phase 2)

---

## File Change Summary

| File | Changes |
|------|---------|
| **NEW** `components/dashboard/bottom-nav.tsx` | Mobile bottom navigation bar |
| `app/dashboard/layout.tsx` | Add BottomNav, compact header, bottom padding |
| `app/dashboard/page.tsx` | Score card responsive stacking |
| `app/dashboard/chat/page.tsx` | Adjust height for bottom nav |
| `app/dashboard/score/page.tsx` | Full-width CTA button on mobile |
| `app/dashboard/roadmap/page.tsx` | Remove p-6, Select for mobile tab filter |
| `app/dashboard/progress/page.tsx` | Remove p-6, 2-col stats on mobile, responsive text |
| `app/dashboard/settings/page.tsx` | Remove p-6 |
| `components/dashboard/score-gauge.tsx` | Responsive height |
| `components/dashboard/score-radar-chart.tsx` | Responsive height |
| `components/dashboard/progress-chart.tsx` | Responsive height |
| `components/forms/assessment-form.tsx` | Better touch targets, full-width nav buttons |
| `app/globals.css` | Landscape utilities |

---

## Testing Checklist
- [ ] 360px portrait (Samsung A06 - budget phone)
- [ ] 393px portrait (Redmi Note 14 Pro - mid-range)
- [ ] 412px portrait (Galaxy A16 - popular)
- [ ] 360px landscape (640x360 - limited height)
- [ ] 768px portrait (tablet)
- [ ] 1024px+ (desktop with sidebar)
