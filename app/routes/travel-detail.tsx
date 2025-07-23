import { Link, useLoaderData } from 'react-router';
import type { TravelItinerary } from '~/types/travel';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { mapApiToFrontend } from '~/lib/mappers';
import { travelService } from '~/lib/travel-service';

export async function loader({ params }: { params: { tripId?: string } }) {
    const { tripId } = params;

    if (!tripId) {
        throw new Response('Trip ID is required', { status: 400 });
    }

    try {
        const apiTrip = await travelService.getTripById(tripId);
        return mapApiToFrontend(apiTrip);
    } catch (error) {
        console.error('Failed to load trip:', error);
        throw new Response('Trip not found', { status: 404 });
    }
}

export default function TravelDetail() {
    const trip = useLoaderData() as TravelItinerary;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-6">
                <Button asChild variant="outline">
                    <Link to="/">← Back to List</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <img
                        src={trip.imageUrls?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'}
                        alt={trip.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    {trip.imageUrls?.length || 0 > 1 && (
                        <div className="grid grid-cols-2 gap-2">
                            {trip.imageUrls?.slice(1, 3).map((url, index) => (
                                <img key={index} src={url} alt={`${trip.name} ${index + 2}`} className="w-full h-32 object-cover rounded" />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">{trip.name}</h1>
                    <p className="text-lg mb-4">{trip.description}</p>

                    <div className="space-y-4">
                        <div className="flex gap-2 flex-wrap">
                            <Badge>{trip.country}</Badge>
                            <Badge variant="secondary">{trip.duration} days</Badge>
                            <Badge variant="outline">{trip.travelStyle}</Badge>
                            <Badge variant="outline">{trip.budget}</Badge>
                            <Badge variant="outline">{trip.groupType}</Badge>
                        </div>

                        <div className="text-2xl font-bold">{trip.estimatedPrice}</div>

                        <div>
                            <h3 className="font-semibold mb-2">Interests</h3>
                            <p className="text-muted-foreground">{trip.interests}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Best Time to Visit</h3>
                            <ul className="space-y-1">
                                {trip.bestTimeToVisit.map((time, index) => (
                                    <li key={index} className="text-sm text-muted-foreground">{time}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Weather</h3>
                            <ul className="space-y-1">
                                {trip.weatherInfo.map((weather, index) => (
                                    <li key={index} className="text-sm text-muted-foreground">{weather}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Daily Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm max-w-none">
                        {trip.itinerary ? (
                            <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                {trip.itinerary}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No itinerary provided yet.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}