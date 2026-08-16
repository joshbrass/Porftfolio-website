/* ─────────────────────────────────────────────────────────────
   ALL SITE CONTENT LIVES HERE.
   Edit this file to update the site — never the components.

   Lines marked  // ⚠ VERIFY  contain claims I inferred from your CV.
   Replace anything you can't defend in an interview. A number you
   can't explain does more damage than no number at all.
   ───────────────────────────────────────────────────────────── */

import img from "../assets/images/omj.png";
import kabs from "../assets/images/kabsdinner.png";
import comtrova from "../assets/images/works/mello.png";
import harde from "../assets/images/works/hardeverse.png";
import radcare from "../assets/images/works/radcare.png";
import { StaticImageData } from "next/image";

export const person = {
  name: "Omeonu Joshua",
  shortName: "Joshua",
  initials: "OJ",
  role: "Full-stack engineer",
  base: "Lagos, Nigeria",
  timezone: "WAT — UTC+1",
  since: "2022", // ⚠ VERIFY: year you started writing code professionally
  email: "joshuaomeonu@gmail.com",
  cv: "https://drive.google.com/file/d/1mS01RURaMe8c8NwX4opBoVjWCsUMEX2d/view",
  portrait: {
    src: img, // ← put your photo at public/me.jpg
    alt: "Joshua Omeonu",
    caption: "Ikeja, Lagos", // ⚠ EDIT: where it was taken
    year: "2026",
  },
  availability: {
    open: true,
    label: "Open to full-time and contract work",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/joshbrass" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joshua-omeonu-311390205",
    },
    { label: "X", href: "https://x.com/omeonujoshua1" },
  ],
};

/* ── Hero ─────────────────────────────────────────────────── */

export const hero = {
  // Three lines. Keep them short — they are set very large.
  headline: ["I build the software", "that businesses", "actually run on."],
  intro:
    "I'm a full-stack engineer in Lagos. For the last three years I've been shipping production systems — retail distribution, property management, learning platforms — for teams who notice within minutes when something breaks.",
  now: "Currently at TechMinte, building Comtrova — and on the Hardeverse learning platform at Harde Business School.",
};

/* ── Story: chapters, in order ────────────────────────────── */
/*  This is the spine of the page. Rewrite these in your own
    voice — specific, first-person, a little dry. Detail beats
    adjectives: "a spreadsheet with 4,000 rows" lands harder
    than "complex data".                                        */

