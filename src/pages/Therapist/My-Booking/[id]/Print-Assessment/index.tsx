import { AlertCircle, ArrowLeft, Printer, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { getPatientBookingById } from '@/services/patient.service';
import {
  getTherapistBookingById,
  type ClinicalAssessmentRecord,
  type TherapistBookingDetail,
} from '@/services/therapist.service';

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

const formatDisplayValue = (val: unknown): string => {
  if (val === null || val === undefined || val === '') return 'N/A';
  if (typeof val === 'string') return formatEnumLabel(val);
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  if (typeof val === 'object') {
    return (
      Object.entries(val as Record<string, unknown>)
        .filter(([, v]) => v !== null && v !== undefined && v !== '')
        .map(([k, v]) => `${formatEnumLabel(k)}: ${formatDisplayValue(v)}`)
        .join(', ') || 'N/A'
    );
  }
  return String(val);
};

const getPainScoreLabel = (score?: number) => {
  if (score === undefined || score === null) return 'Not Logged';
  if (score <= 3) return 'Mild Pain';
  if (score <= 6) return 'Moderate Pain';
  return 'Severe Pain';
};

const formatDOB = (dobStr?: string): { formatted: string; age?: number } => {
  if (!dobStr) return { formatted: 'N/A' };
  try {
    const d = new Date(dobStr);
    if (isNaN(d.getTime())) return { formatted: dobStr };

    const formatted = d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
      age--;
    }

    return { formatted, age: age > 0 ? age : undefined };
  } catch {
    return { formatted: dobStr };
  }
};

