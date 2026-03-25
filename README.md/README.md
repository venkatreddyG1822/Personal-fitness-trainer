# Personal Fitness Trainer Website Documentation

PulseForge Fitness is a premium, multi-page HTML/CSS/JS website template built for a personal trainer or coaching brand. It includes two homepages, marketing pages, and two dashboards with a polished UI, dark mode, RTL support, and responsive layouts.

**Quick Start**
1. Open any file in `pages/` in a browser.
2. For live editing, use a local dev server (for example a Live Server extension) and open `pages/HomePage-1.html`.

**Project Structure**
- `pages/` Main HTML pages.
- `assets/css/style.css` Core styling, layout system, and component styles.
- `assets/css/dark-mode.css` Dark mode overrides.
- `assets/css/rtl.css` RTL layout overrides.
- `assets/js/main.js` Interactions, toggles, filters, counters, and dashboard behavior.
- `assets/images/` Local images and media.

**Included Pages**
- `pages/HomePage-1.html` Primary homepage.
- `pages/HomePage-2.html` Alternate homepage.
- `pages/about.html` About page.
- `pages/WorkoutPlans.html` Programs page.
- `pages/Nutrition Coaching.html` Nutrition coaching page.
- `pages/pricing.html` Pricing page.
- `pages/blog.html` Blog page.
- `pages/contact.html` Contact page.
- `pages/clientdashboard.html` Client dashboard.
- `pages/Admindashboard.html` Admin dashboard.
- `pages/404page.html` 404 page.

**Core Features**
- High-end hero sections, social proof, and CTA blocks.
- Program filters and dynamic program details.
- Animated counters and before/after comparison slider.
- Client and admin dashboards with panels and sidebar navigation.
- Dark mode toggle.
- RTL toggle.
- Responsive layouts for mobile, tablet, and desktop.

**Global Styling**
Primary design tokens are in `assets/css/style.css` under `:root`.

Key tokens to customize:
- `--accent-color` and `--accent-color-strong` for brand highlights.
- `--bg-body`, `--panel-bg`, and `--panel-subtle` for surfaces.
- `--font-heading` and `--font-body` for typography.
- `--header-height` for header sizing and sticky offsets.

**Dark Mode**
Dark mode overrides are in `assets/css/dark-mode.css`. The toggle uses the button with `data-theme-toggle` and persists the setting in local storage.

**RTL Support**
RTL overrides live in `assets/css/rtl.css`. The toggle uses the button with `data-rtl-toggle` and updates the document `dir` attribute.

**JavaScript Behaviors**
All interactions are handled by `assets/js/main.js`, including:
- Theme and RTL toggles.
- Dropdown menus and notifications.
- Animated counters.
- Before/after comparison slider.
- Program filters and detail swapping.
- Dashboard sidebar toggle and panel switching.

**Dashboards**
Both dashboards use the same layout pattern:
- Sidebar: `.dashboard-sidebar`
- Content wrapper: `.dashboard-content-wrapper`
- Panels: `.dashboard-panel`

If you need a fixed sidebar on desktop, the layout uses `position: sticky` on the sidebar and a scrolling main content area.

**Responsive Breakpoints**
Key breakpoints are built into `assets/css/style.css` and `assets/css/rtl.css`.
- Mobile: `max-width: 639px`
- Tablet: `640px` to `1024px`
- Small desktop: `1025px` to `1280px`

**Brand Customization Checklist**
1. Replace the logo mark in the header and footer.
2. Update hero copy and CTA buttons on the homepages.
3. Swap the demo images in `assets/images/` and any external image URLs in `pages/`.
4. Adjust the tokens in `:root` to match brand colors and typography.
5. Edit dashboard KPIs, chart values, and labels in `pages/clientdashboard.html` and `pages/Admindashboard.html`.

**Asset Notes**
Demo images are loaded from `assets/images/` plus external sources referenced in HTML. Replace any external URLs with your own hosted assets for production.

**Browser Support**
Designed for modern evergreen browsers. If you need legacy support, verify CSS features like `backdrop-filter` and `position: sticky`.

**Support**
If you want customization help, additional pages, or component variants, extend the existing patterns in `style.css` and keep the class naming consistent for easy maintenance.
