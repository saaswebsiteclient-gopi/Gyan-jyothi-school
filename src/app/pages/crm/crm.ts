import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { LeadItem, LeadStatus } from '../../models/occult.models';

@Component({
  selector: 'app-crm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatIconModule],
  templateUrl: './crm.html'
})
export class CrmPage {
  public readonly dataService = inject(DataService);

  public readonly searchQuery = signal<string>('');
  public readonly statusFilter = signal<string>('all');
  public readonly sourceFilter = signal<string>('all');

  // Quick Lead Add
  public readonly showAddModal = signal<boolean>(false);
  public readonly newLeadName = signal<string>('');
  public readonly newLeadPhone = signal<string>('');
  public readonly newLeadEmail = signal<string>('');
  public readonly newLeadSource = signal<LeadItem['source']>('Consultation Enquiry');
  public readonly newLeadInterest = signal<string>('');

  // Selected Lead for Notes & Follow-up modal
  public readonly selectedLead = signal<LeadItem | null>(null);
  public readonly newNoteText = signal<string>('');
  public readonly newFollowUpDate = signal<string>('');

  public readonly filteredLeads = computed(() => {
    const list = this.dataService.leads();
    const q = this.searchQuery().toLowerCase().trim();
    const st = this.statusFilter();
    const src = this.sourceFilter();

    return list.filter(item => {
      const matchQ = !q || item.name.toLowerCase().includes(q) || item.mobile.includes(q) || item.email.toLowerCase().includes(q) || item.interest.toLowerCase().includes(q);
      const matchStatus = st === 'all' || item.status === st;
      const matchSource = src === 'all' || item.source === src;
      return matchQ && matchStatus && matchSource;
    });
  });

  public readonly conversionMetrics = computed(() => {
    const all = this.dataService.leads();
    const total = all.length;
    const converted = all.filter(l => l.status === 'Converted').length;
    const rate = total > 0 ? Math.round((converted / total) * 100) : 0;
    return { total, converted, rate };
  });

  public openAddModal(): void {
    this.showAddModal.set(true);
  }

  public closeAddModal(): void {
    this.showAddModal.set(false);
    this.newLeadName.set('');
    this.newLeadPhone.set('');
    this.newLeadEmail.set('');
    this.newLeadInterest.set('');
  }

  public submitNewLead(): void {
    if (!this.newLeadName() || !this.newLeadPhone()) return;

    this.dataService.addLead({
      name: this.newLeadName(),
      mobile: this.newLeadPhone(),
      whatsapp: this.newLeadPhone(),
      email: this.newLeadEmail() || `${this.newLeadName().toLowerCase().replace(/\\s+/g, '')}@contact.lead`,
      source: this.newLeadSource(),
      interest: this.newLeadInterest() || 'General Occult Guidance',
      status: 'New',
      notes: [`Manual CRM lead created on ${new Date().toLocaleDateString('en-GB')}`]
    });

    this.closeAddModal();
  }

  public openLeadDetails(lead: LeadItem): void {
    this.selectedLead.set(lead);
    this.newNoteText.set('');
    this.newFollowUpDate.set(lead.nextFollowUp || '');
  }

  public closeLeadDetails(): void {
    this.selectedLead.set(null);
  }

  public readonly leadStatuses: LeadStatus[] = ['New', 'Contacted', 'Interested', 'Follow-up', 'Converted', 'Closed'];

  public updateLeadStatus(status: LeadStatus | string): void {
    const lead = this.selectedLead();
    if (!lead) return;
    const validStatus = status as LeadStatus;
    this.dataService.updateLeadStatus(lead.id, validStatus, `Status transitioned to ${validStatus}`);
    const updated = this.dataService.leads().find(l => l.id === lead.id);
    if (updated) this.selectedLead.set(updated);
  }

  public addLeadNote(): void {
    const lead = this.selectedLead();
    if (!lead || !this.newNoteText().trim()) return;
    this.dataService.updateLeadStatus(lead.id, lead.status, this.newNoteText().trim(), this.newFollowUpDate());
    this.newNoteText.set('');
    const updated = this.dataService.leads().find(l => l.id === lead.id);
    if (updated) this.selectedLead.set(updated);
  }
}
