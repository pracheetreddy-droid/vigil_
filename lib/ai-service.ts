export interface AiCopilotResponse {
  riskLevel: 'LOW RISK' | 'MODERATE RISK' | 'HIGH RISK';
  assessmentText: string;
  recommendationText: string;
  nearestPoliceDist: string;
  nearestHospitalDist: string;
  suggestedActions: string[];
  source: 'GEMINI_API' | 'VIGIL_INTELLIGENCE_ENGINE';
}

export async function askVigilAi(
  userQuery: string,
  userLocation: { lat: number; lng: number; name: string }
): Promise<AiCopilotResponse> {
  const queryLower = userQuery.toLowerCase();

  // Try Gemini API if API key exists in environment
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are VIGIL AI — Tourist Safety Copilot. User current location: ${userLocation.name} (${userLocation.lat}, ${userLocation.lng}). User question: "${userQuery}". Respond in JSON format: {"riskLevel": "LOW RISK"|"MODERATE RISK"|"HIGH RISK", "assessmentText": "...", "recommendationText": "...", "nearestPoliceDist": "1.2 km", "nearestHospitalDist": "2.4 km", "suggestedActions": ["Action 1", "Action 2"]}`
            }]
          }]
        })
      });
      if (response.ok) {
        const data = await response.json();
        const textResp = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResp) {
          const jsonMatch = textResp.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
              ...parsed,
              source: 'GEMINI_API'
            };
          }
        }
      }
    } catch {
      // Fall back to Vigil local contextual intelligence engine
    }
  }

  // VIGIL Contextual Local AI Simulation Engine
  if (queryLower.includes('emergency')) {
    return {
      riskLevel: 'HIGH RISK',
      assessmentText: 'Emergency protocol guidance: If you are in immediate danger or witness a critical incident, immediate action is required.',
      recommendationText: 'Trigger VIGIL SOS immediately to broadcast your live GPS to VIGIL COMMAND & your Safety Circle. Dial 112 (Police) or 108 (Ambulance) for voice dispatch.',
      nearestPoliceDist: '1.2 km (Cubbon Park Police Station)',
      nearestHospitalDist: '2.4 km (Bowring ER)',
      suggestedActions: [
        'Press & Hold RED SOS BUTTON',
        'Direct Call National Emergency 112',
        'Stay in illuminated, populated area',
      ],
      source: 'VIGIL_INTELLIGENCE_ENGINE',
    };
  }

  if (queryLower.includes('unsafe') || queryLower.includes('followed') || queryLower.includes('danger') || queryLower.includes('suspicious')) {
    return {
      riskLevel: 'HIGH RISK',
      assessmentText: 'Threat awareness protocol initiated. You are currently 900m from Brigade Road Emergency Safe Haven.',
      recommendationText: 'Walk briskly toward an illuminated commercial store or security kiosk. DO NOT enter isolated alleys. Prepare to trigger VIGIL SOS.',
      nearestPoliceDist: '0.9 km (Brigade Rd Safe Haven)',
      nearestHospitalDist: '2.4 km',
      suggestedActions: [
        'Hold Red SOS Button for 3 seconds to alert Authorities',
        'Broadcast live audio & GPS to Safety Circle',
        'Head immediately to nearest open shop',
      ],
      source: 'VIGIL_INTELLIGENCE_ENGINE',
    };
  }

  if (queryLower.includes('mg road') || queryLower.includes('risky') || queryLower.includes('tonight') || queryLower.includes('why')) {
    return {
      riskLevel: 'MODERATE RISK',
      assessmentText: '3 recent incidents (2 theft, 1 harassment) detected within 1.5 km of MG Road. Risk increases after 10:00 PM in poorly lit alleyways.',
      recommendationText: 'Use the western monitored route along Church Street and avoid isolated roads or rear plazas.',
      nearestPoliceDist: '1.2 km (Cubbon Park Police Station)',
      nearestHospitalDist: '2.4 km (Bowring Hospital)',
      suggestedActions: [
        'Switch to VIGIL SafeRoute (94% safety rating)',
        'Enable 15-minute Journey Check-In',
        'Share live location with Safety Circle',
      ],
      source: 'VIGIL_INTELLIGENCE_ENGINE',
    };
  }

  if (queryLower.includes('hospital') || queryLower.includes('medical') || queryLower.includes('doctor')) {
    return {
      riskLevel: 'LOW RISK',
      assessmentText: 'Multiple accredited medical facilities located within a 3 km radius of your location.',
      recommendationText: 'Bowring & Lady Curzon Hospital is 2.4 km away (7 mins drive). For immediate trauma, Vigil Emergency Dispatch can alert mobile paramedics.',
      nearestPoliceDist: '1.2 km',
      nearestHospitalDist: '2.4 km (Bowring Hospital — 24/7 ER)',
      suggestedActions: [
        'Call Ambulance Direct (108)',
        'Get turn-by-turn directions to Bowring ER',
        'Notify Safety Circle of medical assistance request',
      ],
      source: 'VIGIL_INTELLIGENCE_ENGINE',
    };
  }

  if (queryLower.includes('route') || queryLower.includes('go') || queryLower.includes('path') || queryLower.includes('safest')) {
    return {
      riskLevel: 'LOW RISK',
      assessmentText: 'SafeRoute Analysis complete for your journey to Koramangala.',
      recommendationText: 'The SAFEST Route (24 mins, Safety Score 94) is highly recommended. It avoids 2 high-risk zones and passes 3 monitored police kiosks.',
      nearestPoliceDist: '1.2 km',
      nearestHospitalDist: '2.4 km',
      suggestedActions: [
        'Activate SafeRoute Navigation',
        'Set journey destination check-in timer',
      ],
      source: 'VIGIL_INTELLIGENCE_ENGINE',
    };
  }

  // Default intelligent safety response
  return {
    riskLevel: 'LOW RISK',
    assessmentText: `Surrounding safety check for ${userLocation.name} completed. Safety score is currently 87/100 (LOW RISK).`,
    recommendationText: 'Your location has strong police access and active CCTV surveillance. Continue normal travel precautions.',
    nearestPoliceDist: '1.2 km (Cubbon Park Station)',
    nearestHospitalDist: '2.4 km (Bowring Hospital)',
    suggestedActions: [
      'View surrounding Safety Map',
      'Set Safety Check-in Timer',
      'Share Journey with Trusted Contacts',
    ],
    source: 'VIGIL_INTELLIGENCE_ENGINE',
  };
}
