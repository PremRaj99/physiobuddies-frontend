import {
  Activity,
  BookOpen,
  Calendar,
  ExternalLink,
  FileDown,
  FilePlus,
  FileText,
  Plus,
  Stethoscope,
  TrendingDown,
  Dumbbell,
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
  clinicalAssessments?: ClinicalAssessmentRecord[];
  improvementRecords?: SessionImprovementRecordItem[];
  openAddDocsModal: (sessionId: string) => void;
  activeSessionId?: string;
}

const formatEnumLabel = (val: unknown): string => {
  if (val === null || val === undefined || val === '') return 'N/A';
  if (typeof val !== 'string') return String(val);

  const key = val.trim().toUpperCase();
  const knownMap: Record<string, string> = {
    LESS_THAN_ONE_WEEK: '< 1 Week',
    ONE_TO_FOUR_WEEKS: '1 - 4 Weeks',
    ONE_TO_THREE_MONTHS: '1 - 3 Months',
    MORE_THAN_THREE_MONTHS: '> 3 Months',
    ACUTE_LESS_THAN_2_WEEKS: 'Acute (< 2 Wks)',
    SUBACUTE_2_TO_6_WEEKS: 'Subacute (2-6 Wks)',
    CHRONIC_MORE_THAN_6_WEEKS: 'Chronic (> 6 Wks)',
    DAILY: 'Daily',
    TWICE_A_WEEK: '2x / Week',
    THRICE_A_WEEK: '3x / Week',
    WEEKLY: 'Weekly',
    FORTNIGHTLY: 'Every 2 Weeks',
    MONTHLY: 'Monthly',
    POST_SURGICAL: 'Post-Surgical',
    NEUROLOGICAL: 'Neurological',
    NEURO: 'Neurological',
    SPORTS: 'Sports Injury',
    CARDIOPULMONARY: 'Cardiopulmonary',
    ORTHOPEDIC: 'Orthopedic',
    GENERAL: 'General Physical',
    INITIAL: 'Initial Evaluation',
    FOLLOW_UP: 'Follow-Up Evaluation',
  };

  if (knownMap[key]) return knownMap[key];

  return val
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bOne\b/gi, '1')
    .replace(/\bTwo\b/gi, '2')
    .replace(/\bThree\b/gi, '3')
    .replace(/\bFour\b/gi, '4')
    .replace(/\bFive\b/gi, '5')
    .replace(/\bSix\b/gi, '6');
};

