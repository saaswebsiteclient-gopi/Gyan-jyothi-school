import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { AppointmentRecord } from '../../models/occult.models';

@Component({
  selector: 'app-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './admin.html'
})
export class AdminPage {
  public readonly dataService = inject(DataService);

  public readonly activeTab = signal<'stats' | 'branding' | 'services' | 'appointments' | 'courses' | 'payments' | 'settings'>('stats');

  // Appointment Editor Drawer
  public readonly editingAppointment = signal<AppointmentRecord | null>(null);
  public readonly editStatus = signal<AppointmentRecord['status']>('Confirmed');
  public readonly editMeetingLink = signal<string>('');
  public readonly editNotes = signal<string>('');

  // Branding & Settings temporary edit forms
  public readonly expertName = signal<string>(this.dataService.settings().expertName);
  public readonly expertTitle = signal<string>(this.dataService.settings().expertTitle);
  public readonly contactNumber = signal<string>(this.dataService.settings().contactNumber);
  public readonly whatsappNumber = signal<string>(this.dataService.settings().whatsappNumber);
  public readonly emailAddress = signal<string>(this.dataService.settings().emailAddress);
  public readonly officeAddress = signal<string>(this.dataService.settings().officeAddress);
  public readonly razorpayMode = signal<'Live' | 'Test Mode'>(this.dataService.settings().razorpayMode);
  public readonly settingsSavedMessage = signal<string>('');

  public saveBranding(): void {
    this.dataService.updateSettings({
      expertName: this.expertName(),
      expertTitle: this.expertTitle(),
      contactNumber: this.contactNumber(),
      whatsappNumber: this.whatsappNumber(),
      emailAddress: this.emailAddress(),
      officeAddress: this.officeAddress(),
      razorpayMode: this.razorpayMode()
    });

    this.settingsSavedMessage.set('Institute branding and operational settings saved successfully.');
    setTimeout(() => this.settingsSavedMessage.set(''), 4000);
  }

  public onLogoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          this.dataService.updateSettings({ logoUrl: result });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  public openEditAppointment(apt: AppointmentRecord): void {
    this.editingAppointment.set(apt);
    this.editStatus.set(apt.status);
    this.editMeetingLink.set(apt.meetingLink || '');
    this.editNotes.set(apt.consultationNotes || '');
  }

  public closeEditAppointment(): void {
    this.editingAppointment.set(null);
  }

  public saveAppointmentChanges(): void {
    const apt = this.editingAppointment();
    if (!apt) return;

    this.dataService.updateAppointmentStatus(
      apt.id,
      this.editStatus(),
      this.editNotes(),
      this.editMeetingLink()
    );

    this.closeEditAppointment();
  }

  public onServicePriceEdit(serviceId: string, newPrice: number): void {
    if (newPrice && newPrice > 0) {
      this.dataService.updateServicePrice(serviceId, Number(newPrice));
    }
  }

  public toggleService(serviceId: string): void {
    this.dataService.toggleServiceAvailability(serviceId);
  }

  public onCoursePriceEdit(courseId: string, newPrice: number): void {
    if (newPrice && newPrice > 0) {
      this.dataService.updateCoursePrice(courseId, Number(newPrice));
    }
  }
}
