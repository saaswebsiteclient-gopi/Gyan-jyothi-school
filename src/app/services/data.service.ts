import { Injectable, signal, computed } from '@angular/core';
import {
  ServiceItem,
  AppointmentRecord,
  CourseItem,
  LeadItem,
  PaymentTransaction,
  InstituteSettings
} from '../models/occult.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Current User Role: 'guest' | 'student' | 'admin'
  public readonly currentRole = signal<'guest' | 'student' | 'admin'>('guest');

  // Currently logged-in student info (when in student or guest mode)
  public readonly currentStudent = signal<{
    name: string;
    email: string;
    phone: string;
    enrolledCourseIds: string[];
  }>({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 12345',
    enrolledCourseIds: ['course-1', 'course-2']
  });

  // Institute Settings
  public readonly settings = signal<InstituteSettings>({
    instituteName: 'GYAN JYOTHI SCHOOL OF OCCULT SCIENCE',
    tagline: 'Authentic Vedic Numerology, Lo Shu Grid Wisdom & Sacred Science Education',
    logoUrl: '/src/assets/images/loshu_sacred_grid_1792054438993.jpg',
    expertName: 'Acharya Gyan Jyothi',
    expertTitle: 'Distinguished Master Numerologist, Occult Science Scholar & Institute Founder',
    expertPhotoUrl: '/src/assets/images/guruji_numerology_expert_1792057088016.jpg',
    expertBio: 'With over 24 years of dedicated practice in traditional Vedic Numerology, Chaldean vibrations, and Lo Shu grid analytics, Acharya Gyan Jyothi has guided thousands of professionals, corporate leaders, and occult students worldwide with precision and ethical integrity.',
    contactNumber: '+91 98450 12890',
    whatsappNumber: '+91 98450 12890',
    emailAddress: 'consultations@gyanjyothischool.com',
    officeAddress: 'Sanctum Tower, 4th Floor, 8th Main, Malleshwaram, Bengaluru, Karnataka 560003, India',
    socialLinks: {
      facebook: 'https://facebook.com/gyanjyothischool',
      instagram: 'https://instagram.com/gyanjyothischool',
      youtube: 'https://youtube.com/@gyanjyothischool',
      linkedin: 'https://linkedin.com/company/gyan-jyothi-school',
      whatsapp: 'https://wa.me/919845012890'
    },
    availableTimeSlots: [
      '10:00 AM - 11:00 AM',
      '11:30 AM - 12:30 PM',
      '02:00 PM - 03:00 PM',
      '03:30 PM - 04:30 PM',
      '05:00 PM - 06:00 PM',
      '06:30 PM - 07:30 PM'
    ],
    razorpayKeyId: 'rzp_test_GYANJYOTHI2026',
    razorpayMode: 'Test Mode',
    privacyPolicy: 'We strictly protect all personal dates of birth, consultation audio recordings, and numerological charts under strict confidentiality. Data is never sold or shared with external marketing networks.',
    termsAndConditions: 'Consultations and educational courses provide traditional occult and numerological interpretations. All consultations are ethical advisory sessions. Health numerology is not a substitute for certified medical care.'
  });

  // Exactly 10 Services as specified in Module 2
  public readonly services = signal<ServiceItem[]>([
    {
      id: 'srv-1',
      categoryNumber: 1,
      title: 'Date of Birth Numerology',
      price: 2499,
      isAvailable: true,
      icon: 'calendar_month',
      isTitleOnly: false,
      shortDescription: 'Comprehensive date of birth reading calculating your core root vibration, life destiny path, and innate capabilities.',
      features: [
        'Birth Number (Mulank) & Planetary Ruler',
        'Destiny Number (Bhagyank) Life Path',
        'Personality Characteristics & Inherent Traits',
        'Strengths & Growth Weaknesses',
        'Auspicious Lucky Numbers & Colors',
        'Traditional Career & Relationship Interpretations'
      ]
    },
    {
      id: 'srv-2',
      categoryNumber: 2,
      title: 'Lo Shu Grid Numerology',
      price: 2999,
      isAvailable: true,
      icon: 'grid_on',
      isTitleOnly: false,
      shortDescription: 'In-depth 3x3 sacred Chinese magic square grid generation revealing planes of thought, will, and emotional equilibrium.',
      features: [
        'Lo Shu Grid Generation from Date of Birth',
        'Missing Numbers & Remedial Balancing',
        'Repeated Numbers Energy Flow Analysis',
        'Planes of Strength (Mental, Emotional, Practical)',
        'Golden & Silver Raj Yoga Identification'
      ]
    },
    {
      id: 'srv-3',
      categoryNumber: 3,
      title: 'Mobile Number Numerology',
      price: 1999,
      isAvailable: true,
      icon: 'phone_iphone',
      isTitleOnly: false,
      shortDescription: 'Digital frequency alignment analyzing your primary contact number against your birth date vibrations.',
      features: [
        'Mobile Number Total & Compound Vibration Analysis',
        'Date of Birth Compatibility Matrix',
        'Harmful & Auspicious Number Pairings',
        'Suggested Numerological Number Patterns for Prosperity'
      ]
    },
    {
      id: 'srv-4',
      categoryNumber: 4,
      title: 'Name Numerology',
      price: 3499,
      isAvailable: true,
      icon: 'badge',
      isTitleOnly: false,
      shortDescription: 'Ancient Chaldean name vibration assessment, phonetic correction, and business brand resonance.',
      features: [
        'Chaldean Alphabet Single & Compound Name Value',
        'Name Spelling Correction & Remedial Adjustments',
        'Business & Brand Name Commercial Vibrations',
        'Signature Harmony with Professional Goals'
      ]
    },
    {
      id: 'srv-5',
      categoryNumber: 5,
      title: 'Wristwatch Numerology',
      price: 1799,
      isAvailable: true,
      icon: 'watch',
      isTitleOnly: false,
      shortDescription: 'Chronometric energy evaluation correlating dial geometry, needle movements, and numerological frequencies.',
      features: [
        'Wristwatch Dial Number Analysis',
        'Dial Shape Interpretation (Round, Square, Rectangular)',
        'Strap Color, Metallic Element & Planetary Alignment',
        'Timepiece Tuning for Career Punctuality & Prosperity'
      ]
    },
    {
      id: 'srv-6',
      categoryNumber: 6,
      title: 'Signature Numerology',
      price: 1999,
      isAvailable: true,
      icon: 'draw',
      isTitleOnly: false,
      shortDescription: 'Grapho-numerological study of personal signature stroke angles, baseline slant, and baseline underscores.',
      features: [
        'Signature Image Upload & Stroke Analysis',
        'Baseline Elevation & Upward Energy Patterns',
        'Initial Letter Sizing & Psychological Projection',
        'Suggested Signature Modifications for Financial Stability'
      ]
    },
    {
      id: 'srv-7',
      categoryNumber: 7,
      title: 'Health Numerology',
      price: 2499,
      isAvailable: true,
      icon: 'favorite_border',
      isTitleOnly: false,
      shortDescription: 'Traditional numerological wellness tendencies and lifestyle guidance with explicit non-medical disclaimer.',
      features: [
        'Traditional Elemental & Planetary Tendency Interpretations',
        'Seasonal & Dietary Routine Suggestions',
        'Holistic Lifestyle & Mindful Meditation Guidelines',
        'Clear Disclaimer: Traditional wisdom only; consult doctors for medical conditions'
      ]
    },
    {
      id: 'srv-8',
      categoryNumber: 8,
      title: 'Vedic Numerology',
      price: 3999,
      isAvailable: true,
      icon: 'auto_awesome',
      isTitleOnly: true
    },
    {
      id: 'srv-9',
      categoryNumber: 9,
      title: 'Yantra Vidya',
      price: 4499,
      isAvailable: true,
      icon: 'all_inclusive',
      isTitleOnly: true
    },
    {
      id: 'srv-10',
      categoryNumber: 10,
      title: 'Numerology Software',
      price: 9999,
      isAvailable: true,
      icon: 'laptop_chromebook',
      isTitleOnly: true
    }
  ]);

  // Exactly 7 Courses as specified in Module 5
  public readonly courses = signal<CourseItem[]>([
    {
      id: 'course-1',
      title: 'Numbers Characteristics and Personality Analysis',
      tagline: 'Master the fundamental cosmic vibrations of digits 1 through 9, planetary rulers, and core human temperaments.',
      description: 'A deep-dive curriculum covering foundational Vedic and Western numerology. Learn how numbers reflect inherent human consciousness, mental inclinations, karmic strengths, and personal cycles.',
      thumbnail: '/src/assets/images/hero_sacred_numerology_1792054438574.jpg',
      instructorName: 'Acharya Gyan Jyothi',
      instructorTitle: 'Master Occult Scientist',
      durationWeeks: 6,
      totalLessons: 24,
      totalPdfMaterials: 8,
      price: 5999,
      isEnrolled: true,
      progressPercent: 65,
      certificateIssued: false,
      lessons: [
        { id: 'l1', title: 'Cosmic Origin of Numbers & Vedic Astronomy', durationMinutes: 45, videoUrl: 'https://example.com/v1', pdfTitle: 'Module 1 - Vedic Number Origins.pdf', isCompleted: true },
        { id: 'l2', title: 'Number 1 (Sun) & Number 2 (Moon) Deep Profiles', durationMinutes: 52, videoUrl: 'https://example.com/v2', pdfTitle: 'Module 2 - Sun Moon Archetypes.pdf', isCompleted: true },
        { id: 'l3', title: 'Number 3 (Jupiter) & Number 4 (Rahu) Karmic Axes', durationMinutes: 48, videoUrl: 'https://example.com/v3', pdfTitle: 'Module 3 - Jupiter Rahu Interactions.pdf', isCompleted: true },
        { id: 'l4', title: 'Numbers 5, 6, 7, 8 & 9 Psycho-Spiritual Matrix', durationMinutes: 60, videoUrl: 'https://example.com/v4', pdfTitle: 'Module 4 - Planetary Matrix.pdf', isCompleted: false },
        { id: 'l5', title: 'Synthesizing Mulank (Birth) and Bhagyank (Destiny)', durationMinutes: 55, videoUrl: 'https://example.com/v5', pdfTitle: 'Module 5 - Dual Number Synthesis.pdf', isCompleted: false }
      ],
      quizzes: [
        {
          id: 'q1',
          question: 'Which planet rules Number 5 in traditional numerology?',
          options: ['Sun (Surya)', 'Mercury (Budha)', 'Saturn (Shani)', 'Venus (Shukra)'],
          correctIndex: 1
        },
        {
          id: 'q2',
          question: 'How is the Mulank (Birth Number) calculated for someone born on the 28th of a month?',
          options: ['2 + 8 = 10 -> 1', '28 as a compound master number', 'Only the last digit 8', '2 x 8 = 16'],
          correctIndex: 0
        },
        {
          id: 'q3',
          question: 'Which color palette is traditionally favorable for Number 1 ruled individuals?',
          options: ['Dark Navy Blue and Black', 'Golden Yellow, Orange and Ruby Red', 'Pastel Pink and Lilac', 'Sea Green and Charcoal'],
          correctIndex: 1
        }
      ]
    },
    {
      id: 'course-2',
      title: 'Lo Shu Grid Numerology',
      tagline: 'Unlock the 3x3 sacred Chinese magic square, 8 planes of consciousness, and Raj Yoga prosperity lines.',
      description: 'Comprehensive certification in Lo Shu grid mapping. Master the identification of missing numbers, excessive repetitions, arrow of intellect, arrow of will, and remedies using five-element theory.',
      thumbnail: '/src/assets/images/loshu_sacred_grid_1792054438993.jpg',
      instructorName: 'Acharya Gyan Jyothi',
      instructorTitle: 'Master Occult Scientist',
      durationWeeks: 5,
      totalLessons: 20,
      totalPdfMaterials: 6,
      price: 6999,
      isEnrolled: true,
      progressPercent: 100,
      certificateIssued: true,
      certificateDate: '12 October 2026',
      lessons: [
        { id: 'l21', title: 'The Sacred 3x3 Architecture of the Lo Shu Square', durationMinutes: 50, videoUrl: 'https://example.com/v21', pdfTitle: 'Lo Shu Architectural Foundation.pdf', isCompleted: true },
        { id: 'l22', title: 'The Horizontal Planes: Mental, Emotional, Practical', durationMinutes: 58, videoUrl: 'https://example.com/v22', pdfTitle: 'Horizontal Planes Handbook.pdf', isCompleted: true },
        { id: 'l23', title: 'The Vertical Planes: Thought, Will Power, Action', durationMinutes: 52, videoUrl: 'https://example.com/v23', pdfTitle: 'Vertical Planes Compendium.pdf', isCompleted: true },
        { id: 'l24', title: 'Golden Raj Yoga (4-5-6) & Silver Raj Yoga (2-5-8)', durationMinutes: 65, videoUrl: 'https://example.com/v24', pdfTitle: 'Raj Yogas in Lo Shu.pdf', isCompleted: true }
      ],
      quizzes: [
        {
          id: 'q21',
          question: 'Which digits form the Golden Raj Yoga in the Lo Shu Grid?',
          options: ['4, 5, 6', '2, 5, 8', '3, 5, 7', '1, 5, 9'],
          correctIndex: 0
        },
        {
          id: 'q22',
          question: 'What does the complete 9-5-1 vertical column represent?',
          options: ['Plane of Action', 'Plane of Will Power', 'Plane of Intellect', 'Plane of Emotions'],
          correctIndex: 1
        }
      ]
    },
    {
      id: 'course-3',
      title: 'Mobile Numerology',
      tagline: 'Diagnose telephonic energy frequencies, sim card compounds, and commercial calling patterns.',
      description: 'Learn how phone number digits affect daily communication, business inbound inquiries, personal rapport, and financial stability.',
      thumbnail: '/src/assets/images/consultation_sanctum_1792054439062.jpg',
      instructorName: 'Acharya Gyan Jyothi',
      instructorTitle: 'Master Occult Scientist',
      durationWeeks: 4,
      totalLessons: 16,
      totalPdfMaterials: 5,
      price: 4999,
      isEnrolled: false,
      progressPercent: 0,
      certificateIssued: false,
      lessons: [
        { id: 'l31', title: 'The Modern Digital Frequency of Mobile Numbers', durationMinutes: 40, videoUrl: 'https://example.com/v31', pdfTitle: 'Mobile Vibration Basics.pdf', isCompleted: false },
        { id: 'l32', title: 'Compound Analysis of Ten Digits & Ending Pairs', durationMinutes: 45, videoUrl: 'https://example.com/v32', pdfTitle: 'Pair Harmonies & Clashes.pdf', isCompleted: false },
        { id: 'l33', title: 'Selecting the Ideal Business Sim Number', durationMinutes: 50, videoUrl: 'https://example.com/v33', pdfTitle: 'Commercial Telephony Guide.pdf', isCompleted: false }
      ],
      quizzes: [
        {
          id: 'q31',
          question: 'Why should ending a phone number with zero (0) generally be avoided in professional numerology?',
          options: ['It represents drainage of accrued relationships and assets', 'It increases phone billing', 'It is considered unlucky in all cultures', 'It confuses callers'],
          correctIndex: 0
        }
      ]
    },
    {
      id: 'course-4',
      title: 'Name Numerology',
      tagline: 'Master Chaldean phonetic values, brand naming, spelling corrections, and phonetic balances.',
      description: 'Detailed training on transforming life fortunes through scientific name tuning. Learn alphabet numerical values, compound master numbers, and commercial brand resonance.',
      thumbnail: '/src/assets/images/hero_sacred_numerology_1792054438574.jpg',
      instructorName: 'Acharya Gyan Jyothi',
      instructorTitle: 'Master Occult Scientist',
      durationWeeks: 6,
      totalLessons: 22,
      totalPdfMaterials: 7,
      price: 6499,
      isEnrolled: false,
      progressPercent: 0,
      certificateIssued: false,
      lessons: [
        { id: 'l41', title: 'The Chaldean Alphabetical Energy Table', durationMinutes: 50, videoUrl: 'https://example.com/v41', pdfTitle: 'Chaldean Alphabet Values.pdf', isCompleted: false },
        { id: 'l42', title: 'Compound Numbers from 10 to 52 in Detail', durationMinutes: 65, videoUrl: 'https://example.com/v42', pdfTitle: 'Compound Numbers Guide.pdf', isCompleted: false },
        { id: 'l43', title: 'Business Branding & Trademark Name Numerology', durationMinutes: 55, videoUrl: 'https://example.com/v43', pdfTitle: 'Corporate Naming Handbook.pdf', isCompleted: false }
      ],
      quizzes: [
        {
          id: 'q41',
          question: 'In the Chaldean system, which number is assigned to the letter P and F?',
          options: ['8', '7', '4', '6'],
          correctIndex: 0
        }
      ]
    },
    {
      id: 'course-5',
      title: 'Wristwatch Numerology',
      tagline: 'Understand chronometric geometry, watch dial numbers, and time-frequency synchronization.',
      description: 'Discover the occult symbolism of horological wear: dial geometry, bezel tones, mechanical movements, and numbers displayed on the watch face.',
      thumbnail: '/src/assets/images/consultation_sanctum_1792054439062.jpg',
      instructorName: 'Acharya Gyan Jyothi',
      instructorTitle: 'Master Occult Scientist',
      durationWeeks: 3,
      totalLessons: 12,
      totalPdfMaterials: 4,
      price: 3999,
      isEnrolled: false,
      progressPercent: 0,
      certificateIssued: false,
      lessons: [
        { id: 'l51', title: 'Occult Energetics of Timepieces on the Wrist', durationMinutes: 38, videoUrl: 'https://example.com/v51', pdfTitle: 'Timepiece Principles.pdf', isCompleted: false },
        { id: 'l52', title: 'Dial Geometry: Circular vs Square vs Tonneau Shapes', durationMinutes: 44, videoUrl: 'https://example.com/v52', pdfTitle: 'Dial Shape Geometry.pdf', isCompleted: false }
      ],
      quizzes: [
        {
          id: 'q51',
          question: 'What element is primarily symbolized by a round circular dial watch?',
          options: ['Air and Metal', 'Water and Fire', 'Earth and Ether', 'Wood and Stone'],
          correctIndex: 0
        }
      ]
    },
    {
      id: 'course-6',
      title: 'Signature Numerology',
      tagline: 'Analyze grapho-numerological stroke velocity, baseline rise, and subconscious handwriting lines.',
      description: 'Learn how a personal signature is a financial and subconscious blueprint. Decode underscore lines, dot placements, opening flourishes, and upward ascending baselines.',
      thumbnail: '/src/assets/images/loshu_sacred_grid_1792054438993.jpg',
      instructorName: 'Acharya Gyan Jyothi',
      instructorTitle: 'Master Occult Scientist',
      durationWeeks: 4,
      totalLessons: 14,
      totalPdfMaterials: 5,
      price: 4499,
      isEnrolled: false,
      progressPercent: 0,
      certificateIssued: false,
      lessons: [
        { id: 'l61', title: 'Signature as the Subconscious Seal of Destiny', durationMinutes: 42, videoUrl: 'https://example.com/v61', pdfTitle: 'Grapho Numerology Basics.pdf', isCompleted: false },
        { id: 'l62', title: 'Ascending Baselines & Underscore Remedies', durationMinutes: 48, videoUrl: 'https://example.com/v62', pdfTitle: 'Signature Corrections.pdf', isCompleted: false }
      ],
      quizzes: [
        {
          id: 'q61',
          question: 'An upward sloping signature (approx. 15 to 30 degrees) traditionally indicates what?',
          options: ['Optimism, constructive ambition, and upward career trajectory', 'Pessimism and lethargy', 'Financial debt', 'Lack of social confidence'],
          correctIndex: 0
        }
      ]
    },
    {
      id: 'course-7',
      title: 'Health Numerology',
      tagline: 'Study traditional planetary constitutions, doshic affinities, and ethical wellness guidance.',
      description: 'Explore historical occult correlations between numeric planetary frequencies, bodily temperaments, and lifestyle rhythms with full non-medical disclaimers.',
      thumbnail: '/src/assets/images/hero_sacred_numerology_1792054438574.jpg',
      instructorName: 'Acharya Gyan Jyothi',
      instructorTitle: 'Master Occult Scientist',
      durationWeeks: 5,
      totalLessons: 18,
      totalPdfMaterials: 6,
      price: 5499,
      isEnrolled: false,
      progressPercent: 0,
      certificateIssued: false,
      lessons: [
        { id: 'l71', title: 'Traditional Planetary Constitutions in Ancient Numerology', durationMinutes: 46, videoUrl: 'https://example.com/v71', pdfTitle: 'Constitutional Numerology.pdf', isCompleted: false },
        { id: 'l72', title: 'Dietary Harmonization & Seasonal Ayurvedic Alignments', durationMinutes: 52, videoUrl: 'https://example.com/v72', pdfTitle: 'Lifestyle Harmonies.pdf', isCompleted: false },
        { id: 'l73', title: 'Ethical Guidelines & Mandatory Medical Disclaimers', durationMinutes: 35, videoUrl: 'https://example.com/v73', pdfTitle: 'Ethics and Safety Disclaimers.pdf', isCompleted: false }
      ],
      quizzes: [
        {
          id: 'q71',
          question: 'What is the mandatory professional practice when offering Health Numerology guidance?',
          options: [
            'Always provide a clear disclaimer that numerology is traditional spiritual guidance and never a substitute for medical doctors',
            'Prescribe allopathic medications directly',
            'Advise clients to ignore clinical diagnoses',
            'Claim 100% cure guarantee'
          ],
          correctIndex: 0
        }
      ]
    }
  ]);

  // Appointments Store
  public readonly appointments = signal<AppointmentRecord[]>([
    {
      id: 'apt-101',
      referenceNumber: 'GJOS-2026-8812',
      customerName: 'Priya Kulkarni',
      mobileNumber: '+91 98234 56789',
      whatsappNumber: '+91 98234 56789',
      email: 'priya.kulkarni@example.com',
      dateOfBirth: '1992-06-15',
      serviceId: 'srv-1',
      serviceTitle: 'Date of Birth Numerology',
      appointmentDate: '2026-10-18',
      timeSlot: '11:30 AM - 12:30 PM',
      consultationMode: 'Video Consultation',
      additionalQuestions: 'Seeking career transition clarity and lucky business colors for 2027.',
      status: 'Confirmed',
      createdAt: '2026-10-14T09:20:00Z',
      meetingLink: 'https://meet.google.com/gjo-scie-vid',
      consultationNotes: 'Mulank 6, Bhagyank 6. Strong Venusian frequency. Advised pastel blue and silver.',
      feeAmount: 2499,
      paymentId: 'pay_rzp_demo_8812',
      paymentStatus: 'Verified'
    },
    {
      id: 'apt-102',
      referenceNumber: 'GJOS-2026-8813',
      customerName: 'Rajesh Venkat',
      mobileNumber: '+91 94480 33221',
      whatsappNumber: '+91 94480 33221',
      email: 'rajesh.v@example.com',
      dateOfBirth: '1985-11-23',
      serviceId: 'srv-4',
      serviceTitle: 'Name Numerology',
      appointmentDate: '2026-10-19',
      timeSlot: '02:00 PM - 03:00 PM',
      consultationMode: 'In-Person Consultation',
      additionalQuestions: 'Need corporate firm name evaluation for architectural startup.',
      status: 'Pending',
      createdAt: '2026-10-15T01:10:00Z',
      feeAmount: 3499,
      paymentStatus: 'Pending'
    },
    {
      id: 'apt-103',
      referenceNumber: 'GJOS-2026-8814',
      customerName: 'Ananya Deshmukh',
      mobileNumber: '+91 97654 99881',
      whatsappNumber: '+91 97654 99881',
      email: 'ananya.d@example.com',
      dateOfBirth: '1998-04-09',
      serviceId: 'srv-2',
      serviceTitle: 'Lo Shu Grid Numerology',
      appointmentDate: '2026-10-20',
      timeSlot: '03:30 PM - 04:30 PM',
      consultationMode: 'Phone Consultation',
      additionalQuestions: 'Missing number 5 remedy analysis.',
      status: 'Confirmed',
      createdAt: '2026-10-13T14:40:00Z',
      meetingLink: 'Direct Telephonic Bridge: +91 98450 12890',
      feeAmount: 2999,
      paymentId: 'pay_rzp_demo_8814',
      paymentStatus: 'Verified'
    }
  ]);

  // Customer CRM Leads Store
  public readonly leads = signal<LeadItem[]>([
    {
      id: 'lead-1',
      name: 'Vikramaditya Rao',
      mobile: '+91 98860 11223',
      whatsapp: '+91 98860 11223',
      email: 'vikram.rao@enterprise.com',
      source: 'Consultation Enquiry',
      interest: 'Corporate Name Numerology & Brand Tuning',
      status: 'Interested',
      notes: [
        'Expressed interest in reviewing 3 proposed tech company names.',
        'Requested quote for company board members analysis.'
      ],
      createdAt: '2026-10-14 10:30',
      nextFollowUp: '2026-10-17 11:00'
    },
    {
      id: 'lead-2',
      name: 'Sunita Mehra',
      mobile: '+91 98112 44556',
      whatsapp: '+91 98112 44556',
      email: 'sunita.mehra@gmail.com',
      source: 'Course Enquiry',
      interest: 'Lo Shu Grid Mastery Certification',
      status: 'Follow-up',
      notes: [
        'Enquired if weekend live doubt sessions are included with course.',
        'Sent brochure and sample video lesson.'
      ],
      createdAt: '2026-10-13 16:15',
      nextFollowUp: '2026-10-16 14:00'
    },
    {
      id: 'lead-3',
      name: 'Karthik Nambiar',
      mobile: '+91 99450 77889',
      whatsapp: '+91 99450 77889',
      email: 'karthik.n@yahoo.com',
      source: 'WhatsApp Enquiry',
      interest: 'Mobile Number Harmony Consultation',
      status: 'New',
      notes: [
        'Messaged on WhatsApp asking for quick DOB check against current SIM.'
      ],
      createdAt: '2026-10-15 08:45',
      nextFollowUp: '2026-10-15 17:00'
    },
    {
      id: 'lead-4',
      name: 'Meera Sengupta',
      mobile: '+91 98300 22334',
      whatsapp: '+91 98300 22334',
      email: 'meera.s@gmail.com',
      source: 'Website Lead',
      interest: 'Full Occult Science Diploma Program',
      status: 'Converted',
      notes: [
        'Enrolled into Numbers Characteristics and Lo Shu Grid bundle.',
        'Payment verified successfully.'
      ],
      createdAt: '2026-10-11 11:00'
    }
  ]);

  // Payment Transactions Store
  public readonly payments = signal<PaymentTransaction[]>([
    {
      id: 'tx-1',
      receiptNumber: 'RCPT-2026-1001',
      customerName: 'Priya Kulkarni',
      customerEmail: 'priya.kulkarni@example.com',
      customerPhone: '+91 98234 56789',
      category: 'Numerology Consultation Fees',
      itemTitle: 'Date of Birth Numerology Consultation',
      amount: 2499,
      paymentMethod: 'Razorpay UPI',
      status: 'Verified',
      transactionId: 'pay_rzp_live_8812A',
      createdAt: '2026-10-14 09:25'
    },
    {
      id: 'tx-2',
      receiptNumber: 'RCPT-2026-1002',
      customerName: 'Aarav Sharma',
      customerEmail: 'aarav.sharma@example.com',
      customerPhone: '+91 98765 12345',
      category: 'Course Enrollment Fees',
      itemTitle: 'Lo Shu Grid Numerology Course',
      amount: 6999,
      paymentMethod: 'Razorpay Card',
      status: 'Verified',
      transactionId: 'pay_rzp_live_7719B',
      createdAt: '2026-10-10 14:10'
    },
    {
      id: 'tx-3',
      receiptNumber: 'RCPT-2026-1003',
      customerName: 'Ananya Deshmukh',
      customerEmail: 'ananya.d@example.com',
      customerPhone: '+91 97654 99881',
      category: 'Numerology Consultation Fees',
      itemTitle: 'Lo Shu Grid Numerology Consultation',
      amount: 2999,
      paymentMethod: 'Razorpay UPI',
      status: 'Verified',
      transactionId: 'pay_rzp_live_8814C',
      createdAt: '2026-10-13 14:45'
    },
    {
      id: 'tx-4',
      receiptNumber: 'RCPT-2026-1004',
      customerName: 'Rajesh Venkat',
      customerEmail: 'rajesh.v@example.com',
      customerPhone: '+91 94480 33221',
      category: 'Numerology Consultation Fees',
      itemTitle: 'Name Numerology Consultation',
      amount: 3499,
      paymentMethod: 'Razorpay NetBanking',
      status: 'Pending',
      transactionId: 'pay_rzp_init_9901X',
      createdAt: '2026-10-15 01:10'
    }
  ]);

  // Derived Admin KPI Stats
  public readonly adminStats = computed(() => {
    const apts = this.appointments();
    const crs = this.courses();
    const txs = this.payments();
    const lds = this.leads();

    const totalAppointments = apts.length;
    const pendingAppointments = apts.filter(a => a.status === 'Pending').length;
    const completedConsultations = apts.filter(a => a.status === 'Completed').length;
    
    const verifiedRevenue = txs
      .filter(t => t.status === 'Verified')
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingRevenue = txs
      .filter(t => t.status === 'Pending')
      .reduce((sum, t) => sum + t.amount, 0);

    const newLeads = lds.filter(l => l.status === 'New').length;
    const totalStudents = 142; // Enrolled historical community
    const activeCourses = crs.length;
    const courseEnrollments = crs.filter(c => c.isEnrolled).length;

    return {
      totalCustomers: 384,
      totalAppointments,
      pendingAppointments,
      completedConsultations,
      totalStudents,
      activeCourses,
      courseEnrollments,
      verifiedRevenue,
      pendingRevenue,
      newLeads
    };
  });

  constructor() {
    this.loadFromStorage();
  }

  // --- Appointments Management ---

  public isSlotBooked(date: string, timeSlot: string, excludeId?: string): boolean {
    return this.appointments().some(
      a => a.appointmentDate === date && 
           a.timeSlot === timeSlot && 
           a.status !== 'Cancelled' && 
           a.id !== excludeId
    );
  }

  public bookAppointment(newApt: Omit<AppointmentRecord, 'id' | 'referenceNumber' | 'status' | 'createdAt'>): { success: boolean; message: string; appointment?: AppointmentRecord } {
    if (this.isSlotBooked(newApt.appointmentDate, newApt.timeSlot)) {
      return {
        success: false,
        message: 'This time slot has already been reserved. Please select another slot or date.'
      };
    }

    const refNum = `GJOS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdApt: AppointmentRecord = {
      ...newApt,
      id: `apt-${Date.now()}`,
      referenceNumber: refNum,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      meetingLink: newApt.consultationMode === 'Video Consultation' 
        ? `https://meet.google.com/gjo-${Math.random().toString(36).substring(2, 6)}-vid`
        : newApt.consultationMode === 'Phone Consultation' 
          ? `Direct Telephonic Bridge: ${this.settings().contactNumber}`
          : `Chamber: ${this.settings().officeAddress}`
    };

    this.appointments.update(list => [createdApt, ...list]);

    // Also create CRM lead and payment record
    this.addLead({
      name: newApt.customerName,
      mobile: newApt.mobileNumber,
      whatsapp: newApt.whatsappNumber,
      email: newApt.email,
      source: 'Consultation Enquiry',
      interest: newApt.serviceTitle,
      status: 'Converted',
      notes: [`Booked consultation #${refNum} for ${newApt.appointmentDate} (${newApt.timeSlot})`]
    });

    if (newApt.paymentStatus === 'Verified') {
      this.addPayment({
        customerName: newApt.customerName,
        customerEmail: newApt.email,
        customerPhone: newApt.mobileNumber,
        category: 'Numerology Consultation Fees',
        itemTitle: `${newApt.serviceTitle} Consultation`,
        amount: newApt.feeAmount,
        paymentMethod: 'Razorpay UPI',
        status: 'Verified'
      });
    }

    this.saveToStorage();
    return { success: true, message: 'Consultation appointment confirmed successfully.', appointment: createdApt };
  }

  public updateAppointmentStatus(id: string, status: AppointmentRecord['status'], notes?: string, meetingLink?: string): void {
    this.appointments.update(list =>
      list.map(a => {
        if (a.id === id) {
          return {
            ...a,
            status,
            consultationNotes: notes !== undefined ? notes : a.consultationNotes,
            meetingLink: meetingLink !== undefined ? meetingLink : a.meetingLink
          };
        }
        return a;
      })
    );
    this.saveToStorage();
  }

  public rescheduleAppointment(id: string, newDate: string, newTimeSlot: string): { success: boolean; message: string } {
    if (this.isSlotBooked(newDate, newTimeSlot, id)) {
      return { success: false, message: 'The requested new slot is not available. Please pick another timing.' };
    }

    this.appointments.update(list =>
      list.map(a => {
        if (a.id === id) {
          return {
            ...a,
            appointmentDate: newDate,
            timeSlot: newTimeSlot,
            status: 'Rescheduled'
          };
        }
        return a;
      })
    );
    this.saveToStorage();
    return { success: true, message: 'Appointment rescheduled successfully.' };
  }

  public cancelAppointment(id: string): void {
    this.appointments.update(list =>
      list.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a)
    );
    this.saveToStorage();
  }

  // --- CRM Leads Management ---

  public addLead(lead: Omit<LeadItem, 'id' | 'createdAt'>): void {
    const newLead: LeadItem = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    this.leads.update(list => [newLead, ...list]);
    this.saveToStorage();
  }

  public updateLeadStatus(id: string, status: LeadItem['status'], newNote?: string, nextFollowUp?: string): void {
    this.leads.update(list =>
      list.map(l => {
        if (l.id === id) {
          const notes = [...l.notes];
          if (newNote) {
            notes.push(`[${new Date().toISOString().substring(0, 10)}] ${newNote}`);
          }
          return {
            ...l,
            status,
            notes,
            nextFollowUp: nextFollowUp !== undefined ? nextFollowUp : l.nextFollowUp
          };
        }
        return l;
      })
    );
    this.saveToStorage();
  }

  // --- Courses & LMS Management ---

  public enrollInCourse(courseId: string, paymentMethod: PaymentTransaction['paymentMethod']): { success: boolean; message: string } {
    const course = this.courses().find(c => c.id === courseId);
    if (!course) return { success: false, message: 'Course not found.' };

    this.courses.update(list =>
      list.map(c => {
        if (c.id === courseId) {
          return { ...c, isEnrolled: true, progressPercent: 0 };
        }
        return c;
      })
    );

    this.currentStudent.update(s => ({
      ...s,
      enrolledCourseIds: [...new Set([...s.enrolledCourseIds, courseId])]
    }));

    // Record verified transaction
    this.addPayment({
      customerName: this.currentStudent().name,
      customerEmail: this.currentStudent().email,
      customerPhone: this.currentStudent().phone,
      category: 'Course Enrollment Fees',
      itemTitle: course.title,
      amount: course.price,
      paymentMethod,
      status: 'Verified'
    });

    this.saveToStorage();
    return { success: true, message: `Successfully enrolled in ${course.title}!` };
  }

  public markLessonComplete(courseId: string, lessonId: string): void {
    this.courses.update(list =>
      list.map(c => {
        if (c.id === courseId) {
          const updatedLessons = c.lessons.map(l => l.id === lessonId ? { ...l, isCompleted: true } : l);
          const completedCount = updatedLessons.filter(l => l.isCompleted).length;
          const progressPercent = Math.round((completedCount / updatedLessons.length) * 100);
          const certificateIssued = progressPercent === 100;
          return {
            ...c,
            lessons: updatedLessons,
            progressPercent,
            certificateIssued: certificateIssued ? true : c.certificateIssued,
            certificateDate: certificateIssued && !c.certificateDate ? new Date().toLocaleDateString('en-GB') : c.certificateDate
          };
        }
        return c;
      })
    );
    this.saveToStorage();
  }

  public updateCoursePrice(courseId: string, newPrice: number): void {
    this.courses.update(list =>
      list.map(c => c.id === courseId ? { ...c, price: newPrice } : c)
    );
    this.saveToStorage();
  }

  // --- Services Management ---

  public updateServicePrice(serviceId: string, newPrice: number): void {
    this.services.update(list =>
      list.map(s => s.id === serviceId ? { ...s, price: newPrice } : s)
    );
    this.saveToStorage();
  }

  public toggleServiceAvailability(serviceId: string): void {
    this.services.update(list =>
      list.map(s => s.id === serviceId ? { ...s, isAvailable: !s.isAvailable } : s)
    );
    this.saveToStorage();
  }

  // --- Payments Management ---

  public addPayment(payment: Omit<PaymentTransaction, 'id' | 'receiptNumber' | 'transactionId' | 'createdAt'>): PaymentTransaction {
    const receiptNumber = `RCPT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const transactionId = `pay_rzp_${Math.random().toString(36).substring(2, 9)}`;
    const tx: PaymentTransaction = {
      ...payment,
      id: `tx-${Date.now()}`,
      receiptNumber,
      transactionId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    this.payments.update(list => [tx, ...list]);
    this.saveToStorage();
    return tx;
  }

  // --- Settings Management ---

  public updateSettings(partial: Partial<InstituteSettings>): void {
    this.settings.update(s => ({
      ...s,
      ...partial,
      // Institute name must remain strictly "GYAN JYOTHI SCHOOL OF OCCULT SCIENCE"
      instituteName: 'GYAN JYOTHI SCHOOL OF OCCULT SCIENCE'
    }));
    this.saveToStorage();
  }

  // --- LocalStorage Synchronization ---

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('gjos_settings', JSON.stringify(this.settings()));
      localStorage.setItem('gjos_services', JSON.stringify(this.services()));
      localStorage.setItem('gjos_courses', JSON.stringify(this.courses()));
      localStorage.setItem('gjos_appointments', JSON.stringify(this.appointments()));
      localStorage.setItem('gjos_leads', JSON.stringify(this.leads()));
      localStorage.setItem('gjos_payments', JSON.stringify(this.payments()));
    } catch {
      // Fallback
    }
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const storedSettings = localStorage.getItem('gjos_settings');
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (!parsed.expertPhotoUrl || parsed.expertPhotoUrl.includes('expert_guruji_portrait_1792054438535')) {
          parsed.expertPhotoUrl = '/src/assets/images/guruji_numerology_expert_1792057088016.jpg';
        }
        this.settings.set(parsed);
      }

      const storedServices = localStorage.getItem('gjos_services');
      if (storedServices) this.services.set(JSON.parse(storedServices));

      const storedCourses = localStorage.getItem('gjos_courses');
      if (storedCourses) this.courses.set(JSON.parse(storedCourses));

      const storedAppointments = localStorage.getItem('gjos_appointments');
      if (storedAppointments) this.appointments.set(JSON.parse(storedAppointments));

      const storedLeads = localStorage.getItem('gjos_leads');
      if (storedLeads) this.leads.set(JSON.parse(storedLeads));

      const storedPayments = localStorage.getItem('gjos_payments');
      if (storedPayments) this.payments.set(JSON.parse(storedPayments));
    } catch {
      // Use defaults
    }
  }
}
