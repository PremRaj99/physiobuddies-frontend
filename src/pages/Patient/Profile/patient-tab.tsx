import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, Edit2, Phone, Plus, Save, Trash2, User } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface PatientDetail {
  id: string;
  name: string;
  dob: string;
  gender: Gender;
  phone: string;
}

export const INITIAL_PATIENTS: PatientDetail[] = [
  { id: 'p1', name: 'Robert Fox', dob: '1985-06-15', gender: 'MALE', phone: '+1 (555) 123-4567' },
  {
    id: 'p2',
    name: 'Eleanor Fox',
    dob: '1988-09-22',
    gender: 'FEMALE',
    phone: '+1 (555) 987-6543',
  },
];

export const PatientsTab = ({
  patients,
  onSave,
  onDelete,
}: {
  patients: PatientDetail[];
  onSave: (p: PatientDetail) => void;
  onDelete: (id: string) => void;
}) => {
  const [editingPatient, setEditingPatient] = useState<PatientDetail | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      onSave(editingPatient);
      setEditingPatient(null);
      setIsAdding(false);
    }
  };

  const openAddForm = () => {
    setEditingPatient({ id: `p-${Date.now()}`, name: '', dob: '', gender: 'MALE', phone: '' });
    setIsAdding(true);
  };

  if (editingPatient) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <Card className="border-border pt-0 shadow-sm">
          <CardHeader className="bg-secondary/20 flex flex-row items-center gap-4 border-b py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingPatient(null)}
              className="hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5 text-[#013a63]" />
            </Button>
            <div>
              <CardTitle className="text-xl text-[#012a4a]">
                {isAdding ? 'Add New Patient' : 'Edit Patient Details'}
              </CardTitle>
              <CardDescription>Manage family members or dependents.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <div className="space-y-2">
                  <Label className="text-[#012a4a]">Full Name</Label>
                  <Input
                    required
                    value={editingPatient.name}
                    onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#012a4a]">Date of Birth</Label>
                  <Input
                    type="date"
                    required
                    value={editingPatient.dob}
                    onChange={(e) => setEditingPatient({ ...editingPatient, dob: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#012a4a]">Gender</Label>
                  <select
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[#014f86] focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    value={editingPatient.gender}
                    onChange={(e) =>
                      setEditingPatient({ ...editingPatient, gender: e.target.value as Gender })
                    }
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#012a4a]">Phone Number</Label>
                  <Input
                    required
                    value={editingPatient.phone}
                    onChange={(e) =>
                      setEditingPatient({ ...editingPatient, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setEditingPatient(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#014f86] text-white hover:bg-[#013a63]">
                  <Save className="mr-2 h-4 w-4" /> Save Patient
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
          <h2 className="text-2xl font-bold text-[#012a4a]">Saved Patients</h2>
          <p className="text-muted-foreground">Manage your profiles for quick booking.</p>
        </div>
        <Button
          onClick={openAddForm}
          className="bg-[#a9d6e5] text-[#013a63] transition-colors hover:bg-[#014f86] hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {patients.map((p) => (
          <Card
            key={p.id}
            className="border-border group py-0 shadow-sm transition-colors hover:border-[#a9d6e5]"
          >
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="bg-secondary/30 flex h-12 w-12 items-center justify-center rounded-full text-[#014f86]">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="truncate text-lg font-bold text-[#012a4a]">{p.name}</h4>
                    <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-sm capitalize">
                      {p.gender.toLowerCase()} • <Calendar className="ml-1 h-3 w-3" /> {p.dob}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#014f86]"
                    onClick={() => {
                      setEditingPatient(p);
                      setIsAdding(false);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 h-8 w-8"
                    onClick={() => onDelete(p.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="border-border mt-4 flex items-center border-t pt-4 text-sm text-[#012a4a]">
                <Phone className="text-muted-foreground mr-2 h-4 w-4" /> {p.phone}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};
