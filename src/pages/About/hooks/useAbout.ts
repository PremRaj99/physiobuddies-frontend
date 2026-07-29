export function useAbout() {
  const images = [
    'https://physiobuddies-public.s3.ap-south-1.amazonaws.com/common/Gemini_Generated_Image_n6v39sn6v39sn6v3.png',
    'https://images.unsplash.com/photo-1540205895360-4ad4cffb3aa8?q=80&w=1887&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581090465357-c8a1f71f0407?q=80&w=1887&auto=format&fit=crop',
    'https://physiobuddies-public.s3.ap-south-1.amazonaws.com/common/WhatsApp+Image+2025-07-25+at+01.21.38_59d164b0.jpg',
  ];

  const MedicalColors = {
    Primary: '#014f86',
    Secondary: '#a9d6e5',
    DarkBlue: '#013a63',
    DeepNavy: '#012a4a',
  };

  const metrics = [
    { name: 'Physiotherapists', value: 1000, color: MedicalColors.Primary },
    { name: 'Patients Treated', value: 10000, color: MedicalColors.DarkBlue },
    { name: 'Clinics Partnered', value: 100, color: MedicalColors.Secondary },
    { name: 'Home Visits', value: 2500, color: MedicalColors.DeepNavy },
  ];

  const coverageData = [
    { name: 'Cities Covered', percentage: 25 },
    { name: 'Positive Feedback', percentage: 90 },
    { name: 'Rebook Rate', percentage: 80 },
  ];

  const pieData = [
    { name: 'Positive Feedback', value: 90 },
    { name: 'Other Feedback', value: 10 },
  ];

  const COLORS = [MedicalColors.Primary, MedicalColors.Secondary];

  const feedback = [
    {
      title: 'Back Pain – Pain-Free Living Achieved!',
      quote: 'Physiobuddies connected me with a professional physiotherapist... effortless.',
      author: 'Amit Sharma',
      location: 'New Delhi',
      star: 5,
    },
    {
      title: 'ACL Injury – Back to Sports in No Time!',
      quote: 'After my ACL surgery, I struggled with mobility. Found a homevisit physio!',
      author: 'Sneha Kapoor',
      location: 'Gurugram',
      star: 5,
    },
    {
      title: 'Online Physiotherapy – Effective!',
      quote:
        'I was skeptical about online physiotherapy, but the video consultation was just as effective.',
      author: 'Rahul Mehta',
      location: 'Noida',
      star: 4.5,
    },
    {
      title: 'Frozen Shoulder – Movement Restored!',
      quote: 'I couldn’t even wear my shirt without pain. Helped me regain my mobility!',
      author: 'Rajat Malhotra',
      location: 'Mumbai',
      star: 4.5,
    },
  ];

  const physioTestimonial = [
    {
      name: 'Dr. Priya',
      location: 'Greater Noida',
      testimonial: 'Physiobuddies transformed my practice. I now have a steady flow of patients!',
      rating: 5,
    },
    {
      name: 'Dr. Kunal',
      location: 'Greater Noida',
      testimonial:
        'The platform made it easy for me to provide home visits, increasing my earnings by 40%!',
      rating: 5,
    },
    {
      name: 'Dr. Meera',
      location: 'Delhi',
      testimonial:
        'The flexible scheduling options allow me to manage my clinical practice and home visits seamlessly.',
      rating: 5,
    },
  ];

  return {
    images,
    metrics,
    coverageData,
    pieData,
    COLORS,
    feedback,
    physioTestimonial,
    MedicalColors,
  };
}
