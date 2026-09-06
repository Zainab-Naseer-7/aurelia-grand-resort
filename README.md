# AURELIA GRAND RESORT & SPA — Official Web Experience

Welcome to **Aurelia Grand Resort & Spa**, an ultra-premium, world-class 5-star international luxury hotel and resort web application designed with the aesthetic restraint of an award-winning creative agency.

---

## 🌟 Visual Identity & Design System

- **Palette**: 
  - **Midnight Navy & Noir**: `#060B14`, `#09101D`, `#0E182A`, `#13223B` (rich, deep, atmospheric)
  - **Champagne Gold & Bronze**: `#D4AF37`, `#E7C968`, `#F4E8C1`, `#A58025` (curated metallic accents and glows)
  - **Ivory & Alabaster**: `#FDFBF7`, `#F3EEE5`, `#CBD5E1` (clean, readable editorial typography)
- **Typography Pairing**:
  - `Cinzel`: Regal display serif for headings, monograms, and luxury branding.
  - `Cormorant Garamond`: Delicate editorial serif for evocative quotes, subtitles, and pullouts.
  - `Plus Jakarta Sans`: Modern, legible geometric sans-serif for UI, forms, and body copy.
- **Micro-Interactions**:
  - Dynamic Ken Burns effect on the cinematic hero.
  - 60fps lightweight atmospheric gold dust canvas simulation in the hero.
  - Subtle frosted glassmorphic navigation with scroll spy and sticky transformation.
  - Staggered hover animations, card elevations, image zooms, and gold button light sweeps.

---

## 🚀 How to Run the Website

As per your instructions, **no complex build setups, node installations, or external servers are required**.

### Option 1: Direct Browser Launch (Simplest)
1. Navigate to your project folder:
   `c:\Users\asfandyar\Desktop\AURELIA GRAND RESORT\`
2. Double-click **`index.html`** or right-click and choose **Open with Google Chrome / Microsoft Edge / Safari**.
3. The website will load instantly with 100% functionality!

### Option 2: Local Static Server (VS Code Live Server / Python / Node)
If you prefer running via a local web server:
- **VS Code Live Server**: Right-click `index.html` and select **"Open with Live Server"**.
- **Python**: Run `python -m http.server 8000` in this directory and open `http://localhost:8000`.
- **Node**: Run `npx serve .` and open the local URL.

---

## 💎 Features & Interactive Functionality

Every single button across the application performs a tangible, real-world action:

1. **Floating Transparent-to-Glass Navbar**:
   - Monogram logo and brand badge.
   - Smooth anchor scrolling to all 8 core sections.
   - **Sound Atmosphere Synthesizer Toggle**: Generates a warm, ambient Mediterranean harmonic soundscape using the native browser Web Audio API (zero audio file dependencies!).
   - **Reserve Now** button directly launches the 4-step booking engine.
   - Responsive mobile hamburger drawer with slide-out animation.

2. **Cinematic Hero**:
   - High-resolution luxury resort background with Ken Burns zoom.
   - Atmospheric floating gold dust particle canvas.
   - "Explore The Resort" smooth scrolls to Introduction.
   - "Reserve Your Stay" launches the Booking Engine.
   - Forbes 5-Star, Private Marina, and Michelin Dining indicators.
   - Mouse scroll wheel indicator.

3. **Floating Quick Availability Search Bar**:
   - Live check-in & check-out calendar pickers with automatic departure calculation.
   - Accommodation and guest count selectors.
   - **Check Availability** button calculates stay duration and opens the booking modal pre-populated with chosen criteria.

4. **Editorial Introduction**:
   - "A Sanctuary Beyond Ordinary" editorial layout.
   - Dual-photo composition with 3D floating Condé Nast accolades card.
   - 4 key pillars: Forbes 5-Star Heritage, Exclusive Peninsula, Holistic Wellness, Bespoke Butlerage.

5. **Rooms & Suites Showcase**:
   - Filter tabs: All, Deluxe Rooms, Ocean View Rooms, Executive Suites, Royal Suites, Presidential Villa.
   - Room cards featuring specs (area, occupancy, bed type, starting rate).
   - **View Details** button: Opens an in-depth room modal with photo thumbnail carousel, complimentary inclusions, full amenities breakdown, and direct booking trigger.
   - **Reserve** button: Instantly loads that specific suite into the booking engine.