export const MedicalRecordsSection: React.FC<MedicalRecordsSectionProps> = ({
  bookingId,
  documents = [],
  clinicalAssessments = [],
  improvementRecords = [],
  openAddDocsModal,
  activeSessionId,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assessment');

  const assessmentList: ClinicalAssessmentRecord[] = clinicalAssessments;

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-slate-200 py-0 shadow-sm">
      {/* HEADER BAR WITH CLINICAL GRADIENT */}
      <CardHeader className="flex flex-col items-start justify-between gap-4 rounded-t-2xl border-b border-slate-100 bg-linear-to-r from-[#012a4a] via-[#013a63] to-[#014f86] px-6 pt-5 pb-5 text-white sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300 backdrop-blur-md">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
              Medical Records & Evaluation
            </CardTitle>
            <p className="mt-0.5 text-xs font-normal text-cyan-100/80 sm:text-sm">
              Access clinical assessment records, printable evaluation PDFs, and medical
              attachments.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openAddDocsModal(activeSessionId || bookingId)}
            className="border-white/20 bg-white/10 text-xs font-medium text-white shadow-2xs backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
          >
            <FilePlus className="mr-1.5 h-3.5 w-3.5 text-cyan-300" /> Upload File
          </Button>

          <Button
            size="sm"
            onClick={() => navigate(`/therapist/my-bookings/${bookingId}/create-assessment`)}
            className="border border-cyan-300/40 bg-cyan-500 text-xs font-bold text-slate-950 shadow-md transition-all hover:bg-cyan-400"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> New Assessment
          </Button>
        </div>
      </CardHeader>

      <CardContent className="bg-slate-50/40 p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* TAB BAR NAVIGATION */}
          <TabsList className="mb-6 grid w-full grid-cols-3 rounded-xl border border-slate-200 bg-slate-200/70 p-1.5">
            <TabsTrigger
              value="assessment"
              className="rounded-lg py-2 text-xs font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-[#014f86] data-[state=active]:shadow-sm"
            >
              <Stethoscope className="mr-1.5 h-4 w-4 text-[#014f86]" />
              Assessments ({assessmentList.length})
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="rounded-lg py-2 text-xs font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-[#014f86] data-[state=active]:shadow-sm"
            >
              <FileText className="mr-1.5 h-4 w-4 text-[#014f86]" />
              Documents ({documents.length})
            </TabsTrigger>
            <TabsTrigger
              value="improvements"
              className="rounded-lg py-2 text-xs font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-[#014f86] data-[state=active]:shadow-sm"
            >
              <Activity className="mr-1.5 h-4 w-4 text-[#014f86]" />
              Progress Logs ({improvementRecords.length})
            </TabsTrigger>
          </TabsList>

          {/* ==================================================================== */}
          {/* TAB 1: CLINICAL ASSESSMENTS (SIMPLIFIED LIST WITH PDF PRINT ACTION) */}
          {/* ==================================================================== */}
          <TabsContent value="assessment" className="mt-0 space-y-4">
            {assessmentList.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-4 py-12 text-center shadow-2xs">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#014f86]">
                  <Stethoscope className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  No Clinical Assessment Logged Yet
                </h3>
                <p className="mt-1 mb-5 max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Complete a physical assessment evaluation to record baseline metrics and generate
                  a printable clinical report.
                </p>
                <Button
                  onClick={() => navigate(`/therapist/my-bookings/${bookingId}/create-assessment`)}
                  className="bg-[#014f86] px-5 text-xs font-semibold text-white shadow-md hover:bg-[#013a63]"
                >
                  <Plus className="mr-1.5 h-4 w-4" /> Create Clinical Assessment
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {assessmentList.map((item, idx) => {
                  const isLatest = idx === 0;
                  const isInitial = idx === assessmentList.length - 1;
                  const reportNum = assessmentList.length - idx;
                  const assessmentTitle =
                    assessmentList.length === 1
                      ? 'Initial Clinical Evaluation'
                      : isLatest
                        ? `Latest Assessment (#${reportNum})`
                        : isInitial
                          ? 'Initial Assessment (#1)'
                          : `Follow-Up Assessment (#${reportNum})`;

                  const targetId = item.id || idx;

                  return (
                    <div
                      key={item.id || idx}
                      className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200/90 bg-white p-4 transition-all hover:border-[#014f86] hover:shadow-sm sm:flex-row sm:items-center sm:p-5"
                    >
                      <div className="flex items-start gap-3.5 sm:items-center">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#014f86]">
                          <Stethoscope className="h-5.5 w-5.5" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-800">{assessmentTitle}</h4>
                            <Badge
                              variant="outline"
                              className="border-blue-200 bg-blue-50/60 text-xs font-semibold text-[#014f86]"
                            >
                              {formatEnumLabel(item.assessmentType || 'GENERAL')}
                            </Badge>
                            {item.hepGiven && (
                              <Badge
                                variant="outline"
                                className="border-emerald-200 bg-emerald-50 text-[11px] font-medium text-emerald-800"
                              >
                                HEP Assigned
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                            {item.createdAt && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-[#014f86]" />
                                Recorded{' '}
                                {new Date(item.createdAt).toLocaleDateString(undefined, {
                                  dateStyle: 'medium',
                                })}
                              </span>
                            )}

                            {item.painScore !== undefined && item.painScore !== null && (
                              <span className="flex items-center gap-1 font-semibold text-slate-700">
                                • Pain Score:{' '}
                                <span className="text-[#014f86]">{item.painScore}/10</span>
                              </span>
                            )}

                            {item.durationOfSymptoms && (
                              <span className="hidden text-slate-400 sm:inline">
                                • Duration: {formatEnumLabel(item.durationOfSymptoms)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full shrink-0 items-center gap-2 border-t border-slate-100 pt-2 sm:w-auto sm:border-t-0 sm:pt-0">
                        <Button
                          onClick={() =>
                            navigate(`/therapist/my-bookings/${bookingId}/assessment/${targetId}`)
                          }
                          className="w-full bg-[#014f86] px-4 text-xs font-semibold text-white shadow-2xs hover:bg-[#013a63] sm:w-auto"
                        >
                          <FileDown className="mr-1.5 h-4 w-4 text-cyan-300" /> View & Download PDF
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ==================================================================== */}
          {/* TAB 2: DOCUMENTS */}
          {/* ==================================================================== */}
          <TabsContent value="documents" className="mt-0">
            {documents.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-4 py-12 text-center shadow-2xs">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#014f86]">
                  <FileText className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  No Medical Documents Attached
                </h3>
                <p className="mt-1 mb-5 max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Upload patient prescription slips, X-ray scans, MRI reports, or lab work to store
                  them securely.
                </p>
                <Button
                  onClick={() => openAddDocsModal(activeSessionId || bookingId)}
                  className="bg-[#014f86] px-5 text-xs font-semibold text-white shadow-md hover:bg-[#013a63]"
                >
                  <Plus className="mr-1.5 h-4 w-4" /> Upload Medical File
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#a9d6e5] hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#a9d6e5]/30 text-xs font-bold text-[#014f86] uppercase">
                        {doc.fileType || 'PDF'}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#012a4a]">{doc.name}</p>
                        {doc.createdAt && (
                          <p className="mt-0.5 text-xs text-slate-400">
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
                        className="ml-2 inline-flex h-8 shrink-0 items-center justify-center rounded-lg bg-[#014f86]/10 px-3 text-xs font-semibold text-[#014f86] transition-all hover:bg-[#014f86]/20"
                      >
                        View <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    ) : (
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        Attached
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ==================================================================== */}
          {/* TAB 3: IMPROVEMENT LOGS */}
          {/* ==================================================================== */}
          <TabsContent value="improvements" className="mt-0">
            {improvementRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-4 py-12 text-center shadow-2xs">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#014f86]">
                  <Activity className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No Session Progress Logs Yet</h3>
                <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Progress logs track session pain score reduction and home exercises assigned
                  across therapy sessions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {improvementRecords.map((rec, idx) => (
                  <div
                    key={rec.id || idx}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:shadow-xs sm:p-5"
                  >
                    <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-3 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-[#014f86] font-bold text-[#014f86]"
                        >
                          Session {idx + 2} Log
                        </Badge>
                        {rec.createdAt && (
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(rec.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-slate-500">Pain Change:</span>
                        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1">
                          <span className="text-xs text-slate-400 line-through">
                            {rec.painScoreBefore ?? '?'}
                          </span>
                          <span className="text-xs font-bold text-emerald-700">
                            ➔ {rec.painScoreAfter}/10
                          </span>
                          <TrendingDown className="h-3.5 w-3.5 text-emerald-600" />
                        </div>
                      </div>
                    </div>

                    <div className="text-sm font-medium text-slate-700">
                      <span className="mb-1 block text-xs font-bold tracking-wider text-[#014f86] uppercase">
                        Therapist Notes & Progress
                      </span>
                      <p className="text-slate-800">{rec.improvementNotes}</p>
                    </div>

                    {rec.exercisesGiven && rec.exercisesGiven.length > 0 && (
                      <div className="pt-2">
                        <span className="mb-1.5 block text-xs font-bold tracking-wider text-[#014f86] uppercase">
                          Assigned Exercises
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.exercisesGiven.map((ex, eIdx) => (
                            <Badge
                              key={eIdx}
                              variant="secondary"
                              className="bg-slate-100 font-medium text-slate-700"
                            >
                              <Dumbbell className="mr-1 inline h-3 w-3 text-[#014f86]" /> {ex}
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
