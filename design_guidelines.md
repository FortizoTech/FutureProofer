# Future Proofer - Enterprise Application Design Guidelines

## Design Approach
**System-Based Approach**: Drawing from modern enterprise SaaS design patterns (Linear, Notion, Stripe Dashboard) with emphasis on data clarity, professional aesthetics, and intelligent information hierarchy. This is a utility-focused application requiring exceptional usability and visual sophistication.

## Core Design Principles
1. **Data-First Clarity**: Information architecture prioritizes insight digestibility
2. **Professional Minimalism**: Clean, uncluttered interfaces that convey intelligence
3. **Empowerment Through Design**: Visual language inspires confidence and action
4. **Contextual Intelligence**: UI adapts to Career vs Business mode contexts

---

## Typography System

**Primary Font**: Montserrat (headings, UI elements, data labels)
**Secondary Font**: Lato (body text, descriptions, paragraph content)

**Hierarchy**:
- **Page Titles**: Montserrat Bold, 32px (2xl)
- **Section Headers**: Montserrat SemiBold, 24px (xl)
- **Card Titles**: Montserrat Medium, 18px (lg)
- **Body Text**: Lato Regular, 16px (base)
- **Data Labels**: Montserrat Medium, 14px (sm)
- **Captions/Meta**: Lato Regular, 12px (xs)

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16 (consistent spacing rhythm)
- Component padding: p-6, p-8
- Section spacing: mb-8, mb-12
- Card gaps: gap-6
- Page margins: mx-8, mx-12

**Grid Structure**:
- Main content area: max-w-7xl with px-8
- Dashboard cards: 2-3 column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Sidebar navigation: Fixed 280px width on desktop, slide-over on mobile

---

## Component Library

### Navigation & Layout
**Sidebar Navigation** (Left-aligned, persistent on desktop):
- Fortizo logo at top (white version on Royal Blue background)
- Mode selector: Career/Business toggle
- Main navigation items with icons
- User profile section at bottom
- Subtle dividers between sections
- Active state: Cyan accent on left border + background tint

**Top Bar**:
- Page title/breadcrumb on left
- Search functionality (center)
- Notifications + Profile avatar (right)
- Subtle shadow/border for depth

### Dashboard Components
**Insight Cards** (Primary information containers):
- White background with subtle border
- 8px border-radius
- Icon or data visualization at top
- Title (Montserrat Medium)
- Description/metrics (Lato Regular)
- Action link/button at bottom
- Hover: subtle shadow elevation

**Forecast Visualization Cards**:
- Chart/graph area with generous padding
- Data legend with color indicators
- Time period selector (tabs: 6M, 1Y, 3Y, 5Y)
- Download/share icon buttons (top-right)

**Metric Tiles**:
- Large number display (Montserrat Bold, 36px)
- Label beneath (Lato Regular)
- Trend indicator (arrow + percentage)
- Compact size (h-32)

### Data Visualization
**Chart Styling**:
- Use Royal Blue (#0033A0) for primary data series
- Cyan (#00B5E2) for secondary/comparison data
- Neutral gray for baseline/historical
- Clean axes, minimal gridlines
- Tooltips on hover with precise values

**Progress Indicators**:
- Linear progress bars (h-2, rounded-full)
- Circular progress for percentages
- Color gradient from Royal Blue to Cyan for positive growth

### Forms & Input
**Input Fields**:
- Clean, rectangular with 1px border
- Focus state: Royal Blue border (2px) + subtle glow
- Label above input (Montserrat Medium, 14px)
- Helper text below (Lato Regular, 12px, muted)
- Consistent height: h-12

**Buttons**:
- **Primary**: Royal Blue background, white text, 8px radius
- **Secondary**: White background, Royal Blue border and text
- **Tertiary**: Text-only, Cyan color
- Height: h-12, px-6 padding
- Hover: subtle opacity change (0.9)

**Mode Selector (Career/Business)**:
- Segmented control style
- Active segment: Royal Blue background
- Inactive: transparent with border
- Icons + labels for each mode

### AI Chat Interface (BusinessMate)
**Chat Container**:
- Fixed height viewport section with scroll
- Messages: left-aligned (AI), right-aligned (user)
- AI messages: light gray background bubble
- User messages: Royal Blue background, white text
- Timestamp below each message cluster
- Input bar fixed at bottom with send button

**Suggestion Chips**:
- Horizontal scrollable row above input
- Pill-shaped buttons with Cyan border
- Quick-access common queries

### Learning Pathways Integration
**Course Cards**:
- Horizontal layout with thumbnail image (left, 160px width)
- Course title, duration, difficulty (right)
- Progress bar if enrolled
- CTA button: "Start Learning" or "Continue"
- Grid layout: 2 columns on desktop

### Subscription Management
**Pricing Comparison Table**:
- 3-column layout: Free, Premium, Enterprise
- Feature rows with checkmarks/crosses
- Highlighted recommended plan (border accent)
- CTA button in each column footer

---

## Micro-interactions
- **Minimal animations**: Subtle fade-ins for cards (300ms)
- **Data updates**: Smooth number transitions (CountUp effect)
- **Loading states**: Skeleton screens matching component structure
- **Hover states**: Elevation changes via shadow (no color shifts)

---

## Responsive Behavior
- **Desktop (lg:)**: Full sidebar, 3-column grids, expanded charts
- **Tablet (md:)**: Collapsed sidebar (hamburger), 2-column grids
- **Mobile (base:)**: Bottom navigation, single column, stacked layouts, charts adapt to vertical orientation

---

## Accessibility
- WCAG 2.1 AA compliance
- Color contrast ratios: 4.5:1 for text
- Keyboard navigation support throughout
- ARIA labels on interactive elements
- Focus indicators: Royal Blue outline (2px)

---

## Professional Polish
- Consistent 8px border-radius across cards/buttons
- Subtle shadows for depth (shadow-sm, shadow-md)
- Generous whitespace (never cramped)
- Professional iconography (Heroicons Outline)
- Data-first information density without clutter