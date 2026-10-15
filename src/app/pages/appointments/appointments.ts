import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { AppointmentRecord, ConsultationMode } from '../../models/occult.models';

@Component({
  selector: 'app-appointments',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './appointments.html'
})
export class AppointmentsPage implements OnInit {
  public readonly dataService = inject(DataService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  public readonly activeTab = signal<'book' | 'history' | 'manage'>('book');
  public readonly confirmationAppointment = signal<AppointmentRecord | null>(null);
  public readonly bookingError = signal<string>('');
  public readonly rescheduleTarget = signal<AppointmentRecord | null>(null);
  public readonly rescheduleDate = signal<string>('');
  public readonly rescheduleSlot = signal<string>('');
  public readonly rescheduleMsg = signal<string>('');

  // Payment checkout simulation modal
  public readonly showPaymentModal = signal<boolean>(false);
  public readonly pendingBookingPayload = signal<Omit<AppointmentRecord, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'paymentStatus'> | null>(null);

  // Today's date in YYYY-MM-DD
  public readonly minBookingDate = new Date().toISOString().split('T')[0];

  public readonly bookingForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9+ -]{8,15}$/)]],
    whatsappNumber: ['', [Validators.required, Validators.pattern(/^[0-9+ -]{8,15}$/)]],
    emailAddress: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', Validators.required],
    serviceId: ['srv-1', Validators.required],
    preferredDate: [this.minBookingDate, Validators.required],
    availableTimeSlot: ['', Validators.required],
    consultationMode: ['Video Consultation' as ConsultationMode, Validators.required],
    additionalQuestions: ['']
  });

  ngOnInit(): void {
    // If navigated with ?service=srv-X
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        this.bookingForm.patchValue({ serviceId: params['service'] });
      }
    });

    // Default first slot
    const slots = this.dataService.settings().availableTimeSlots;
    if (slots && slots.length > 0) {
      this.bookingForm.patchValue({ availableTimeSlot: slots[0] });
    }
  }

  public getSelectedService() {
    const sId = this.bookingForm.get('serviceId')?.value;
    return this.dataService.services().find(s => s.id === sId) || this.dataService.services()[0];
  }

  public isSlotAvailable(date: string, slot: string): boolean {
    return !this.dataService.isSlotBooked(date, slot);
  }

  public onInitiateBooking(): void {
    this.bookingError.set('');
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const val = this.bookingForm.value;
    const selectedDate = val.preferredDate || '';
    const selectedSlot = val.availableTimeSlot || '';

    // Double-booking check
    if (this.dataService.isSlotBooked(selectedDate, selectedSlot)) {
      this.bookingError.set('Double-Booking Prevented: This specific time slot on ' + selectedDate + ' is already reserved by another client. Please pick another timing.');
      return;
    }

    const service = this.getSelectedService();

    // Prepare payload and open Razorpay payment simulation modal
    this.pendingBookingPayload.set({
      customerName: val.fullName || '',
      mobileNumber: val.mobileNumber || '',
      whatsappNumber: val.whatsappNumber || '',
      email: val.emailAddress || '',
      dateOfBirth: val.dateOfBirth || '',
      serviceId: service.id,
      serviceTitle: service.title,
      appointmentDate: selectedDate,
      timeSlot: selectedSlot,
      consultationMode: val.consultationMode || 'Video Consultation',
      additionalQuestions: val.additionalQuestions || '',
      feeAmount: service.price
    });

    this.showPaymentModal.set(true);
  }

  public confirmPaymentAndBook(paymentMode: 'UPI' | 'Card' | 'Netbanking'): void {
    const payload = this.pendingBookingPayload();
    if (!payload) return;

    const methodLabel = paymentMode === 'UPI' ? 'Razorpay UPI' : paymentMode === 'Card' ? 'Razorpay Card' : 'Razorpay NetBanking';
    const res = this.dataService.bookAppointment({
      ...payload,
      paymentId: `pay_rzp_${methodLabel.toLowerCase().replace(/\s+/g, '_')}_${Math.random().toString(36).substring(2, 7)}`,
      paymentStatus: 'Verified'
    });

    this.showPaymentModal.set(false);

    if (res.success && res.appointment) {
      this.confirmationAppointment.set(res.appointment);
    } else {
      this.bookingError.set(res.message);
    }
  }

  public openRescheduleModal(apt: AppointmentRecord): void {
    this.rescheduleTarget.set(apt);
    this.rescheduleDate.set(apt.appointmentDate);
    this.rescheduleSlot.set(apt.timeSlot);
    this.rescheduleMsg.set('');
  }

  public closeRescheduleModal(): void {
    this.rescheduleTarget.set(null);
  }

  public executeReschedule(): void {
    const target = this.rescheduleTarget();
    if (!target) return;

    const res = this.dataService.rescheduleAppointment(
      target.id,
      this.rescheduleDate(),
      this.rescheduleSlot()
    );

    if (res.success) {
      this.rescheduleMsg.set('Appointment successfully rescheduled!');
      setTimeout(() => {
        this.closeRescheduleModal();
      }, 1500);
    } else {
      this.rescheduleMsg.set(res.message);
    }
  }

  public cancelAppointment(id: string): void {
    if (confirm('Are you sure you want to cancel this consultation booking?')) {
      this.dataService.cancelAppointment(id);
    }
  }

  public printBookingReceipt(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }
}
