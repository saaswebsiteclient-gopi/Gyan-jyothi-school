import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomePage),
    title: 'Gyan Jyothi School of Occult Science — Authentic Vedic Numerology'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then(m => m.ServicesPage),
    title: '10 Numerology Services — Gyan Jyothi School of Occult Science'
  },
  {
    path: 'appointments',
    loadComponent: () => import('./pages/appointments/appointments').then(m => m.AppointmentsPage),
    title: 'Book Consultation — Gyan Jyothi School of Occult Science'
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/courses/courses').then(m => m.CoursesPage),
    title: 'Numerology Courses & Certifications — Gyan Jyothi School of Occult Science'
  },
  {
    path: 'lms',
    loadComponent: () => import('./pages/lms/lms').then(m => m.LmsPage),
    title: 'Student LMS Portal — Gyan Jyothi School of Occult Science'
  },
  {
    path: 'calculators',
    loadComponent: () => import('./pages/calculators/calculators').then(m => m.CalculatorsPage),
    title: 'Numerology Calculators & Lo Shu Grid — Gyan Jyothi School of Occult Science'
  },
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports').then(m => m.ReportsPage),
    title: 'Printable Numerology Reports — Gyan Jyothi School of Occult Science'
  },
  {
    path: 'software',
    loadComponent: () => import('./pages/software/software').then(m => m.SoftwarePage),
    title: 'Numerology Software — Gyan Jyothi School of Occult Science'
  },
  {
    path: 'crm',
    loadComponent: () => import('./pages/crm/crm').then(m => m.CrmPage),
    title: 'Customer CRM — Gyan Jyothi School of Occult Science'
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.AdminPage),
    title: 'Admin Control Center — Gyan Jyothi School of Occult Science'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
