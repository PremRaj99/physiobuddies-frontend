import { motion } from 'framer-motion';
import { ChevronLeft, Edit2, MapPin, Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface PatientLocation {
  id: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export const INITIAL_LOCATIONS: PatientLocation[] = [
  {
    id: 'l1',
    address: '123 Wellness Ave, Apt 4B',
    landmark: 'Near Central Park',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    postalCode: '10001',
  },
];

export const LocationsTab = ({
  locations,
  onSave,
  onDelete,
}: {
  locations: PatientLocation[];
  onSave: (l: PatientLocation) => void;
  onDelete: (id: string) => void;
}) => {
  const [editingLocation, setEditingLocation] = useState<PatientLocation | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLocation) {
      onSave(editingLocation);
      setEditingLocation(null);
      setIsAdding(false);
    }
  };

  const openAddForm = () => {
    setEditingLocation({
      id: `l-${Date.now()}`,
      address: '',
      landmark: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    });
    setIsAdding(true);
  };

  if (editingLocation) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <Card className="border-border pt-0 shadow-sm">
          <CardHeader className="bg-secondary/20 flex flex-row items-center gap-4 border-b py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingLocation(null)}
              className="hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5 text-[#013a63]" />
            </Button>
            <div>
              <CardTitle className="text-xl text-[#012a4a]">
                {isAdding ? 'Add New Address' : 'Edit Address Details'}
              </CardTitle>
              <CardDescription>Enter details for home visit therapy sessions.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[#012a4a]">Street Address</Label>
                <Input
                  required
                  placeholder="House/Flat No., Building Name, Street"
                  value={editingLocation.address}
                  onChange={(e) =>
                    setEditingLocation({ ...editingLocation, address: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#012a4a]">Landmark (Optional)</Label>
                <Input
                  placeholder="e.g. Near Central Park"
                  value={editingLocation.landmark}
                  onChange={(e) =>
                    setEditingLocation({ ...editingLocation, landmark: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[#012a4a]">City</Label>
                  <Input
                    required
                    value={editingLocation.city}
                    onChange={(e) =>
                      setEditingLocation({ ...editingLocation, city: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#012a4a]">State</Label>
                  <Input
                    required
                    value={editingLocation.state}
                    onChange={(e) =>
                      setEditingLocation({ ...editingLocation, state: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#012a4a]">Postal Code</Label>
                  <Input
                    required
                    value={editingLocation.postalCode}
                    onChange={(e) =>
                      setEditingLocation({ ...editingLocation, postalCode: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#012a4a]">Country</Label>
                  <Input
                    required
                    value={editingLocation.country}
                    onChange={(e) =>
                      setEditingLocation({ ...editingLocation, country: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setEditingLocation(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#014f86] text-white hover:bg-[#013a63]">
                  <Save className="mr-2 h-4 w-4" /> Save Address
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#012a4a]">Saved Addresses</h2>
          <p className="text-muted-foreground">Manage your locations for home visits.</p>
        </div>
        <Button
          onClick={openAddForm}
          className="bg-[#a9d6e5] text-[#013a63] transition-colors hover:bg-[#014f86] hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {locations.map((l) => (
          <Card
            key={l.id}
            className="border-border group py-0 shadow-sm transition-colors hover:border-[#a9d6e5]"
          >
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:p-5">
              <div className="bg-secondary/30 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#014f86]">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1 truncate text-lg font-bold text-[#012a4a]">{l.address}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {l.landmark && <span>{l.landmark}, </span>}
                  {l.city}, {l.state} {l.postalCode}
                  <br />
                  {l.country}
                </p>
              </div>
              <div className="flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#014f86]"
                  onClick={() => {
                    setEditingLocation(l);
                    setIsAdding(false);
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 h-8 w-8"
                  onClick={() => onDelete(l.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};
