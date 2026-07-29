import {
  Activity,
  BookOpen,
  Calendar,
  CheckCircle2,
  Dumbbell,
  ExternalLink,
  FilePlus,
  FileText,
  Plus,
  Stethoscope,
  TrendingDown
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type {
  ClinicalAssessmentRecord,
  DocumentRecordItem,
  SessionImprovementRecordItem,
} from '@/services/therapist.service';

interface MedicalRecordsSectionProps {
  bookingId: string;
  documents?: DocumentRecordItem[];
  clinicalAssessment?: ClinicalAssessmentRecord | null;
  clinicalAssessments?: ClinicalAssessmentRecord[];
  improvementRecords?: SessionImprovementRecordItem[];
  openAddDocsModal: (sessionId: string) => void;
  activeSessionId?: string;
}

export const MedicalRecordsSection: React.FC<MedicalRecordsSectionProps> = ({
  bookingId,
  documents = [],
  clinicalAssessment,
  clinicalAssessments = [],
  improvementRecords = [],
  openAddDocsModal,
  activeSessionId,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('documents');

  // Combine clinicalAssessments list with single clinicalAssessment fallback
  const assessmentList: ClinicalAssessmentRecord[] =
    clinicalAssessments && clinicalAssessments.length > 0
      ? clinicalAssessments
      : clinicalAssessment
      ? [clinicalAssessment]
      : [];

  return (
    <Card className="border-border gap-0 py-0 shadow-sm overflow-hidden">
      <CardHeader className="border-border flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-t-xl border-b bg-white pt-4 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
            <BookOpen className="h-5 w-5 text-[#014f86]" /> Medical Records & Documents
          </CardTitle>
          <p className="text-muted-foreground mt-1 text-sm">
            View patient medical files, initial & follow-up assessment reports, and progress notes.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => openAddDocsModal(activeSessionId || bookingId)}
          className="mt-3 sm:mt-0 hover:bg-secondary/20 border-[#014f86] text-[#014f86] font-medium"
        >
          <FilePlus className="mr-2 h-4 w-4" /> Add Document
        </Button>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100/80 p-1 rounded-lg mb-6">
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-white data-[state=active]:text-[#014f86] data-[state=active]:shadow-xs font-medium text-xs sm:text-sm"
            >
              <FileText className="mr-1.5 h-4 w-4 hidden sm:inline" />
              Documents ({documents.length})
            </TabsTrigger>
            <TabsTrigger
              value="assessment"
              className="data-[state=active]:bg-white data-[state=active]:text-[#014f86] data-[state=active]:shadow-xs font-medium text-xs sm:text-sm"
            >
              <Stethoscope className="mr-1.5 h-4 w-4 hidden sm:inline" />
              Assessments ({assessmentList.length})
            </TabsTrigger>
            <TabsTrigger
              value="improvements"
              className="data-[state=active]:bg-white data-[state=active]:text-[#014f86] data-[state=active]:shadow-xs font-medium text-xs sm:text-sm"
            >
              <Activity className="mr-1.5 h-4 w-4 hidden sm:inline" />
              Progress Logs ({improvementRecords.length})
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: DOCUMENTS */}
          <TabsContent value="documents" className="mt-0">
            {documents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <FileText className="h-10 w-10 text-gray-400 mb-3" />
                <p className="font-semibold text-gray-700">No Medical Documents Attached</p>
                <p className="text-sm text-gray-500 max-w-sm mt-1 mb-4">
                  Upload patient prescription slips, X-ray scans, or test reports to attach them to this booking.
                </p>
                <Button
                  onClick={() => openAddDocsModal(activeSessionId || bookingId)}
                  className="bg-[#014f86] text-white hover:bg-[#013a63]"
                >
                  <Plus className="mr-2 h-4 w-4" /> Upload First Document
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-[#a9d6e5] transition-all hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-[#a9d6e5]/30 flex items-center justify-center text-[#014f86] font-bold uppercase text-xs">
                        {doc.fileType || 'PDF'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#012a4a] truncate text-sm">{doc.name}</p>
                        {doc.createdAt && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Uploaded {new Date(doc.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {doc.url ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center h-8 px-3 rounded-md bg-[#014f86]/10 text-[#014f86] hover:bg-[#014f86]/20 text-xs font-semibold shrink-0 ml-2"
                      >
                        View <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    ) : (
                      <Badge variant="secondary" className="text-xs shrink-0">
                        Attached
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 2: CLINICAL ASSESSMENTS */}
          <TabsContent value="assessment" className="mt-0 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#014f86] uppercase tracking-wider">
                Clinical Evaluation Reports ({assessmentList.length})
              </span>

              <Button
                onClick={() => navigate(`/therapist/my-booking/${bookingId}/create-assessment`)}
                className="bg-[#014f86] text-white hover:bg-[#013a63]"
                size="sm"
              >
                <Plus className="mr-1.5 h-4 w-4" /> Add Assessment
              </Button>
            </div>

            {assessmentList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <Stethoscope className="h-10 w-10 text-gray-400 mb-3" />
                <p className="font-semibold text-gray-700">No Clinical Assessment Logged Yet</p>
                <p className="text-sm text-gray-500 max-w-sm mt-1 mb-4">
                  Complete a physical assessment form to evaluate baseline metrics, diagnosis, and treatment goals.
                </p>
                <Button
                  onClick={() => navigate(`/therapist/my-booking/${bookingId}/create-assessment`)}
                  className="bg-[#014f86] text-white hover:bg-[#013a63]"
                >
                  <Stethoscope className="mr-2 h-4 w-4" /> Create First Assessment
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {assessmentList.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="space-y-5 bg-linear-to-br from-white to-blue-50/20 p-6 rounded-xl border border-blue-100 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#014f86] text-white hover:bg-[#014f86]">
                          {idx === assessmentList.length - 1
                            ? 'INITIAL ASSESSMENT'
                            : `ASSESSMENT #${assessmentList.length - idx}`}
                        </Badge>
                        <Badge variant="outline" className="border-blue-200 text-[#014f86]">
                          {item.assessmentType?.replace('_', ' ') || 'GENERAL'}
                        </Badge>
                      </div>

                      {item.createdAt && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          Recorded {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
                        <span className="text-xs font-medium text-muted-foreground block">Pain Score</span>
                        <span className="text-lg font-bold text-[#012a4a] block mt-0.5">
                          {item.painScore ?? 'N/A'}/10
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
                        <span className="text-xs font-medium text-muted-foreground block">Duration</span>
                        <span className="text-xs font-bold text-[#012a4a] block mt-1 truncate">
                          {item.durationOfSymptoms?.replace('_', ' ') || 'N/A'}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
                        <span className="text-xs font-medium text-muted-foreground block">Range of Motion</span>
                        <span className="text-xs font-bold text-[#012a4a] block mt-1 truncate">
                          {item.rom?.replace('_', ' ') || 'N/A'}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
                        <span className="text-xs font-medium text-muted-foreground block">Muscle Strength</span>
                        <span className="text-xs font-bold text-[#012a4a] block mt-1 truncate">
                          {item.muscleStrength?.replace('_', ' ') || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Categorization */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.chiefComplaint && item.chiefComplaint.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-[#014f86] uppercase tracking-wider mb-1.5">
                            Chief Complaints
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {item.chiefComplaint.map((c) => (
                              <Badge key={c} variant="outline" className="bg-white border-blue-200 text-[#013a63] text-xs">
                                {c}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.problemsIdentified && item.problemsIdentified.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-[#014f86] uppercase tracking-wider mb-1.5">
                            Problems Identified
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {item.problemsIdentified.map((p) => (
                              <Badge key={p} variant="outline" className="bg-white border-amber-200 text-amber-900 text-xs">
                                {p}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {item.treatmentPlanItems && item.treatmentPlanItems.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-[#014f86] uppercase tracking-wider mb-1.5">
                          Planned Interventions
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {item.treatmentPlanItems.map((t) => (
                            <Badge key={t} className="bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-50 text-xs">
                              <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-600 inline" /> {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.therapistNotes && (
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <span className="text-xs font-bold text-[#014f86] uppercase tracking-wider block mb-1">
                          Clinical Notes
                        </span>
                        <p className="text-xs text-gray-700 italic">"{item.therapistNotes}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 3: IMPROVEMENT LOGS */}
          <TabsContent value="improvements" className="mt-0">
            {improvementRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <Activity className="h-10 w-10 text-gray-400 mb-3" />
                <p className="font-semibold text-gray-700">No Session Progress Logs Yet</p>
                <p className="text-sm text-gray-500 max-w-md mt-1">
                  Progress logs are generated when ending subsequent sessions (Session 2 onwards) to measure pain score reduction and exercises assigned.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {improvementRecords.map((rec, idx) => (
                  <div key={rec.id || idx} className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-[#014f86] text-[#014f86] font-bold">
                          Session {idx + 2} Log
                        </Badge>
                        {rec.createdAt && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(rec.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground font-medium">Pain Change:</span>
                        <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <span className="text-xs line-through text-gray-400">
                            {rec.painScoreBefore ?? '?'}
                          </span>
                          <span className="text-xs font-bold text-emerald-700">
                            ➔ {rec.painScoreAfter}/10
                          </span>
                          <TrendingDown className="h-3.5 w-3.5 text-emerald-600" />
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-700 font-medium">
                      <span className="text-xs font-bold text-[#014f86] uppercase tracking-wider block mb-1">
                        Therapist Notes & Progress
                      </span>
                      <p className="text-gray-800">{rec.improvementNotes}</p>
                    </div>

                    {rec.exercisesGiven && rec.exercisesGiven.length > 0 && (
                      <div className="pt-2">
                        <span className="text-xs font-bold text-[#014f86] uppercase tracking-wider block mb-1.5">
                          Assigned Exercises
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.exercisesGiven.map((ex, eIdx) => (
                            <Badge key={eIdx} variant="secondary" className="bg-gray-100 text-gray-700">
                              <Dumbbell className="mr-1 h-3 w-3 text-[#014f86] inline" /> {ex}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
