# VIGIL — Always aware. Always with you.

> **Primary Tagline**: Always aware. Always with you.  
> **Secondary Tagline**: Explore freely. Stay protected.  
> **Core Product Concept**: Journey Intelligence — *"Is my journey currently safe, and what can I do to make it safer?"*

---

## 🛡️ Problem

Global travel safety faces critical systemic challenges:
1. **Navigational Blindness**: Solo travelers and tourists frequently wander into unlit alleys or opportunistic crime hotspots without prior warning.
2. **Emergency Friction**: Traditional 911/112 calls lack automatic GPS telemetry, cryptographic identity verification, and medical emergency context.
3. **Authority Information Asymmetry**: Police and municipal tourism departments lack predictive spatio-temporal hotspot analytics to deploy preventative patrols before incidents escalate.

---

## ⚡ Solution & Ecosystem Architecture

**VIGIL** is an AI-powered tourist safety platform that connects all stakeholders into one unified ecosystem:

```
TOURIST ➔ LOCATION INTELLIGENCE ➔ AI RISK ANALYSIS ➔ EMERGENCY RESPONSE ➔ AUTHORITY COMMAND CENTER
```

- **For Tourists**: Real-time surround scanning, transparent multi-factor safety scoring (**VIGIL Safety Index**), context-aware **VIGIL AI Safety Copilot**, **SafeRoute** navigation, **VIGIL ID** QR verification, **Safety Circle** journey sharing, and instant **SOS**.
- **For Authorities**: **VIGIL COMMAND** emergency operations dashboard, live SOS dispatch queue, real-time incident audit stream with severity filters, municipal risk zone management, and **VIGIL Intelligence** AI hotspot pattern recognition.

---

## ✨ Primary Product Differentiators

| Feature | Description |
| :--- | :--- |
| **VIGIL Safety Index** | Transparent multi-factor heuristic scoring (0-100) factoring incident density (18%), emergency access (92%), recent activity (12%), and temporal risk (20%). |
| **VIGIL Safety Map** | High-contrast dark tactical geospatial map showing low (green), moderate (amber), and high-risk (red) zones, police kiosks, hospitals, and real-time tourist telemetry. |
| **VIGIL SafeRoute** | Safety-aware route comparison engine: **FASTEST** (18 min, safety 48) vs **BALANCED** (21 min, safety 71) vs **SAFEST** (24 min, safety 94, recommended). |
| **VIGIL AI Copilot** | Context-aware AI conversational safety copilot answering queries using real-time surroundings, incident logs, and nearby hospital/police distances. |
| **VIGIL Digital ID** | Cryptographically verifiable digital tourist credential with dynamic QR code linking to `/verify/VG-284921`. |
| **VIGIL SOS** | 1-touch emergency telemetry broadcast with confirmation safeguard, live GPS streaming, and authority dispatch escalation. |
| **VIGIL Safety Circle** | Trusted contact network (Mom, Dad, Friend) with one-click live journey broadcasting and status monitoring. |
| **Journey Check-In** | 15-minute countdown safety timer with automated missed check-in escalation to VIGIL COMMAND. |
| **VIGIL COMMAND** | State operations center with live SOS queue, incident stream filtering, risk zone management, and tourist inspection modals. |
| **VIGIL Intelligence** | Spatio-temporal cluster detection (+34% surge alert) generating preventative patrol deployment recommendations for authorities. |
| **Analytics Suite** | Recharts interactive data visualizations covering incident density over time, incident types, sector risk distribution, and response times. |
| **Emergency Hub** | Direct emergency hotlines (112, 108, 101, 181, 1363) and nearby verified emergency medical facilities. |
| **Multilingual Support** | Instant switching between English, Hindi (हिंदी), Kannada (ಕನ್ನಡ), Tamil (தமிழ்), and Telugu (తెలుగు). |

---

## 🚀 Aisha Demo Scenario Walkthrough (18 Steps)

The platform includes a built-in guided scenario bar following Aisha's journey in Bengaluru:

1. **Aisha Arrives in Bengaluru**: Opens VIGIL and generates verified Digital Tourist ID (`/id` • `VG-284921`).
2. **Live Location Intelligence**: VIGIL automatically detects GPS position (*Near MG Road Metro*) and scans surroundings (`/`).
3. **Safety Index Generated**: VIGIL computes real-time Safety Index (**87/100 LOW RISK**) on the Tourist Dashboard (`/dashboard`).
4. **Safety Map Opened**: Aisha explores the surrounding tactical map to view nearby risk sectors and police kiosks (`/map`).
5. **Moderate-Risk Zone Detected**: VIGIL flags **MG Road Junction** (Risk Score 72, MODERATE RISK) with evening incident spikes.
6. **Aisha Asks VIGIL AI**: Inquires *"Is it safe to visit this area tonight?"* (`/copilot`).
7. **AI Explains Risk & Recommendations**: AI provides structured advice: avoid unlit side alleys after 10 PM, use western route.
8. **VIGIL Recommends SafeRoute**: Aisha opens SafeRoute engine comparing Fastest vs Safest (`/saferoute`).
9. **Aisha Starts Journey**: Selects **SAFEST ROUTE** (24 min, 94/100 Safety Rating) passing 3 police kiosks.
10. **Shares Journey with Safety Circle**: Broadcasts live journey link and ETA to Mom, Dad, and Friend (`/circle`).
11. **Suspicious Incident Occurs**: Aisha prepares a community incident report (`/report`).
12. **Aisha Activates SOS**: Holds emergency SOS trigger; confirmation timer prevents accidental activation (`/sos`).
13. **Emergency Alert Created**: System displays nearest police (1.2 km) and hospital (2.4 km) while transmitting telemetry.
14. **VIGIL COMMAND Receives Alert**: Authority operations center receives flashing SOS for Aisha (`/authority`).
15. **Authority Views Aisha’s Safety Profile**: Inspects verified credentials, live GPS coordinates, and journey history.
16. **Incident Recorded & Cataloged**: Incident #INC-82931 is saved to the municipal database with Under Review status.
17. **VIGIL Intelligence Identifies Hotspot**: AI recognizes +34% incident surge in Sector 4 and suggests patrol deployment (`/authority/intelligence`).
18. **Authority Receives Recommendation & Dispatches**: Authority approves AI recommendation and dispatches Mobile Patrol Unit #4.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, Dark Theme Architecture, Custom Glassmorphism
- **Motion & Interactions**: Framer Motion
- **Icons**: Lucide React
- **Data Visualization**: Recharts (Line, Bar, Pie, Vertical layout charts)
- **QR Code Engine**: `qrcode.react` (SVG High Error Correction)
- **AI Service Layer**: Google Gemini API + VIGIL Contextual Local AI Simulation Engine

---

## 💻 Running Locally

### Prerequisites
- Node.js v18.0+ or v20.0+
- npm v9.0+

### Setup Instructions

```bash
# 1. Clone repository
git clone https://github.com/your-username/vigil.git
cd vigil

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

The application runs seamlessly in **DEMO MODE** out of the box with realistic seeded telemetry. To connect live Gemini AI:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🔒 Privacy & Safety Disclaimers

- **Location Privacy**: Location telemetry is shared only during active journey sharing or emergency SOS mode.
- **Demo Mode**: Emergency SOS triggers, police dispatches, and hotline links are simulated for demonstration. No real 911/112 calls or SMS messages are sent.
- **Informational Guidance**: VIGIL Safety Index and AI Copilot provide algorithmic estimates and do not guarantee crime prevention.

---

**VIGIL** — *Always aware. Always with you.*
