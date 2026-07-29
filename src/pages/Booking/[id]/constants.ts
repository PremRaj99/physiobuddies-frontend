export interface ConditionItem {
  id: string;
  title: string;
  desc: string;
  image: string;
}

export const CONDITIONS: ConditionItem[] = [
  {
    id: 'ortho',
    title: 'Ortho',
    desc: 'Joint, bone, or muscle pain',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'neuro',
    title: 'Neuro',
    desc: 'Nerve issues, stroke rehab',
    image:
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'sport',
    title: 'Sport',
    desc: 'Athletic recovery & injury',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'post_surgical',
    title: 'Post Surgical',
    desc: 'Recovery after operations',
    image:
      'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'cardio',
    title: 'Cardio',
    desc: 'Heart & lung rehabilitation',
    image:
      'https://images.unsplash.com/photo-1505506874110-6a7a6c9924cb?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'geriatric',
    title: 'Geriatric',
    desc: 'Elderly care & mobility',
    image:
      'https://images.unsplash.com/photo-1516801968815-534d3d4b6849?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'pediatric',
    title: 'Pediatric',
    desc: 'Child physical development',
    image:
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'womens_health',
    title: "Women's Health",
    desc: 'Pregnancy & postpartum',
    image:
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'ergonomics',
    title: 'Ergonomics',
    desc: 'Posture & workplace pain',
    image:
      'https://images.unsplash.com/photo-1497215848590-50d44b58e727?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'general',
    title: 'General',
    desc: 'Routine checkups & wellness',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300',
  },
];

export const BOOKING_STEPS = ['Patient', 'Location', 'Condition', 'Review & Pay'] as const;
