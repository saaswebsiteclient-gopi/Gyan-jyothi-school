export type ConsultationMode = 'Phone Consultation' | 'Video Consultation' | 'In-Person Consultation';

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Rescheduled' | 'Completed' | 'Cancelled';

export type LeadStatus = 'New' | 'Contacted' | 'Interested' | 'Follow-up' | 'Converted' | 'Closed';

export type PaymentCategory = 
  | 'Numerology Consultation Fees' 
  | 'Course Enrollment Fees' 
  | 'Consultation Packages' 
  | 'Numerology Software Purchases';

export interface ServiceItem {
  id: string;
  title: string;
  categoryNumber: number;
  price: number;
  isAvailable: boolean;
  // Final 3 services must NOT have descriptions or subservices
  isTitleOnly?: boolean;
  shortDescription?: string;
  features?: string[];
  icon: string;
}

export interface AppointmentRecord {
  id: string;
  referenceNumber: string;
  customerName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  dateOfBirth: string;
  serviceId: string;
  serviceTitle: string;
  appointmentDate: string;
  timeSlot: string;
  consultationMode: ConsultationMode;
  additionalQuestions?: string;
  status: AppointmentStatus;
  createdAt: string;
  meetingLink?: string;
  consultationNotes?: string;
  followUpDate?: string;
  feeAmount: number;
  paymentId?: string;
  paymentStatus: 'Pending' | 'Verified';
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl: string;
  pdfNotesUrl?: string;
  pdfTitle?: string;
  isCompleted?: boolean;
}

export interface CourseQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface CourseItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  instructorName: string;
  instructorTitle: string;
  durationWeeks: number;
  totalLessons: number;
  totalPdfMaterials: number;
  price: number;
  isEnrolled?: boolean;
  progressPercent?: number;
  lessons: CourseLesson[];
  quizzes: CourseQuizQuestion[];
  certificateIssued?: boolean;
  certificateDate?: string;
}

export interface LeadItem {
  id: string;
  name: string;
  mobile: string;
  whatsapp: string;
  email: string;
  source: 'Consultation Enquiry' | 'Course Enquiry' | 'WhatsApp Enquiry' | 'Website Lead';
  interest: string;
  status: LeadStatus;
  notes: string[];
  createdAt: string;
  nextFollowUp?: string;
  assignedTo?: string;
}

export interface PaymentTransaction {
  id: string;
  receiptNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  category: PaymentCategory;
  itemTitle: string;
  amount: number;
  paymentMethod: 'Razorpay UPI' | 'Razorpay Card' | 'Razorpay NetBanking';
  status: 'Verified' | 'Pending' | 'Refunded';
  transactionId: string;
  createdAt: string;
}

export interface InstituteSettings {
  instituteName: string;
  tagline: string;
  logoUrl: string;
  expertName: string;
  expertTitle: string;
  expertPhotoUrl: string;
  expertBio: string;
  contactNumber: string;
  whatsappNumber: string;
  emailAddress: string;
  officeAddress: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    whatsapp: string;
  };
  availableTimeSlots: string[];
  razorpayKeyId: string;
  razorpayMode: 'Live' | 'Test Mode';
  privacyPolicy: string;
  termsAndConditions: string;
}

export interface NumerologyReportData {
  customerName: string;
  dob: string;
  gender?: string;
  mobileNumber?: string;
  birthNumber: number;
  destinyNumber: number;
  nameNumber: number;
  planetaryRuler: string;
  luckyColors: string[];
  luckyNumbers: number[];
  unfavorableNumbers: number[];
  loShuGrid: Record<number, number>;
  planeStrengths: { name: string; percentage: number; interpretation: string }[];
  lifePathOverview: string;
  remedies: string[];
}
