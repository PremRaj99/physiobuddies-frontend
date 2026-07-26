import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, CheckCircle2, ChevronLeft, ChevronRight, LocateFixed, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useCreatePatientLocation } from '@/hooks/usePatient';
import type { PatientLocationItem } from '@/services/patient.service';
import { LocationPickerMap } from '@/components/common/LocationPickerMap';

// All 28 States and 8 Union Territories of India
const INDIAN_STATES_AND_UTS = [
  // 28 States
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  // 8 Union Territories
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

const POPULAR_COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'United Arab Emirates',
  'Singapore',
  'Germany',
];

type NewLocationForm = {
  address: string;
  landmark: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

interface LocationStepProps {
  locations: PatientLocationItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  locations,
  selectedId,
  onSelect,
  onNext,
  onBack,
  isLoading,
}) => {
  const [showNewForm, setShowNewForm] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 28.6139,
    lng: 77.2090, // Default to New Delhi, India
  });
  const [isLocating, setIsLocating] = useState(false);

  const createLocation = useCreatePatientLocation();
  const { register, handleSubmit, reset, formState, setValue } = useForm<NewLocationForm>({
    defaultValues: {
      country: 'India',
      state: 'Delhi',
      address: '',
      landmark: '',
      city: '',
      postalCode: '',
    },
  });

  // Fetch user current geolocation
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(6));
        const lng = parseFloat(position.coords.longitude.toFixed(6));
        setCoords({ lat, lng });
        setIsLocating(false);
        toast.success(`Location pinned: Lat ${lat}, Lng ${lng}`);
      },
      (error) => {
        setIsLocating(false);
        toast.error(`Unable to retrieve location: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const onSubmit = async (data: NewLocationForm) => {
    try {
      await createLocation.mutateAsync({
        address: data.address,
        landmark: data.landmark,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country || 'India',
        location: coords,
      });
      toast.success('Address added successfully.');
      reset();
      setShowNewForm(false);
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Could not add address.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#012a4a]">Treatment Location</h2>
          <p className="text-muted-foreground">Where should the therapist visit?</p>
        </div>
        <Button variant="outline" className="border-[#014f86] text-[#014f86]" onClick={() => setShowNewForm(!showNewForm)}>
          <Plus className="mr-2 h-4 w-4" /> New Location
        </Button>
      </div>

      {showNewForm ? (
        <Card className="mb-6 border-[#a9d6e5] bg-[#f8fbfa] pt-0">
          <CardHeader>
            <CardTitle className="py-4 text-[#013a63]">Add New Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="House/Flat No., Building, Street Name" {...register('address', { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input id="landmark" placeholder="Near metro station, park, etc." {...register('landmark', { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="e.g. New Delhi" {...register('city', { required: true })} />
                </div>
                
                {/* State Selection with 28 States & 8 Union Territories */}
                <div className="space-y-2">
                  <Label htmlFor="state">State / Union Territory</Label>
                  <div className="relative">
                    <Input
                      id="state"
                      list="india-states-list"
                      placeholder="Select or type state"
                      {...register('state', { required: true })}
                    />
                    <datalist id="india-states-list">
                      {INDIAN_STATES_AND_UTS.map((st) => (
                        <option key={st} value={st} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">Postal Code</Label>
                  <Input id="zip" placeholder="e.g. 110001" {...register('postalCode', { required: true })} />
                </div>

                {/* Country Selection */}
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <div className="relative">
                    <Input
                      id="country"
                      list="countries-list"
                      placeholder="Country"
                      {...register('country', { required: true })}
                    />
                    <datalist id="countries-list">
                      {POPULAR_COUNTRIES.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>
                </div>
              </div>

              {/* Modular Leaflet Map Pinpoint Picker */}
              <LocationPickerMap coords={coords} onChange={setCoords} />

              <div className="mt-4 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowNewForm(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#014f86] hover:bg-[#013a63]" disabled={createLocation.isPending || !formState.isValid}>
                  {createLocation.isPending ? 'Saving...' : 'Save Address'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      ) : locations.length === 0 ? (
        <p className="text-muted-foreground mb-8 py-8 text-center text-sm">
          No saved addresses. Add one to continue.
        </p>
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {locations.map((l) => (
            <Card
              key={l.id}
              className={cn(`cursor-pointer py-0 transition-all`, selectedId === l.id ? 'border-[#014f86] bg-[#014f86]/5 ring-1 ring-[#014f86]' : 'hover:border-[#a9d6e5]')}
              onClick={() => onSelect(l.id)}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#a9d6e5]/40">
                  <MapPin className="h-5 w-5 text-[#013a63]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#012a4a]">{l.address}</h4>
                  <p className="text-muted-foreground text-sm">{l.city}, {l.state} {l.postalCode}, {l.country}</p>
                  {l.landmark && <p className="text-muted-foreground mt-1 text-xs">Landmark: {l.landmark}</p>}
                </div>
                {selectedId === l.id && <CheckCircle2 className="ml-auto h-5 w-5 text-[#014f86]" />}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button size="lg" className="bg-[#014f86] hover:bg-[#013a63]" disabled={!selectedId || showNewForm} onClick={onNext}>
          Condition Details <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