export const chapters = [
  {
    year: "2019",
    title: "I learned to build things that had to fit",
    body: [
      "I studied Mechanical Engineering at Nigeria Maritime University. Most of what I remember isn't thermodynamics — it's the discipline of tolerances. A part is either within spec or it isn't. You can't argue a shaft into a bearing.",
      "That turned out to be the most useful thing I took into software.",
    ],
  },
  {
    year: "2022", // ⚠ VERIFY
    title: "The first thing I built that other people used",
    body: [
      "I wrote my first serious interface in my final years of school and immediately preferred it to everything else I was studying. The feedback loop was instant. Something either rendered or it didn't, and when it didn't, that was on me.",
      "I taught myself React the slow way — building, breaking, rebuilding — until I could put something in front of a stranger without flinching.", // ⚠ VERIFY / rewrite in your own words
    ],
  },
  {
    year: "2023",
    title: "SalesUnbox, and what production really costs",
    body: [
      "SalesUnbox was my first real production system: a retail platform used by hundreds of Nigerian SMEs, with merchant dashboards, inventory, orders and payments through Paystack and Flutterwave.",
      "It taught me the part nobody warns you about. Shipping a feature is maybe 40% of the work. The rest is the states you didn't plan for — the failed charge, the duplicate submit, the merchant on a 3G connection in Aba whose token expired mid-checkout.",
    ],
  },
  {
    year: "2023—now",
    title: "TechMinte: many clients, one habit",
    body: [
      "At TechMinte I've worked across a lot of surfaces — an LMS, a marketing site, an AI dashboard, a media platform — usually as the person who takes a Figma file and a half-finished API and makes them agree with each other.",
      "The habit I picked up here is boring and it's the one I'd bring anywhere: <em>read the API response before you design the state</em>. Almost every frontend mess I've had to untangle started as an assumption about data that nobody checked.",
    ],
  },
  {
    year: "2025",
    title: "Hardeverse, and APIs you don't control",
    body: [
      "I joined Harde Business School to work on Hardeverse, their learning platform — course delivery, quizzes, certificates, and four different programmes running off one codebase. I'm still there.",
      "The enrolment flow is where I learned the most. The backend didn't return an application ID after payment, which meant a learner could pay and end up in no programme at all. Rather than wait for a fix, I built an unreconciled-payment path that records the charge and resolves it later. <em>You rarely get to choose the API you're handed — only whether your app degrades or dies when it misbehaves.</em>",
    ],
  },
  {
    year: "2025",
    title: "Comtrova, and owning something hard",
    body: [
      "Comtrova is a property management platform — multi-estate, role-based, money moving through it. Facility managers, estate admins and residents all see a different product built from the same data, which meant building two front-ends against one API and keeping them honest as it changed underneath me.",
      "It's the first codebase where I've been responsible for the architecture rather than just the screens, and the first where getting a permissions boundary wrong has consequences that aren't visual.",
    ],
  },
  {
    year: "2026",
    title: "RadCare, and state that arrives on its own",
    body: [
      "Every app I'd built until then fetched its state. RadCare pushes it — patients and caregivers messaging over a socket while the same data sits in an RTK Query cache that thinks it knows better.",
      "Reconciling those two is the hardest bug class I've worked on. <em>A cache and a socket will always disagree eventually; the design question is what happens when they do.</em> I now reach for that question before I write the first subscription.",
    ],
  },
  {
    year: "2026",
    title: "Kabs Diner, and finally owning the whole thing",
    body: [
      "Every system before this one had a backend somebody else wrote. Kabs Diner is a restaurant platform where I designed the schema, the auth and the payment verification myself — supper-club bookings, an online store, one admin dashboard behind both.",
      "The lesson arrived in the first week: I put payment verification in the browser, realised anyone could mark an unpaid booking as confirmed, and moved it into an edge function. <em>Anything a user can benefit from lying about has to be decided by the server.</em> Obvious in hindsight, which is how most of the good ones land.",
    ],
  },
];

/* ── Work ─────────────────────────────────────────────────── */
/*  Five featured case entries — the ceiling. Showing everything
    you've touched reads as inexperience. Each of these five proves
    a different thing; the rest live in the index below.

    Cutting for a specific application? Drop the one furthest from
    that employer's domain, not the one you enjoyed least.        */

export type Project = {
  name: string;
  kind: string;
  year: string;
  role: string;
  summary: string;
  contributions: string[];
  stack: string[];
  href?: string;
  /** Shown as a badge when there's no public URL, e.g. "Internal system". */
  status?: string;

  image?: string | StaticImageData;
};