export default function PrintAssessmentPage() {
  const { id: bookingId, assessmentId } = useParams<{ id: string; assessmentId: string }>();
  const navigate = useNavigate();

  const [bookingDetail, setBookingDetail] = useState<TherapistBookingDetail | null>(null);
  const [assessment, setAssessment] = useState<ClinicalAssessmentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;

    let isMounted = true;

    getTherapistBookingById(bookingId)
      .then((res) => {
        if (!isMounted) return;
        const detail = res.data;
        setBookingDetail(detail);

        const assessments = detail.clinicalAssessments || [];
        let target: ClinicalAssessmentRecord | undefined;

        if (assessmentId) {
          target = assessments.find((a) => a.id === assessmentId);
          if (!target && !isNaN(Number(assessmentId))) {
            target = assessments[Number(assessmentId)];
          }
        }
        target = target || assessments[0];

        setAssessment(target || null);
        setLoading(false);
      })
      .catch(() => {
        getPatientBookingById(bookingId)
          .then((res) => {
            if (!isMounted) return;
            const data = res.data as unknown as TherapistBookingDetail;
            setBookingDetail(data);
            const assessments = data.clinicalAssessments || [];
            let target: ClinicalAssessmentRecord | undefined;

            if (assessmentId) {
              target = assessments.find((a) => a.id === assessmentId);
              if (!target && !isNaN(Number(assessmentId))) {
                target = assessments[Number(assessmentId)];
              }
            }
            target = target || assessments[0];
            setAssessment(target || null);
            setLoading(false);
          })
          .catch((err) => {
            if (!isMounted) return;
            setError(err?.response?.data?.message || 'Failed to load assessment report.');
            setLoading(false);
          });
      });

    return () => {
      isMounted = false;
    };
  }, [bookingId, assessmentId]);

  useEffect(() => {
    if (!assessment) return;

    const originalTitle = document.title;
    const patientName = bookingDetail?.patient?.name || 'Patient Report';
    const dateStr = assessment.createdAt
      ? new Date(assessment.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

    document.title = `${patientName} | Physiobuddies - ${dateStr}`;

    return () => {
      document.title = originalTitle;
    };
  }, [assessment, bookingDetail]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Stethoscope className="h-10 w-10 animate-bounce text-[#014f86]" />
          <p className="text-sm font-semibold text-slate-600">Loading Evaluation Report...</p>
        </div>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <AlertCircle className="mb-3 h-12 w-12 text-rose-500" />
        <h2 className="text-lg font-bold text-slate-800">Assessment Report Not Found</h2>
        <p className="mt-1 text-xs text-slate-500">
          {error || 'No assessment record matches this reference ID.'}
        </p>
        <Button onClick={() => navigate(-1)} className="mt-4 bg-[#014f86] text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const patient = bookingDetail?.patient;
  const painLabel = getPainScoreLabel(assessment.painScore);
  const formattedType = formatEnumLabel(assessment.assessmentType || 'GENERAL');
  const dobInfo = formatDOB(patient?.dob);
  const genderFormatted = patient?.gender
    ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1).toLowerCase()
    : 'N/A';

  return (
    <div className="min-h-screen bg-slate-100 py-6 text-slate-900 sm:py-10 print:bg-white print:p-0">
      <style>{`
        /* Hide main app navigation header on print page */
        #main-scroll-container > header,
        header,
        nav,
        .no-print {
          display: none !important;
        }

        /* Allow scrolling while hiding scrollbar visually */
        #main-scroll-container {
          height: 100vh !important;
          overflow-y: auto !important;
          scrollbar-width: none !important; /* Firefox */
          -ms-overflow-style: none !important; /* IE/Edge */
        }

        #main-scroll-container::-webkit-scrollbar,
        ::-webkit-scrollbar {
          display: none !important;
          width: 0px !important;
          height: 0px !important;
        }

        html, body {
          overflow-y: auto !important;
          scrollbar-width: none !important; /* Firefox */
          -ms-overflow-style: none !important; /* IE/Edge */
        }

        .print-avoid-break {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 15mm 12mm 15mm;
          }
          body, html {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>

      {/* TOP NAVIGATION ACTION BAR */}
      <div className="mx-auto mb-6 flex max-w-[210mm] items-center justify-between px-4 print:hidden">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="border-slate-300 bg-white text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Booking Detail
        </Button>

        <Button
          onClick={handlePrint}
          className="bg-[#014f86] text-xs font-semibold text-white shadow-md hover:bg-[#013a63]"
        >
          <Printer className="mr-2 h-4 w-4" /> Print / Save PDF (A4)
        </Button>
      </div>

      {/* PRINTABLE A4 CLINICAL REPORT SHEET */}
      <div className="mx-auto flex min-h-[297mm] w-full max-w-[210mm] flex-col justify-between border border-slate-300 bg-white p-8 shadow-xl sm:p-12 print:m-0 print:min-h-[270mm] print:w-full print:max-w-none print:border-none print:p-0 print:shadow-none">
        <div className="flex-1 space-y-7">
          {/* HEADER SECTION */}
          <div className="flex items-start justify-between border-b-2 border-[#014f86] pb-5">
            <div className="space-y-1">
              <img
                src="/logo.png"
                alt="PhysioBuddies Logo"
                className="h-12 w-auto object-contain"
              />
              <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                Clinical Physical Therapy & Rehabilitation Services
              </p>
            </div>

            <div className="space-y-1 text-right">
              <h1 className="text-xl font-black tracking-wide text-[#014f86] uppercase">
                Clinical Evaluation Report
              </h1>
              <p className="text-xs font-medium text-slate-600">
                Ref ID:{' '}
                <span className="font-mono font-bold text-slate-800">
                  {assessment.id || bookingId?.slice(-8)}
                </span>
              </p>
              {assessment.createdAt && (
                <p className="text-xs font-medium text-slate-600">
                  Report Date:{' '}
                  <span className="font-semibold text-slate-900">
                    {new Date(assessment.createdAt).toLocaleDateString(undefined, {
                      dateStyle: 'long',
                    })}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* PATIENT DEMOGRAPHICS TABLE */}
          <div className="grid grid-cols-2 gap-4 border-y border-slate-300 bg-slate-50/60 px-4 py-3.5 text-xs sm:grid-cols-4">
            <div>
              <span className="block text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                Patient Name
              </span>
              <span className="mt-0.5 block text-sm font-bold text-slate-900">
                {patient?.name || 'Patient'}
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                Gender / Age
              </span>
              <span className="mt-0.5 block font-bold text-slate-800">
                {genderFormatted} {dobInfo.age ? `(${dobInfo.age} Yrs)` : ''}
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                Date of Birth
              </span>
              <span className="mt-0.5 block font-bold text-slate-800">{dobInfo.formatted}</span>
            </div>

            <div>
              <span className="block text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                Evaluation Category
              </span>
              <span className="mt-0.5 block font-bold text-[#014f86]">{formattedType}</span>
            </div>
          </div>

          {/* SECTION 1: PHYSICAL FINDINGS & BASELINE METRICS */}
          <div className="print-avoid-break space-y-3">
            <h2 className="flex items-center gap-1.5 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#014f86] uppercase">
              1. Baseline Evaluation & Physical Findings
            </h2>

            <div className="grid grid-cols-2 gap-4 pt-1 text-xs sm:grid-cols-4">
              <div className="border-l-2 border-[#014f86] py-1 pl-3">
                <span className="block text-[11px] font-medium text-slate-500">Pain Level</span>
                <span className="mt-0.5 block text-sm font-bold text-slate-900">
                  {assessment.painScore ?? 'N/A'} / 10{' '}
                  <span className="text-xs font-normal text-slate-600">({painLabel})</span>
                </span>
              </div>

              <div className="border-l-2 border-slate-300 py-1 pl-3">
                <span className="block text-[11px] font-medium text-slate-500">
                  Duration of Symptoms
                </span>
                <span className="mt-0.5 block font-bold text-slate-900">
                  {formatEnumLabel(assessment.durationOfSymptoms)}
                </span>
              </div>

              <div className="border-l-2 border-slate-300 py-1 pl-3">
                <span className="block text-[11px] font-medium text-slate-500">
                  Range of Motion
                </span>
                <span className="mt-0.5 block font-bold text-slate-900">
                  {formatDisplayValue(assessment.rom)}
                </span>
              </div>

              <div className="border-l-2 border-slate-300 py-1 pl-3">
                <span className="block text-[11px] font-medium text-slate-500">
                  Muscle Strength
                </span>
                <span className="mt-0.5 block font-bold text-slate-900">
                  {formatDisplayValue(assessment.muscleStrength)}
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2: SPECIALTY FINDINGS (CONDITIONAL) */}
          {(assessment.surgicalDetails ||
            assessment.mobilityDetails ||
            assessment.sportsDetails ||
            assessment.neurologicalDetails ||
            assessment.cardiopulmonaryVitals ||
            assessment.visitFrequency ||
            assessment.suggestedTreatmentDays) && (
            <div className="print-avoid-break space-y-3">
              <h2 className="flex items-center gap-1.5 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#014f86] uppercase">
                2. Specialty Findings & Clinical Details
              </h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-3 pt-1 text-xs sm:grid-cols-2 md:grid-cols-3">
                {assessment.surgicalDetails && (
                  <div>
                    <span className="block text-[11px] font-medium text-slate-500">
                      Surgical Details:
                    </span>
                    <span className="font-bold text-slate-800">
                      {formatDisplayValue(assessment.surgicalDetails)}
                    </span>
                  </div>
                )}

                {assessment.mobilityDetails && (
                  <div>
                    <span className="block text-[11px] font-medium text-slate-500">
                      Mobility & Fall Risk:
                    </span>
                    <span className="font-bold text-slate-800">
                      {formatDisplayValue(assessment.mobilityDetails)}
                    </span>
                  </div>
                )}

                {assessment.sportsDetails && (
                  <div>
                    <span className="block text-[11px] font-medium text-slate-500">
                      Sports & Mechanism:
                    </span>
                    <span className="font-bold text-slate-800">
                      {formatDisplayValue(assessment.sportsDetails)}
                    </span>
                  </div>
                )}

                {assessment.neurologicalDetails && (
                  <div>
                    <span className="block text-[11px] font-medium text-slate-500">
                      Neurological Metrics:
                    </span>
                    <span className="font-bold text-slate-800">
                      {formatDisplayValue(assessment.neurologicalDetails)}
                    </span>
                  </div>
                )}

                {assessment.cardiopulmonaryVitals && (
                  <div>
                    <span className="block text-[11px] font-medium text-slate-500">
                      Cardiopulmonary Vitals:
                    </span>
                    <span className="font-bold text-slate-800">
                      {formatDisplayValue(assessment.cardiopulmonaryVitals)}
                    </span>
                  </div>
                )}

                {(assessment.visitFrequency || assessment.suggestedTreatmentDays) && (
                  <div>
                    <span className="block text-[11px] font-medium text-slate-500">
                      Recommended Regimen:
                    </span>
                    <span className="font-bold text-[#014f86]">
                      {assessment.visitFrequency ? formatEnumLabel(assessment.visitFrequency) : ''}{' '}
                      {assessment.suggestedTreatmentDays
                        ? `(${assessment.suggestedTreatmentDays} Days Plan)`
                        : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 3: DIAGNOSIS & CLINICAL PROFILE */}
          <div className="print-avoid-break space-y-3">
            <h2 className="flex items-center gap-1.5 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#014f86] uppercase">
              3. Diagnosis & Clinical Complaints
            </h2>

            <div className="grid grid-cols-1 gap-6 pt-1 text-xs md:grid-cols-2">
              {/* CHIEF COMPLAINTS */}
              <div>
                <span className="mb-1 block text-[11px] font-medium text-slate-500">
                  Chief Complaints:
                </span>
                {assessment.chiefComplaint && assessment.chiefComplaint.length > 0 ? (
                  <p className="leading-relaxed font-semibold text-slate-800">
                    {assessment.chiefComplaint.join('  •  ')}
                  </p>
                ) : (
                  <p className="text-slate-400 italic">None logged</p>
                )}
              </div>

              {/* PROBLEMS IDENTIFIED */}
              <div>
                <span className="mb-1 block text-[11px] font-medium text-slate-500">
                  Problems Identified:
                </span>
                {assessment.problemsIdentified && assessment.problemsIdentified.length > 0 ? (
                  <p className="leading-relaxed font-semibold text-slate-800">
                    {assessment.problemsIdentified.join('  •  ')}
                  </p>
                ) : (
                  <p className="text-slate-400 italic">None logged</p>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 4: PLANNED INTERVENTIONS */}
          <div className="print-avoid-break space-y-3">
            <h2 className="flex items-center gap-1.5 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#014f86] uppercase">
              4. Treatment Plan & Interventions
            </h2>

            <div className="space-y-2 pt-1 text-xs">
              {assessment.treatmentPlanItems && assessment.treatmentPlanItems.length > 0 && (
                <div>
                  <span className="mb-1 block text-[11px] font-medium text-slate-500">
                    Planned Interventions:
                  </span>
                  <p className="leading-relaxed font-semibold text-slate-800">
                    {assessment.treatmentPlanItems.map((t) => `✓ ${t}`).join('   ')}
                  </p>
                </div>
              )}

              <div>
                <span className="block text-[11px] font-medium text-slate-500">
                  Home Exercise Program (HEP):
                </span>
                <span className="font-semibold text-slate-800">
                  {assessment.hepGiven ? 'Prescribed & Assigned to Patient' : 'Not Prescribed'}
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 5: THERAPIST CLINICAL NOTES */}
          <div className="print-avoid-break space-y-2">
            <h2 className="flex items-center gap-1.5 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-[#014f86] uppercase">
              5. Clinical Remarks & Narrative
            </h2>
            <div className="rounded-md border border-slate-200 bg-slate-50/80 p-3.5 text-xs">
              <p className="leading-relaxed font-normal text-slate-800">
                {assessment.therapistNotes &&
                assessment.therapistNotes !== 'Nothing' &&
                assessment.therapistNotes !== 'none'
                  ? assessment.therapistNotes
                  : 'No additional clinical remarks recorded.'}
              </p>
            </div>
          </div>
        </div>

        {/* SIGN-OFF FOOTER BLOCK */}
        <div className="print-avoid-break mt-10 flex items-end justify-between border-t border-slate-300 pt-5 text-xs">
          <div className="space-y-1 text-[10px] text-slate-400">
            <p className="font-semibold text-slate-600">
              PhysioBuddies Certified Clinical Assessment Report
            </p>
            <p>Generated automatically via PhysioBuddies EMR System.</p>
            <p>This document contains confidential health record information.</p>
          </div>

          <div className="space-y-1 text-center">
            <div className="mb-1 w-52 border-b border-slate-400"></div>
            <p className="text-xs font-bold text-slate-800">Attending Physical Therapist</p>
            <p className="text-[10px] text-slate-400">Authorized Clinical Sign-off</p>
          </div>
        </div>
      </div>
    </div>
  );
}
