import { useNavigate, Form, useNavigation, useActionData } from 'react-router';
import { useState } from 'react';
import { mapFrontendToCreateApi } from '~/lib/mappers';
import { PriceValidator } from '~/lib/validation';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { travelService } from '~/lib/travel-service';

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        const priceValidation = PriceValidator.validatePrice(data.estimatedPrice as string);
        if (!priceValidation.isValid) {
            return { error: priceValidation.error };
        }

        const apiTripData = mapFrontendToCreateApi({
            name: data.name as string,
            description: data.description as string,
            estimatedPrice: PriceValidator.parseToBackendFormat(data.estimatedPrice as string),
            duration: parseInt(data.duration as string),
            budget: data.budget as string,
            travelStyle: data.travelStyle as string,
            interests: data.interests as string,
            groupType: data.groupType as string,
            country: data.country as string,
            imageUrls: data.imageUrls ? (data.imageUrls as string).split('\n').filter(url => url.trim() !== '') : undefined,
            itinerary: data.itinerary as string,
            bestTimeToVisit: [],
            weatherInfo: [],
            location: {
                city: data.city as string,
                coordinates: [parseFloat(data.latitude as string) || undefined, parseFloat(data.longitude as string) || undefined],
                openStreetMap: data.openStreetMap as string || undefined
            },
            payment_link: data.paymentLink as string || undefined
        });

        console.log('Creating trip with data:', JSON.stringify(apiTripData, null, 2));
        const createdTrip = await travelService.createTrip(apiTripData);
        console.log('Trip created successfully:', createdTrip);
        return { success: true, tripId: createdTrip.id, trip: createdTrip };
    } catch (error: any) {
        console.error('Failed to create trip:', error);
        return { error: error.message || 'Failed to create trip' };
    }
}

export default function CreateTravel() {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const actionData = useActionData() as {
        error?: string;
        success?: boolean;
        tripId?: string;
        trip?: any;
    } | undefined;
    const isSubmitting = navigation.state === 'submitting';

    const [priceError, setPriceError] = useState<string>('');
    const [priceValue, setPriceValue] = useState<string>('');

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPriceValue(value);

        if (value.trim()) {
            const validation = PriceValidator.validatePrice(value);
            setPriceError(validation.isValid ? '' : validation.error || '');
        } else {
            setPriceError('');
        }
    };

    const handlePriceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim()) {
            const validation = PriceValidator.validatePrice(value);
            if (validation.isValid && validation.value) {
                setPriceValue(validation.value);
                setPriceError('');
            } else {
                setPriceError(validation.error || 'Invalid price');
            }
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-2xl">
            <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="mb-6"
            >
                ← Back to List
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Travel Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                    {actionData?.error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-800 font-medium">Error: {actionData.error}</p>
                        </div>
                    )}
                    {actionData?.success && actionData.trip && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-green-800 font-medium mb-2">✅ Trip "{actionData.trip.name}" created successfully!</p>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => navigate(`/travel/${actionData.tripId}`)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    size="sm"
                                >
                                    View Trip
                                </Button>
                                <Button
                                    onClick={() => navigate('/')}
                                    variant="outline"
                                    size="sm"
                                >
                                    Back to List
                                </Button>
                            </div>
                        </div>
                    )}
                    {!actionData?.success && (
                        <Form method="post" className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Trip Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="e.g., Tropical Paradise in Bali"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Description *</label>
                                <textarea
                                    name="description"
                                    required
                                    className="w-full px-3 py-2 border rounded-md h-20"
                                    placeholder="Brief description of the trip..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Country *</label>
                                    <input
                                        type="text"
                                        name="country"
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="e.g., Indonesia"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="e.g., Ubud"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Duration (days) *</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        min="1"
                                        max="30"
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Latitude</label>
                                    <input
                                        type="number"
                                        name="latitude"
                                        step="0.000001"
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="-8.3405"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Longitude</label>
                                    <input
                                        type="number"
                                        name="longitude"
                                        step="0.000001"
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="115.0920"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">OpenStreetMap URL</label>
                                    <input
                                        type="url"
                                        name="openStreetMap"
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="https://www.openstreetmap.org/relation/3355798"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Budget *</label>
                                    <select
                                        name="budget"
                                        className="w-full px-3 py-2 border rounded-md"
                                    >
                                        <option value="Budget">Budget</option>
                                        <option value="Mid-range">Mid-range</option>
                                        <option value="Luxury">Luxury</option>
                                        <option value="Premium">Premium</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Travel Style *</label>
                                    <select
                                        name="travelStyle"
                                        className="w-full px-3 py-2 border rounded-md"
                                    >
                                        <option value="Relaxed">Relaxed</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Cultural">Cultural</option>
                                        <option value="City Exploration">City Exploration</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Group Type *</label>
                                    <select
                                        name="groupType"
                                        className="w-full px-3 py-2 border rounded-md"
                                    >
                                        <option value="Solo">Solo</option>
                                        <option value="Couple">Couple</option>
                                        <option value="Family">Family</option>
                                        <option value="Friends">Friends</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Estimated Price *</label>
                                    <input
                                        type="text"
                                        name="estimatedPrice"
                                        required
                                        value={priceValue}
                                        onChange={handlePriceChange}
                                        onBlur={handlePriceBlur}
                                        className={`w-full px-3 py-2 border rounded-md ${priceError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="e.g., $1,200"
                                    />
                                    {priceError && (
                                        <p className="mt-1 text-sm text-red-600">{priceError}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Interests *</label>
                                <input
                                    type="text"
                                    name="interests"
                                    required
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="e.g., Beaches, Cultural Sites, Food"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Itinerary (Markdown supported)</label>
                                <textarea
                                    name="itinerary"
                                    className="w-full px-3 py-2 border rounded-md h-48 font-mono text-sm"
                                    placeholder="Write your travel itinerary, markdown supported"
                                    defaultValue=""
                                />
                                <p className="text-xs text-gray-600 mt-1">Add your daily itinerary with markdown formatting. Use ## for days, **bold** for emphasis, and - for activities.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Payment Link</label>
                                <input
                                    type="url"
                                    name="paymentLink"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="https://booking.example.com/trip-name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Image URLs (one per line)</label>
                                <textarea
                                    name="imageUrls"
                                    className="w-full px-3 py-2 border rounded-md h-20 font-mono text-sm"
                                    placeholder="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800
https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800
https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800"
                                    defaultValue="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                                />
                                <p className="text-xs text-gray-600 mt-1">Add one image URL per line. First image will be used as the main thumbnail.</p>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                    {isSubmitting ? 'Creating...' : 'Create Itinerary'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/')}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}