export const featured: Project[] = [
  {
    name: "Comtrova",
    kind: "Property management platform",
    year: "2025—now",
    role: "Frontend lead · two clients",
    summary:
      "A multi-estate management platform running two separate front-ends against one API: an admin panel for estate managers and facility staff, and Mello, the resident app. Same data, different permissions, genuinely different products. Service charges and utility payments move through it, so the failure modes are financial rather than cosmetic.",
    contributions: [
      "Built both clients — the estate admin panel (React Router 7, TanStack Query, shadcn/ui) and the Mello resident app — and kept them honest against a single evolving API contract.",
      "Designed the permission model that decides what renders: route-level guards plus an isFacilityManager discriminator read from the login response, separating facility-manager and estate-admin experiences inside one authenticated session.",
      "Wrote a centralised apiFetch layer handling token attachment and session expiry, and a query-key factory so cache invalidation stays consistent across roughly twenty feature areas instead of being reinvented per page.",
      "Built estate onboarding as a long branching form that saves each step independently, using React Hook Form and Zod — resumable, because setup rarely finishes in one sitting.",
      "Integrated Paystack and Monnify with a redirect-safe session strategy, so a user returning from their bank lands back in the state they left.",
      "Rebuilt the portfolio dashboard mobile-first after finding most estate managers open it on a phone.",
    ],
    stack: [
      "React 19",
      "TypeScript",
      "React Router 7",
      "TanStack Query",
      "TanStack Table",
      "Zod",
      "Tailwind v4",
      "shadcn/ui",
      "Recharts",
    ],
    href: "https://mello.comtrova.ng/",
    image: comtrova,
  },
  {
    name: "RadCare",
    kind: "Care coordination platform",
    year: "2025—now",
    role: "Frontend engineer · client app + admin console",
    summary:
      "A platform connecting patients with caregivers — scheduling, real-time messaging, care plans and billing on the patient side; credential verification, assignment management and vendor oversight on the admin side. The first thing I've built where the state isn't just fetched, it arrives.",
    contributions: [
      "Built the real-time chat between patients and care providers on Socket.io — message threading, delivery state and history — and reconciled the live socket stream with RTK Query's cache so the two never disagree.",
      "Structured the client app around eleven RTK Query slices (auth, care requests, chat, billing, wallet, complaints, ratings, notifications, profile) sharing one cache and one invalidation strategy.",
      "Integrated Paystack inline for wallet top-ups and service billing, including the reconciliation path for charges that clear at the bank but fail on callback.",
      "Built the admin console: caregiver credential verification workflows, calendar-based care assignment scheduling, and patient and vendor management with filtering and pagination over large lists.",
      "Kept both apps on CSS Modules with a shared component vocabulary, including mobile modal behaviour with body scroll locking.",
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Socket.io",
      "React Router 7",
      "CSS Modules",
      "Chart.js",
      "Paystack",
    ],
    image: radcare,
    status: "In private beta",
  },
  {
    name: "Nutrition International",
    kind: "Internal enterprise systems",
    year: "2025—now",
    role: "Frontend engineer · contract",
    summary:
      "Two internal systems for a global nutrition organisation: a procurement and approval portal, and a card reconciliation tool. Corporate environment — staff sign in against the organisation's directory, finance data comes from their ERP, and the app ships through a containerised pipeline rather than to a static host.",
    contributions: [
      "Built the purchase requisition and PRF workflows across three routing variants — with contract, with P-REQ, and with neither — each carrying its own approval chain and role permissions.",
      "Wired authentication to Azure AD through MSAL so staff use existing organisational credentials, and mapped directory roles onto in-app approval rights.",
      "Built the admin layer — staff and role management, approval route configuration, notification settings — so the workflow can be reconfigured by an administrator instead of a deploy.",
      "Surfaced NetSuite finance data inside requisition views, putting budget context in front of approvers at the moment of decision rather than in a separate system.",
      "Built the card reconciliation tool for matching card transactions against internal records.",
      "Worked inside a Docker and Kubernetes delivery pipeline, with environment configuration handled per deployment target.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Azure AD / MSAL",
      "NetSuite",
      "Styled Components",
      "Docker",
      "Kubernetes",
    ],
    status: "Internal — no public link",
  },
  {
    name: "Kabs Diner",
    kind: "Bookings & storefront",
    year: "2026",
    role: "Full-stack · sole engineer",
    summary:
      "A restaurant platform built end to end: a ticketed supper-club booking system, an online food store, and one admin dashboard behind both. The only project where I designed the database rather than consuming someone else's.",
    contributions: [
      "Modelled the Supabase schema myself — events, bookings, waitlist, products, orders, order_items — including the constraints that stop two people buying the same last seat.",
      "Verified Paystack payments inside a Supabase edge function rather than the browser, so booking and order status can only be written by the server after a charge actually clears.",
      "Built the reservation flow with per-guest details and dietary notes, plus an automatic waitlist when an event sells out.",
      "Built the storefront cart with variant-level stock validation and localStorage persistence that normalises on read, so a stale or malformed cart can't break checkout.",
      "Put the admin dashboard behind Supabase Auth with protected routes and a session hook: events, products, variants, stock levels, bookings and orders in one place.",
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Edge Functions",
      "React Router 7",
      "Paystack",
      "Vite",
    ],
    href: "https://www.kabsdiner.com/",
    image: kabs,
  },
  {
    name: "Hardeverse",
    kind: "Learning platform",
    year: "2025—now",
    role: "Frontend engineer · learner portal + admin",
    summary:
      "The platform behind Harde Business School — course delivery, assessment and certification for learners, with an admin dashboard for the people running the programmes. Four programme types share one codebase, which is most of the interesting problem.",
    contributions: [
      "Built the BLEP enrolment and payment module on Paystack's inline flow, including an unreconciled-payment fallback for when the backend doesn't return an application ID.",
      "Shipped the quiz engine — dynamic question rendering, shuffling, automatic scoring — and jsPDF certificate generation on completion.",
      "Built the admin revenue dashboard: transaction tables, filtering, Recharts breakdowns, and export to CSV, Excel, PDF and Word from the same data layer.",
      "Handled cross-domain auth with cookie-based tokens and interceptor-attached headers, keeping learner, instructor and admin views on a shared component layer.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Chakra UI",
      "TanStack Query",
      "Recharts",
      "TipTap",
      "Paystack",
    ],
    href: "https://hardeverse.org/",
    image: harde,
  },
];

