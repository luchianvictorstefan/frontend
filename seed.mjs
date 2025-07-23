const API_BASE = 'http://localhost:8081/api';

const trips = [
  {
    name: "Tropical Paradise in Bali",
    description: "Experience the perfect blend of relaxation and adventure in Bali's pristine beaches and ancient temples.",
    estimatedPrice: 1200,
    duration: 7,
    budget: "Mid-range",
    travelStyle: "Relaxed",
    interests: "Beaches & Water Activities",
    groupType: "Couple",
    country: "Indonesia",
    imageUrls: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"],
    locationCity: "Ubud",
    locationLatitude: -8.3405,
    locationLongitude: 115.092,
    locationOpenStreetMap: "https://www.openstreetmap.org/relation/3355798",
    paymentLink: "https://booking.example.com/bali-paradise"
  },
  {
    name: "Paris Romance Getaway",
    description: "Fall in love with the City of Light through iconic landmarks, charming cafes, and romantic Seine river cruises.",
    estimatedPrice: 2500,
    duration: 5,
    budget: "Luxury",
    travelStyle: "Cultural",
    interests: "Historical Sites",
    groupType: "Couple",
    country: "France",
    imageUrls: ["https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"],
    locationCity: "Paris",
    locationLatitude: 48.8566,
    locationLongitude: 2.3522,
    locationOpenStreetMap: "https://www.openstreetmap.org/relation/7444",
    paymentLink: "https://booking.example.com/paris-romance"
  },
  {
    name: "Tokyo Tech Adventure",
    description: "Explore the perfect blend of ultra-modern technology and traditional Japanese culture in Tokyo.",
    estimatedPrice: 1800,
    duration: 6,
    budget: "Mid-range",
    travelStyle: "City Exploration",
    interests: "Photography Spots",
    groupType: "Solo",
    country: "Japan",
    imageUrls: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80"
    ],
    locationCity: "Tokyo",
    locationLatitude: 35.6762,
    locationLongitude: 139.6503,
    locationOpenStreetMap: "https://www.openstreetmap.org/relation/1543125",
    paymentLink: "https://booking.example.com/tokyo-tech",
    itinerary: JSON.stringify([
      {
        day: 1,
        location: "Tokyo",
        activities: [
          { time: "Morning", description: "Arrive at Haneda Airport" },
          { time: "Afternoon", description: "Check into hotel in Shibuya" },
          { time: "Evening", description: "Shibuya Crossing and Hachiko Statue" }
        ]
      },
      {
        day: 2,
        location: "Tokyo",
        activities: [
          { time: "Morning", description: "Tsukiji Outer Market breakfast" },
          { time: "Afternoon", description: "TeamLab Planets digital art museum" },
          { time: "Evening", description: "Tokyo Skytree sunset views" }
        ]
      }
    ]),
    bestTimeToVisit: [
      "🌸 March to May: Cherry blossom season",
      "🍁 October to November: Autumn colors"
    ],
    weatherInfo: [
      "🌸 Spring: 10-20°C (50-68°F)",
      "☀️ Summer: 22-30°C (72-86°F)",
      "🍁 Autumn: 15-25°C (59-77°F)"
    ]
  },
  {
    name: "Swiss Alps Adventure",
    description: "Breathtaking mountain views, world-class skiing, and charming alpine villages in the heart of Switzerland.",
    estimatedPrice: 3200,
    duration: 8,
    budget: "Premium",
    travelStyle: "Adventure",
    interests: "Hiking & Nature Walks",
    groupType: "Friends",
    country: "Switzerland",
    imageUrls: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=800&q=80"
    ],
    locationCity: "Interlaken",
    locationLatitude: 46.6863,
    locationLongitude: 7.8632,
    locationOpenStreetMap: "https://www.openstreetmap.org/relation/1682411",
    paymentLink: "https://booking.example.com/swiss-alps",
    itinerary: JSON.stringify([
      {
        day: 1,
        location: "Interlaken",
        activities: [
          { time: "Morning", description: "Arrive at Zurich Airport" },
          { time: "Afternoon", description: "Train to Interlaken" },
          { time: "Evening", description: "Explore Interlaken town" }
        ]
      },
      {
        day: 2,
        location: "Interlaken",
        activities: [
          { time: "Morning", description: "Jungfraujoch - Top of Europe" },
          { time: "Afternoon", description: "Glacier hiking experience" },
          { time: "Evening", description: "Traditional Swiss fondue dinner" }
        ]
      }
    ]),
    bestTimeToVisit: [
      "❄️ December to March: Perfect skiing conditions",
      "☀️ June to September: Ideal for hiking"
    ],
    weatherInfo: [
      "❄️ Winter: -5 to 5°C (23-41°F)",
      "☀️ Summer: 15-25°C (59-77°F)"
    ]
  }
];

console.log('🌱 Seeding trips...');

trips.forEach((trip, i) => {
  const json = JSON.stringify(trip);
  console.log(`\n# Trip ${i + 1}: ${trip.name}`);
  console.log(`curl -X POST ${API_BASE}/trips \\\n  -H "Content-Type: application/json" \\\n  -d '${json}'`);
});

for (const trip of trips) {
  try {
    const res = await fetch(`${API_BASE}/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip)
    });

    if (res.ok) {
      const result = await res.json();
      console.log(`✅ Created: ${result.name}`);
    } else {
      console.log(`❌ Failed: ${trip.name} (${res.status})`);
    }
  } catch (error) {
    console.log(`❌ Network error: ${error.message}`);
  }
}

console.log('🎉 Done!');