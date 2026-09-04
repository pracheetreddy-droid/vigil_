export interface TouristProfile {
  id: string;
  name: string;
  nationality: string;
  passportHash: string;
  status: 'SAFE' | 'WARNING' | 'EMERGENCY';
  verificationStatus: 'VERIFIED' | 'PENDING';
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    country: string;
  };
  safetyScore: number;
  lastCheckIn: string;
  nextCheckInMinutes: number;
  contacts: { name: string; relation: string; phone: string; verified: boolean }[];
  currentJourney?: {
    destination: string;
    eta: string;
    routeType: 'FASTEST' | 'BALANCED' | 'SAFEST';
    safetyStatus: string;
    startedAt: string;
  };
}

export interface RiskZone {
  id: string;
  name: string;
  center: [number, number];
  radiusMeters: number;
  riskScore: number;
  level: 'LOW' | 'MODERATE' | 'HIGH';
  incidentsBreakdown: { theft: number; harassment: number; accidents: number; other: number };
  trend: 'UP' | 'STABLE' | 'DOWN';
  trendPercent: number;
  peakPeriod: string;
  aiAssessment: string;
  recommendation: string;
}

export interface IncidentReport {
  id: string;
  type: 'Theft' | 'Harassment' | 'Accident' | 'Medical Emergency' | 'Lost Person' | 'Suspicious Activity' | 'Other';
  title: string;
  locationName: string;
  lat: number;
  lng: number;
  timestamp: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'UNDER REVIEW' | 'INVESTIGATING' | 'DISPATCHED' | 'RESOLVED';
  description: string;
  anonymous: boolean;
  reporterId?: string;
}

export interface EmergencyService {
  id: string;
  name: string;
  type: 'POLICE' | 'HOSPITAL' | 'FIRE' | 'PATROL';
  lat: number;
  lng: number;
  distanceKm: number;
  phone: string;
  available: boolean;
}

export interface RouteOption {
  id: 'FASTEST' | 'BALANCED' | 'SAFEST';
  label: string;
  timeMinutes: number;
  safetyScore: number;
  distanceKm: number;
  recommended: boolean;
  reason: string;
  coordinates: [number, number][];
}

export interface SosAlert {
  id: string;
  touristId: string;
  touristName: string;
  nationality: string;
  lat: number;
  lng: number;
  locationName: string;
  timestamp: string;
  riskLevel: 'HIGH RISK' | 'CRITICAL';
  status: 'ALERT SENT' | 'DISPATCHED' | 'ON SCENE' | 'RESOLVED';
  batteryLevel: number;
  contactsNotified: number;
}

export const DEMO_TOURIST: TouristProfile = {
  id: 'VG-284921',
  name: 'Aisha Rahman',
  nationality: 'India',
  passportHash: 'IND-9872****',
  status: 'SAFE',
  verificationStatus: 'VERIFIED',
  location: {
    lat: 12.9716,
    lng: 77.5946,
    address: 'Near MG Road Metro Station',
    city: 'Bengaluru',
    country: 'India',
  },
  safetyScore: 87,
  lastCheckIn: '10:14 PM',
  nextCheckInMinutes: 12,
  contacts: [
    { name: 'Mom', relation: 'Mother', phone: '+91 98765 43210', verified: true },
    { name: 'Dad', relation: 'Father', phone: '+91 98765 43211', verified: true },
    { name: 'Friend (Sneha)', relation: 'Travel Companion', phone: '+91 98765 43212', verified: true },
  ],
  currentJourney: {
    destination: 'Koramangala 5th Block',
    eta: '24 mins (10:48 PM)',
    routeType: 'SAFEST',
    safetyStatus: 'PROTECTED ROUTE',
    startedAt: '10:20 PM',
  },
};

