# Book Karo India – Event Planner (events.bookkaroindia.com)

Production-ready Next.js frontend for the Event Planner. Brown/white aesthetic inspired by Wedding Event.pdf. Includes pages: index, about, services, packages (dynamic), team, testimonials, gallery (lightbox), contact, admin, and book.

## Tech
- Next.js 14 (App Router) + React 18
- TailwindCSS + minimal Framer Motion on hero
- SEO: Open Graph + basic Events structured data + GA snippet placeholder

## Local development
```bash
# from repository root
cd events
cp .env.local.example .env.local
# set NEXT_PUBLIC_API_BASE to your backend URL (Render/Railway or local http://localhost:8080)
npm i
npm run dev
```

## Env
- `NEXT_PUBLIC_API_BASE`: e.g. `https://events-api.onrender.com`

## Deploy (Vercel recommended)
1. Push repo to GitHub.
2. Import the `events/` folder as a project on Vercel.
3. Set Environment Variable `NEXT_PUBLIC_API_BASE` to your backend URL.
4. Deploy. Map custom domain `events.bookkaroindia.com` in Vercel → Domains.
5. At your DNS provider add CNAME: `events` → `<your-vercel-subdomain>.vercel.app`.

SSL will be auto-provisioned by Vercel once DNS resolves.

## Pages
- `/` Hero with CTA, Trusted Organizers, footer link back to main site.
- `/about` Mission statement.
- `/services` Cards for Photography, Catering, Décor, Entertainment, Transportation.
- `/packages` Loads pricing from backend `GET /api/packages`, falls back to defaults.
- `/team` 4 team cards.
- `/testimonials` Simple testimonials.
- `/gallery` Responsive grid + lightbox.
- `/contact` Contact info + form → `POST /api/contact` (sends email if SMTP configured).
- `/book` Booking form → `POST /api/bookings`.
- `/admin` Password-protected list view → sends `x-admin-password` header.

## CTA snippets for the main site
Add a prominent Event Planner link in navbar, hero, and footer.

### Tailwind version
```tsx
<a
  href="https://events.bookkaroindia.com?utm_source=bookkaroindia_nav"
  className="px-3 py-1.5 rounded-md bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
>
  Event Planner
</a>
```

### Plain CSS version
```html
<a href="https://events.bookkaroindia.com?utm_source=bookkaroindia_nav" class="event-planner-cta">Event Planner</a>
<style>
.event-planner-cta{display:inline-block;padding:.5rem .75rem;border-radius:.375rem;background:#ea8a00;color:#fff;font-weight:600;text-decoration:none}
.event-planner-cta:hover{background:#cc7700}
</style>
```

## DNS & Security checklist
- Create Vercel project for frontend (this folder). Map `events.bookkaroindia.com` → Vercel project domain.
- Add CNAME record: `events` → `<project>.vercel.app`.
- Deploy backend (Render/Railway). Set env: `MONGO_URI`, `ADMIN_PASSWORD`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `ADMIN_EMAIL`, `CORS_ORIGINS` (include https://bookkaroindia.com and https://events.bookkaroindia.com).
- On frontend set `NEXT_PUBLIC_API_BASE` to backend public URL.
- Optional: Append `?utm_source=bookkaroindia_nav` to navbar link to track referrals.

## Accessibility
- Mobile-first, focus-visible states via Tailwind, semantic headings.

## Notes
- Replace `G-XXXXXXX` in `app/layout.tsx` with your Google Analytics property ID.
- Replace hero and gallery images with your licensed assets.
