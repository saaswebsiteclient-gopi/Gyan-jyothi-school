import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-whatsapp-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Floating WhatsApp Trigger Button -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end no-print">
      
      <!-- Interactive WhatsApp Popup Dialog -->
      @if (isOpen()) {
        <div class="mb-3 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-4 duration-200">
          <!-- WhatsApp Header -->
          <div class="bg-emerald-900 text-white p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-amber-300 font-bold border border-emerald-700">
                <mat-icon class="!w-5 !h-5 !text-[20px]">chat</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-sm leading-tight text-white">Gyan Jyothi Support</h4>
                <p class="text-[11px] text-emerald-200">Official Occult Science Desk</p>
              </div>
            </div>
            <button
              (click)="toggleOpen()"
              class="text-emerald-300 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Close dialog">
              <mat-icon class="!w-5 !h-5 !text-[20px]">close</mat-icon>
            </button>
          </div>

          <!-- Quick Prefilled Templates -->
          <div class="p-4 space-y-3 bg-stone-50 text-stone-800">
            <p class="text-xs text-stone-600">
              Select an enquiry type to start a direct WhatsApp conversation with our administrative coordinator:
            </p>

            <button
              (click)="sendWhatsapp('Consultation Enquiry: Hello Guruji, I would like to schedule a personal Numerology Consultation.')"
              class="w-full text-left p-2.5 rounded-lg bg-white border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/50 transition-all text-xs font-medium text-stone-800 flex items-center justify-between group">
              <span class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[16px] text-emerald-700">calendar_today</mat-icon>
                Consultation Enquiry
              </span>
              <mat-icon class="!w-4 !h-4 !text-[16px] text-stone-400 group-hover:text-emerald-700">arrow_forward</mat-icon>
            </button>

            <button
              (click)="sendWhatsapp('Course Enquiry: Namaste, I want to learn more about the Lo Shu Grid and Numbers Certification Courses.')"
              class="w-full text-left p-2.5 rounded-lg bg-white border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/50 transition-all text-xs font-medium text-stone-800 flex items-center justify-between group">
              <span class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[16px] text-emerald-700">school</mat-icon>
                Course & LMS Enquiry
              </span>
              <mat-icon class="!w-4 !h-4 !text-[16px] text-stone-400 group-hover:text-emerald-700">arrow_forward</mat-icon>
            </button>

            <button
              (click)="sendWhatsapp('Appointment Booking: Namaste, I submitted a booking request and would like to confirm my consultation slot.')"
              class="w-full text-left p-2.5 rounded-lg bg-white border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/50 transition-all text-xs font-medium text-stone-800 flex items-center justify-between group">
              <span class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[16px] text-emerald-700">verified</mat-icon>
                Confirm Appointment Slot
              </span>
              <mat-icon class="!w-4 !h-4 !text-[16px] text-stone-400 group-hover:text-emerald-700">arrow_forward</mat-icon>
            </button>

            <div class="pt-2 text-[11px] text-stone-500 flex items-center justify-between border-t border-stone-200">
              <span>Admin Phone: {{ dataService.settings().whatsappNumber }}</span>
              <span class="text-emerald-800 font-semibold">Active Desk</span>
            </div>
          </div>
        </div>
      }

      <!-- Trigger Button -->
      <button
        (click)="toggleOpen()"
        class="h-14 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg hover:shadow-xl flex items-center gap-2.5 transition-all transform active:scale-95 border-2 border-white/20 cursor-pointer"
        aria-label="WhatsApp Consultation">
        <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <mat-icon class="!w-5 !h-5 !text-[20px] leading-none">chat</mat-icon>
        </span>
        <span class="text-xs font-semibold tracking-wide whitespace-nowrap">WhatsApp Consult</span>
      </button>

    </div>
  `
})
export class AppWhatsappWidget {
  public readonly dataService = inject(DataService);
  public readonly isOpen = signal<boolean>(false);

  public toggleOpen(): void {
    this.isOpen.update(v => !v);
  }

  public sendWhatsapp(message: string): void {
    const rawNumber = this.dataService.settings().whatsappNumber.replace(/\D/g, '');
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${rawNumber}?text=${encoded}`;
    
    // Log WhatsApp enquiry into CRM Leads automatically
    this.dataService.addLead({
      name: 'WhatsApp Inquirer',
      mobile: this.dataService.settings().whatsappNumber,
      whatsapp: this.dataService.settings().whatsappNumber,
      email: 'whatsapp@direct.inquiry',
      source: 'WhatsApp Enquiry',
      interest: message.substring(0, 45) + '...',
      status: 'New',
      notes: [`Initiated WhatsApp message: "${message}"`]
    });

    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    this.isOpen.set(false);
  }
}