/* Everything else — a quiet index, not six more big cards. */
export const alsoBuilt = [
  {
    name: "SalesUnbox",
    kind: "Retail merchant dashboard",
    year: "2023—24",
    stack: "React · Next.js · Paystack",
    href: "https://www.app.salesunbox.africa/",
  },
  {
    name: "Unbox",
    kind: "Multi-product SaaS site",
    year: "2025",
    stack: "React 19 · Vite · Redux Toolkit",
    href: "https://www.salesunbox.africa/",
  },
  {
    name: "RadCare site",
    kind: "Product marketing site",
    year: "2025",
    stack: "React 19 · CSS Modules",
  },
  {
    name: "Magent",
    kind: "AI marketing dashboard",
    year: "2025",
    stack: "React · Chart.js · Web3",
    href: "https://magent-fe.vercel.app/",
  },
  {
    name: "Radnon Media",
    kind: "Media & content platform",
    year: "2025",
    stack: "Next.js · CMS",
    href: "https://www.radnonmedia.com/",
  },
];

/* ── Held back on purpose ─────────────────────────────────────
   Not listed, and shouldn't be until they're real:

   · SalesUnbox Admin Dashboard — mock data, no API, no auth.
     A prototype beside five live products invites the one
     question you can't answer. Wire it up and it's a strong entry.

   · NMU Alumni API — Node/Express/Mongo, Phase 1. Dependencies
     installed isn't a project. Ship auth + profile endpoints and
     it becomes real backend proof.

   Before publishing the Nutrition International entry, clear it
   with your lead. It's client-internal software.
   ───────────────────────────────────────────────────────────── */

/* ── Direction ────────────────────────────────────────────── */
/*  "Currently learning X" is the most common line on developer
    sites and it reads as noise. What makes it credible is the
    honest status tag — including admitting one of these is early.
    Update `standing` as each one moves; that's the whole point.  */

