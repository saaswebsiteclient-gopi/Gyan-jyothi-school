import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-software',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <!-- Dedicated Numerology Software Page conforming strictly to Module 15:
         Display ONLY:
         - Numerology Software
         - Contact Us
         - Book Appointment
         Do not invent software features, product descriptions, pricing, or functionality.
    -->
    <section class="py-24 bg-stone-50 min-h-[70vh] flex items-center justify-center">
      <div class="max-w-xl mx-auto px-4 sm:px-6 w-full">
        
        <div class="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 shadow-sm text-center space-y-6">
          
          <div class="w-16 h-16 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
            <mat-icon class="!w-8 !h-8 !text-[36px]">laptop_chromebook</mat-icon>
          </div>

          <div class="space-y-2">
            <span class="text-xs font-mono uppercase font-semibold text-amber-700 tracking-wider">
              GYAN JYOTHI SCHOOL OF OCCULT SCIENCE
            </span>
            <h1 class="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
              Numerology Software
            </h1>
          </div>

          <!-- Buttons: Contact Us & Book Appointment -->
          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              routerLink="/appointments"
              class="w-full sm:w-auto px-6 py-3 rounded-md bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-2">
              <mat-icon class="!w-4 !h-4 !text-[18px]">calendar_today</mat-icon>
              Book Appointment
            </a>
            
            <a
              [href]="'tel:' + dataService.settings().contactNumber"
              class="w-full sm:w-auto px-6 py-3 rounded-md bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2">
              <mat-icon class="!w-4 !h-4 !text-[18px]">call</mat-icon>
              Contact Us
            </a>
          </div>

          <div class="pt-6 border-t border-stone-100 text-xs text-stone-500">
            For inquiries regarding software availability, contact: {{ dataService.settings().contactNumber }}
          </div>

        </div>

      </div>
    </section>
  `
})
export class SoftwarePage {
  public readonly dataService = inject(DataService);
}
