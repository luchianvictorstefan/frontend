import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Link, useLoaderData } from 'react-router';
import type { TravelItinerary } from '~/types/travel';
import { travelService } from '~/lib/travel-service';
import { mapApiListToFrontend } from '~/lib/mappers';

export async function loader() {
    try {
        const apiTrips = await travelService.getAllTrips();
        return mapApiListToFrontend(apiTrips);
    } catch (error) {
        console.error('Failed to load trips:', error);
        throw new Response(
            JSON.stringify({
                title: "Connection Error",
                message: "Unable to connect to the travel server. Please check if the backend service is running.",
                details: "The server might be down or there could be a network issue.",
                action: "Please start the backend server (port 8081) and refresh the page.",
                timestamp: new Date().toISOString()
            }),
            {
                status: 503,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}

export default function TravelList() {
    const itineraries = useLoaderData() as TravelItinerary[];

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">Travel Itineraries</h1>
                <p className="text-muted-foreground mb-4">Explore amazing travel destinations</p>
                <Button asChild>
                    <Link to="/create-travel">Create new Itinerary</Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itineraries.map((trip) => (
                    <Card key={trip.id}>
                        <CardHeader>
                            <div className="relative">
                                <img
                                    src={trip.imageUrls?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'}
                                    alt={trip.name}
                                    className="w-full h-48 object-cover rounded-md mb-4 transition-all duration-300"
                                />
                                {!trip.imageUrls?.[0] && (
                                    <div className="absolute inset-0 bg-gray-200 bg-opacity-30 flex items-center justify-center rounded-md">
                                        <span className="text-gray-500 text-sm font-medium">Placeholder</span>
                                    </div>
                                )}
                            </div>
                            <CardTitle>{trip.name}</CardTitle>
                            <CardDescription>{trip.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <Badge>{trip.country}</Badge>
                                    <Badge variant="secondary">{trip.duration} days</Badge>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="outline">{trip.travelStyle}</Badge>
                                    <Badge variant="outline">{trip.budget}</Badge>
                                </div>
                                <p className="text-lg font-semibold">{trip.estimatedPrice}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link to={`/travel/${trip.id}`}>View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {itineraries.length === 0 && (
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">No itineraries found</p>
                    <Button asChild>
                        <Link to="/create-travel">Create First Itinerary</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}