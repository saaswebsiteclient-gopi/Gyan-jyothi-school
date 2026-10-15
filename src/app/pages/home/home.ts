import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ReactiveFormsModule, MatIconModule],
  templateUrl: './home.html'
})
export class HomePage {
  public readonly dataService = inject(DataService);
  private readonly fb = inject(FormBuilder);

  public readonly leadSuccessMessage = signal<string>('');

  public readonly leadForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    mobile: ['', [Validators.required, Validators.pattern(/^[0-9+ -]{8,15}$/)]],
    email: ['', [Validators.required, Validators.email]],
    serviceInterest: ['Date of Birth Numerology', Validators.required],
    dob: ['']
  });

  public submitLead(): void {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    const val = this.leadForm.value;
    this.dataService.addLead({
      name: val.name || '',
      mobile: val.mobile || '',
      whatsapp: val.mobile || '',
      email: val.email || '',
      source: 'Website Lead',
      interest: val.serviceInterest || 'General Consultation',
      status: 'New',
      notes: [`Inquired via homepage lead form. DOB: ${val.dob || 'Not provided'}`]
    });

    this.leadSuccessMessage.set('Thank you! Your consultation request has been received. Our senior coordinator will connect with you within 4 business hours.');
    this.leadForm.reset({ serviceInterest: 'Date of Birth Numerology' });
    setTimeout(() => this.leadSuccessMessage.set(''), 6000);
  }
}