6. **Interactive 4-Step Booking Engine Modal**:
   - **Step 1 (Stay Details)**: Live night calculator and real-time room total calculation.
   - **Step 2 (Bespoke Enhancements)**: Toggle Helicopter transfers ($650), Dom Pérignon vintage welcome ($420), Spa hydrotherapy pass ($280), Riva yacht sunset cruise ($850), and Butler service ($350) with live grand total updates.
   - **Step 3 (Guest Information)**: Complete guest contact and special requests form with validation.
   - **Step 4 (Official Reservation Voucher)**: Generates a printable, downloadable luxury booking voucher with unique reference code (e.g., `AGR-XXXXXX`), transparent breakdown of charges, and instant confirmation toast.

7. **Dining & Gastronomy**:
   - 5 featured dining realms: L'Orangerie (3 Michelin Stars), Aura Rooftop Lounge, Azure Cove Grill, The Sommelier's Vault, and Maison Aurelia.
   - **View Menu** button: Displays tasting menu highlights and signature pricing.
   - **Reserve Table** button: Opens interactive table booking form with seating preferences and Maître d' dispatch confirmation.

8. **Wellness & Spa Sanctuary**:
   - "Restore. Rebalance. Renew."
   - 6 restorative treatments (Hydrothermal Labyrinth, Royal Amber Massage, Tibetan Sound Bath, Sunrise Vinyasa, Marine Algae Detox, Cold Plunge Therapy).
   - **Book Treatment** button: Opens an interactive spa appointment scheduler with therapist preferences and instant toast feedback.

9. **Bespoke Experiences**:
   - Private Riva Yacht, Helicopter Aerial Vineyard Tour, Atoll Twilight Dinner, Bioluminescent Night Diving, Michelin Culinary Masterclass, Celestial Observatory.
   - **Inquire Experience** button with Head Concierge dispatch confirmation.

10. **Curated Visual Gallery & Fullscreen Lightbox**:
    - Filterable categories: All Perspectives, Resort & Coast, Suites & Villas, Culinary, Spa & Pools, Experiences.
    - Masonry grid with hover zoom.
    - Fullscreen Lightbox with Next (`›`), Previous (`‹`), Close (`✕`), counter indicators, and full **Keyboard Navigation** (`ArrowLeft`, `ArrowRight`, `Escape`).

11. **Why Aurelia (Animated Counters & Accolades)**:
    - Automatically counts up from 0 to 25+ Years, 120+ Suites, 15+ Experiences, and 98% Satisfaction upon scrolling into view.
    - Accolade emblems for Condé Nast Gold List, Forbes 5-Star, World Luxury Hotel Awards, and Prix Versailles.

12. **Verified Guest Reviews Slider**:
    - High-profile international guest testimonials.
    - Next/Prev buttons, dot indicators, touch drag/swipe support on mobile, and auto-rotation with hover pause.

13. **Resort Location & Arrival Logistics**:
    - Interactive stylized radar map with clickable hotspots (Main Bastion, Helipad, Marina, Coral Reef) updating GPS coordinates and transfer notes dynamically.
    - Transfer logistics cards for Helicopter (12 min), Rolls-Royce Spectre Chauffeur (45 min), and Yacht Tender (25 min).

14. **VIP Concierge Contact Form**:
    - Real-time client-side field validation for name, email, and message.
    - Inline error alerts.
    - Success feedback with luxury toast notifications.

15. **Footer & Legal Modals**:
    - Brand emblem, social media links, newsletter subscription with instant validation and confirmation toast, privacy policy, and smooth back-to-top button.

---

## 📁 File Structure

```
AURELIA GRAND RESORT/
├── index.html       # Semantic HTML5 architecture & all modal dialogs
├── styles.css       # Ultra-premium CSS design system, typography & animations
├── data.js          # Master data store for suites, dining, wellness, gallery & stats
├── app.js           # Event-driven application logic, booking engine & synthesizers
└── README.md        # Comprehensive documentation & feature guide
```

*Crafted with absolute attention to detail, performance, and international 5-star elegance.*
