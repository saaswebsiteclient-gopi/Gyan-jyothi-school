import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule, MatIconModule],
  template: `
    <!-- Services Header Banner -->
    <section class="bg-emerald-950 text-white py-16 border-b border-emerald-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-3">
          <div class="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400">
            <span>Consultation Matrix</span>
            <span aria-hidden="true">·</span>
            <span>10 Specialized Categories</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold font-display text-white">
            Numerology Consultation Services
          </h1>
          <p class="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Professional occult science consultations conducted personally by Acharya Gyan Jyothi. Select your desired consultation category below to reserve a confidential appointment.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid (Exactly 10 categories) -->
    <section class="py-16 bg-stone-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Admin Quick Control Hint when in admin role -->
        @if (dataService.currentRole() === 'admin') {
          <div class="mb-8 p-4 rounded-lg bg-amber-50 border border-amber-300 text-stone-900 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div class="flex items-center gap-2">
              <mat-icon class="!w-4 !h-4 !text-[18px] text-amber-700">admin_panel_settings</mat-icon>
              <span class="font-bold">Admin Mode Active:</span>
              <span>You can adjust service consultation fees and toggle availability directly on each card or via the Admin Panel.</span>
            </div>
            <a routerLink="/admin" class="font-semibold text-emerald-800 hover:underline">
              Open Full Admin Settings &rarr;
            </a>
          </div>
        }

        <!-- 10 Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of dataService.services(); track service.id) {
            <div
              class="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative">
              
              <div>
                <!-- Top Meta: Category # and Pricing -->
                <div class="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                  <span class="text-xs font-mono font-bold text-amber-700">
                    Category 0{{ service.categoryNumber }}
                  </span>

                  <div class="flex items-center gap-2">
                    <!-- If admin, inline editable price -->
                    @if (dataService.currentRole() === 'admin') {
                      <div class="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <span class="text-xs font-bold text-stone-800">₹</span>
                        <input
                          type="number"
                          [ngModel]="service.price"
                          (ngModelChange)="onPriceChange(service.id, $event)"
                          class="w-16 text-xs font-bold text-stone-900 bg-transparent border-b border-amber-400 focus:outline-hidden"
                        />
                      </div>
                    } @else {
                      <span class="text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded">
                        ₹{{ service.price.toLocaleString('en-IN') }}
                      </span>
                    }

                    <!-- Availability Badge (Admin toggleable) -->
                    @if (dataService.currentRole() === 'admin') {
                      <button
                        (click)="toggleAvailability(service.id)"
                        class="text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer transition-colors"
                        [class]="service.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'">
                        {{ service.isAvailable ? 'Available' : 'Unavailable' }}
                      </button>
                    } @else {
                      <span
                        [class]="service.isAvailable ? 'text-emerald-700 bg-emerald-50' : 'text-stone-500 bg-stone-100'"
                        class="text-[11px] font-medium px-2 py-0.5 rounded">
                        {{ service.isAvailable ? 'Available' : 'Unavailable' }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Title & Icon -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-lg bg-emerald-900/10 border border-emerald-900/20 flex items-center justify-center text-emerald-900 shrink-0">
                    <mat-icon class="!w-5 !h-5 !text-[22px]">{{ service.icon }}</mat-icon>
                  </div>
                  <h2 class="font-cinzel text-lg font-bold text-stone-900 leading-snug">
                    {{ service.title }}
                  </h2>
                </div>

                <!-- Content Area: Strictly Title Only for Services 8, 9, 10 -->
                @if (service.isTitleOnly) {
                  <div class="py-10 text-center border-t border-b border-stone-100 my-4">
                    <div class="w-12 h-1 bg-amber-400 mx-auto mb-3"></div>
                    <p class="text-xs text-stone-500 italic">
                      Traditional institute specialty. Connect with our consultations desk for appointments and customized Vedic evaluations.
                    </p>
                  </div>
                } @else {
                  <p class="text-xs text-stone-600 mb-4 leading-relaxed">
                    {{ service.shortDescription }}
                  </p>

                  <!-- Mandatory Subservices & Features (Module 2) -->
                  @if (service.features) {
                    <div class="pt-3 border-t border-stone-100 mb-6">
                      <div class="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                        Included Analyses
                      </div>
                      <ul class="space-y-1.5 text-xs text-stone-700">
                        @for (feat of service.features; track feat) {
                          <li class="flex items-start gap-2">
                            <mat-icon class="!w-3.5 !h-3.5 !text-[15px] text-amber-600 shrink-0 mt-0.5">check_circle</mat-icon>
                            <span>{{ feat }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  }
                }

                <!-- Health Numerology Medical Disclaimer (Service 7) -->
                @if (service.categoryNumber === 7) {
                  <div class="p-3 mb-4 rounded-md bg-stone-100 border border-stone-200 text-[11px] text-stone-600 leading-relaxed">
                    <strong class="text-stone-800">Medical Disclaimer:</strong> Traditional numerological wellness interpretations only. Never a substitute for certified medical examination, diagnosis, or clinical treatments.
                  </div>
                }
              </div>

              <!-- Book Appointment Action Button -->
              <div class="pt-4 border-t border-stone-100">
                <a
                  [routerLink]="['/appointments']"
                  [queryParams]="{ service: service.id }"
                  class="w-full py-2.5 px-4 rounded-md text-xs font-semibold tracking-wider uppercase text-center block transition-all bg-emerald-900 hover:bg-emerald-800 text-white flex items-center justify-center gap-2">
                  <mat-icon class="!w-4 !h-4 !text-[16px]">calendar_month</mat-icon>
                  Book Appointment
                </a>
              </div>

            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class ServicesPage {
  public readonly dataService = inject(DataService);

  public onPriceChange(serviceId: string, newPrice: number): void {
    if (newPrice && newPrice > 0) {
      this.dataService.updateServicePrice(serviceId, Number(newPrice));
    }
  }

  public toggleAvailability(serviceId: string): void {
    this.dataService.toggleServiceAvailability(serviceId);
  }
}