export const DEMO_RISK_ZONES: RiskZone[] = [
  {
    id: 'rz-1',
    name: 'MG Road Junction & Alleyways',
    center: [12.9750, 77.6080],
    radiusMeters: 650,
    riskScore: 72,
    level: 'MODERATE',
    incidentsBreakdown: { theft: 4, harassment: 2, accidents: 1, other: 1 },
    trend: 'UP',
    trendPercent: 18,
    peakPeriod: '9:00 PM – 12:00 AM',
    aiAssessment: 'Elevated theft and harassment risk in dimly lit side alleys after 9 PM. Increased tourist footfall attracts opportunists.',
    recommendation: 'Stay on the main illuminated thoroughfare. Avoid poorly lit rear lanes behind commercial plazas.',
  },
  {
    id: 'rz-2',
    name: 'Shivajinagar Market Peripheral',
    center: [12.9850, 77.6010],
    radiusMeters: 800,
    riskScore: 78,
    level: 'HIGH',
    incidentsBreakdown: { theft: 6, harassment: 3, accidents: 2, other: 2 },
    trend: 'UP',
    trendPercent: 34,
    peakPeriod: '7:00 PM – 11:30 PM',
    aiAssessment: 'Potential Hotspot Detected. High density crowding during peak evening hours with lower CCTV coverage.',
    recommendation: 'Use monitored transit routes. Maintain high awareness of personal belongings.',
  },
  {
    id: 'rz-3',
    name: 'Commercial Street West',
    center: [12.9820, 77.6090],
    radiusMeters: 500,
    riskScore: 65,
    level: 'MODERATE',
    incidentsBreakdown: { theft: 3, harassment: 1, accidents: 0, other: 2 },
    trend: 'STABLE',
    trendPercent: 0,
    peakPeriod: '8:00 PM – 10:30 PM',
    aiAssessment: 'Moderate risk associated with congested narrow market walkways.',
    recommendation: 'Prefer main arterial access points.',
  },
  {
    id: 'rz-4',
    name: 'Indiranagar 100ft Road Corridor',
    center: [12.9784, 77.6408],
    radiusMeters: 900,
    riskScore: 35,
    level: 'LOW',
    incidentsBreakdown: { theft: 1, harassment: 0, accidents: 1, other: 0 },
    trend: 'DOWN',
    trendPercent: 12,
    peakPeriod: '11:00 PM – 2:00 AM',
    aiAssessment: 'Active police patrol zone with high commercial lighting and public presence.',
    recommendation: 'Optimal safe walking environment.',
  },
];

export const DEMO_INCIDENTS: IncidentReport[] = [
  {
    id: 'INC-82931',
    type: 'Theft',
    title: 'Bag Snatching near Metro Entrance',
    locationName: 'MG Road Metro Gate 2',
    lat: 12.9752,
    lng: 77.6065,
    timestamp: '10:37 PM',
    severity: 'MEDIUM',
    status: 'UNDER REVIEW',
    description: 'Tourist reported stolen handbag by a passerby on a motor scooter.',
    anonymous: false,
    reporterId: 'VG-90812',
  },
  {
    id: 'INC-82914',
    type: 'Harassment',
    title: 'Unsolicited Following along Alleyway',
    locationName: 'Brigade Road Junction',
    lat: 12.9720,
    lng: 77.6070,
    timestamp: '10:15 PM',
    severity: 'HIGH',
    status: 'INVESTIGATING',
    description: 'Group of two individuals following solo female traveler. Dispersed when approaching security kiosk.',
    anonymous: true,
  },
  {
    id: 'INC-82890',
    type: 'Suspicious Activity',
    title: 'Unattended Luggage',
    locationName: 'Church Street Promenade',
    lat: 12.9740,
    lng: 77.6040,
    timestamp: '09:40 PM',
    severity: 'LOW',
    status: 'RESOLVED',
    description: 'Backpack left near bench inspected by beat constable; owner identified.',
    anonymous: true,
  },
  {
    id: 'INC-82855',
    type: 'Medical Emergency',
    title: 'Dehydration & Dizziness',
    locationName: 'Commercial Street South',
    lat: 12.9810,
    lng: 77.6080,
    timestamp: '08:30 PM',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    description: 'First aid rendered by VIGIL community safe haven shopkeeper.',
    anonymous: false,
  },
];

