import { Download, FileCheck, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { DocumentItem } from '../hooks/usePatientBookingFlow';

interface MedicalDocumentsListProps {
  documents: DocumentItem[];
}

export const MedicalDocumentsList = ({ documents }: MedicalDocumentsListProps) => {
  return (
    <Card className="border-border gap-0 py-0 shadow-sm">
      <CardHeader className="border-border rounded-t-xl border-b bg-white py-4">
        <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
          <FileCheck className="h-5 w-5 text-[#014f86]" /> Medical Documents
        </CardTitle>
        <CardDescription>Download assessments, prescriptions, and reports.</CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        {documents.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="border-border group flex items-start gap-3 rounded-lg border bg-white p-4 transition-all hover:border-[#a9d6e5] hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#eef6f9]">
                  <FileText className="h-5 w-5 text-[#014f86]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-semibold text-[#012a4a]">{doc.title}</h4>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-secondary/50 px-1.5 py-0 text-[10px] text-[#013a63]"
                    >
                      {doc.type}
                    </Badge>
                    <span className="text-muted-foreground text-xs">{doc.date}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-[#014f86] opacity-50 group-hover:opacity-100 hover:bg-[#a9d6e5]/30"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <FileText className="text-muted-foreground/30 mx-auto mb-3 h-10 w-10" />
            <p className="text-muted-foreground">No documents uploaded yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