export const direction = [
  {
    status: "Shipped the surface",
    title: "AI inside products, not bolted onto them",
    body: "I built the dashboards for Magent, an AI marketing platform, which meant designing UI around model output — streaming responses, partial states, results that arrive wrong sometimes. What I want next is the layer underneath: structured extraction, tool calling, and the evaluation loop that tells you whether a prompt change made things better or just different.",
    standing:
      "Comfortable building interfaces over an AI backend. Now working through the integration layer myself.",
  },
  {
    status: "Already doing it",
    title: "Automating the work people currently do by hand",
    body: "Most of what I've built replaces a spreadsheet and a WhatsApp thread — approval routing at Nutrition International, card reconciliation against internal records, multi-format export at Harde, payment verification in a Supabase edge function. It's the part of the job I like most, because the before-and-after is measured in someone's afternoon.",
    standing:
      "Extending into scheduled jobs, webhook-driven reconciliation and background processing rather than user-triggered actions.",
  },
  {
    status: "Early",
    title: "React Native",
    body: "Almost everyone using what I build is on a phone. I rebuilt the Comtrova portfolio dashboard mobile-first after finding estate managers never opened it on a laptop, and Mello is a resident app people check between other things. Responsive web goes a long way, but push notifications, offline reads and camera capture don't.",
    standing:
      "Learning it now. Nothing shipped yet — I'd rather say that than imply otherwise.",
  },
];

export const directionClose =
  "What I want alongside all of this is a team with real users and engineers more senior than me to argue with. I've built the same problem three times now — several clients, one API, permissions deciding what each person sees — and I'd rather go deeper on one product than wider across six.";

/* ── Craft ────────────────────────────────────────────────── */
/*  Opinions, not a process diagram. Anyone can list
    "discovery → design → testing". Only you can defend these.  */

export const principles = [
  {
    title: "Ship the boring version first",
    body: "The unglamorous implementation that works on Monday beats the elegant one that lands in three weeks. I'd rather put something real in front of users and let their behaviour tell me where the complexity actually needs to go.",
  },
  {
    title: "Read the API before you design the state",
    body: "Most frontend messes I've inherited started as an assumption about the shape of a response. I check the payload first, model the state around what the server actually sends, and raise the gap with the backend team on day one rather than patching around it for a month.",
  },
  {
    title: "The last ten percent is the product",
    body: "Loading states, empty states, the error message when the network drops halfway through a payment. Users never see your architecture. They see what happens when things go wrong, and that's the part that decides whether they trust the software.",
  },
];

/* ── Toolkit ──────────────────────────────────────────────── */
/*  Grouped and honest. "Comfortable" vs "worked with" is a
    signal of self-awareness that senior reviewers pick up on.  */

export const toolkit = [
  {
    group: "Every day",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "REST APIs",
      "Git",
    ],
  },
  {
    group: "Regularly",
    items: [
      "Node.js",
      "Express",
      "RTK Query",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Recharts",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    group: "Have shipped with",
    items: [
      "Paystack",
      "Flutterwave",
      "Monnify",
      "WebSockets",
      "GitHub Actions",
      "AWS S3",
      "Jest",
      "Figma",
    ],
  },
];

/* ── Voices ───────────────────────────────────────────────── */

export const voices = [
  {
    quote:
      "Josh takes a design and an unfinished API and makes them agree with each other. He surfaces the gaps early instead of quietly working around them, which saves the whole team time.",
    name: "Oladunjoye Mayowa",
    title: "Co-founder, SalesUnbox International",
  },
  {
    quote:
      "Detail-oriented and fast to understand the business behind the feature. He asks the question the rest of us should have asked.",
    name: "Daniel Adeneye",
    title: "Software Engineer, TechMinte",
  },
];

/* ── Nav ──────────────────────────────────────────────────── */

export const nav = [
  { label: "Story", href: "#story" },
  { label: "Work", href: "#work" },
  { label: "Craft", href: "#craft" },
  { label: "Next", href: "#direction" },
  { label: "Contact", href: "#contact" },
];