export const DEMO_EMERGENCY_SERVICES: EmergencyService[] = [
  {
    id: 'es-1',
    name: 'Cubbon Park Police Station',
    type: 'POLICE',
    lat: 12.9770,
    lng: 77.5990,
    distanceKm: 1.2,
    phone: '+91 80 2294 2222',
    available: true,
  },
  {
    id: 'es-2',
    name: 'Bowring & Lady Curzon Hospital',
    type: 'HOSPITAL',
    lat: 12.9830,
    lng: 77.6020,
    distanceKm: 2.4,
    phone: '+91 80 2559 1325',
    available: true,
  },
  {
    id: 'es-3',
    name: 'Vigil Tactical Patrol Unit #4',
    type: 'PATROL',
    lat: 12.9730,
    lng: 77.6030,
    distanceKm: 1.8,
    phone: '+91 80 1120 0004',
    available: true,
  },
  {
    id: 'es-4',
    name: 'Brigade Road Emergency Safe Haven',
    type: 'PATROL',
    lat: 12.9710,
    lng: 77.6080,
    distanceKm: 0.9,
    phone: '+91 80 1120 0009',
    available: true,
  },
];

export const DEMO_ROUTES: RouteOption[] = [
  {
    id: 'FASTEST',
    label: 'FASTEST ROUTE',
    timeMinutes: 18,
    safetyScore: 48,
    distanceKm: 4.2,
    recommended: false,
    reason: 'Passes through 2 dimly lit unmonitored alleys and MG Road High-Risk Zone.',
    coordinates: [
      [12.9716, 77.5946],
      [12.9750, 77.6080],
      [12.9800, 77.6150],
      [12.9352, 77.6245],
    ],
  },
  {
    id: 'BALANCED',
    label: 'BALANCED ROUTE',
    timeMinutes: 21,
    safetyScore: 71,
    distanceKm: 4.9,
    recommended: false,
    reason: 'Uses major arterial roads; skirts moderate risk zone with medium lighting.',
    coordinates: [
      [12.9716, 77.5946],
      [12.9710, 77.6050],
      [12.9650, 77.6180],
      [12.9352, 77.6245],
    ],
  },
  {
    id: 'SAFEST',
    label: 'SAFEST ROUTE',
    timeMinutes: 24,
    safetyScore: 94,
    distanceKm: 5.6,
    recommended: true,
    reason: 'Recommended: Avoids 2 high-risk zones, passes 3 active police kiosks and full CCTV corridors.',
    coordinates: [
      [12.9716, 77.5946],
      [12.9770, 77.5990],
      [12.9784, 77.6408],
      [12.9352, 77.6245],
    ],
  },
];

export const DEMO_SOS_ALERTS: SosAlert[] = [
  {
    id: 'SOS-901',
    touristId: 'VG-284921',
    touristName: 'Aisha Rahman',
    nationality: 'India',
    lat: 12.9752,
    lng: 77.6065,
    locationName: 'MG Road Metro Gate 2',
    timestamp: '2 mins ago (10:42 PM)',
    riskLevel: 'HIGH RISK',
    status: 'ALERT SENT',
    batteryLevel: 84,
    contactsNotified: 3,
  },
  {
    id: 'SOS-889',
    touristId: 'VG-19402',
    touristName: 'Marcus Vance',
    nationality: 'United Kingdom',
    lat: 12.9850,
    lng: 77.6010,
    locationName: 'Shivajinagar Market Area',
    timestamp: '14 mins ago (10:30 PM)',
    riskLevel: 'CRITICAL',
    status: 'DISPATCHED',
    batteryLevel: 62,
    contactsNotified: 2,
  },
  {
    id: 'SOS-870',
    touristId: 'VG-30219',
    touristName: 'Elena Rostova',
    nationality: 'Spain',
    lat: 12.9740,
    lng: 77.6040,
    locationName: 'Church Street Junction',
    timestamp: '52 mins ago (09:52 PM)',
    riskLevel: 'HIGH RISK',
    status: 'RESOLVED',
    batteryLevel: 91,
    contactsNotified: 3,
  },
];
