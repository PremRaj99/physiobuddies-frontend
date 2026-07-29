import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router';

interface ClinicalSupportProps {
  onCompletePlanClick: () => void;
}

export const ClinicalSupport = ({ onCompletePlanClick }: ClinicalSupportProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <Card className="border-none bg-[#012a4a] py-0 text-white shadow-lg">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-[#a9d6e5]/20 p-2">
              <ShieldCheck className="h-6 w-6 text-[#a9d6e5]" />
            </div>
            <h3 className="text-lg font-bold">Clinical Support</h3>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-gray-300">
            Facing issues with the session or the patient? Contact the medical administration desk
            immediately.
          </p>
          <Button
            onClick={() => navigate('/my-issues')}
            className="h-11 w-full bg-[#a9d6e5] font-bold text-[#012a4a] transition-colors hover:bg-white"
          >
            Connect with Admin
          </Button>
        </CardContent>
      </Card>

      {/* Complete Treatment Plan Action */}
      <Card className="border-border bg-white py-4 shadow-sm">
        <CardContent className="p-4">
          <Button
            onClick={onCompletePlanClick}
            className="w-full bg-[#014f86] font-bold text-white hover:bg-[#013a63]"
          >
            Complete Treatment Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
