import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <footer class="bg-emerald-950 text-emerald-100/90 pt-16 pb-12 border-t border-emerald-900 no-print">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          
          <!-- Column 1: Institute Brand Identity -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded bg-emerald-900 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <mat-icon class="!w-5 !h-5 !text-[20px]">explore</mat-icon>
              </div>
              <span class="font-cinzel text-lg font-bold text-white tracking-wide">
                GYAN JYOTHI
              </span>
            </div>
            <p class="font-cinzel text-xs text-amber-400 font-semibold tracking-wider uppercase">
              SCHOOL OF OCCULT SCIENCE
            </p>
            <p class="text-sm text-emerald-200/80 leading-relaxed">
              {{ dataService.settings().tagline }}. Dedicated to rigorous Vedic computation, ethical numerology consultations, and academic occult science training.
            </p>
            <div class="pt-2 flex items-center gap-3">
              <a [href]="dataService.settings().socialLinks.facebook" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-emerald-200 hover:text-amber-400 hover:border-amber-400/50 transition-colors" title="Facebook">
                <span class="text-xs font-bold">f</span>
              </a>
              <a [href]="dataService.settings().socialLinks.instagram" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-emerald-200 hover:text-amber-400 hover:border-amber-400/50 transition-colors" title="Instagram">
                <span class="text-xs font-bold">ig</span>
              </a>
              <a [href]="dataService.settings().socialLinks.youtube" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-emerald-200 hover:text-amber-400 hover:border-amber-400/50 transition-colors" title="YouTube">
                <span class="text-xs font-bold">yt</span>
              </a>
              <a [href]="dataService.settings().socialLinks.linkedin" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-emerald-200 hover:text-amber-400 hover:border-amber-400/50 transition-colors" title="LinkedIn">
                <span class="text-xs font-bold">in</span>
              </a>
              <a [href]="dataService.settings().socialLinks.whatsapp" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-emerald-200 hover:text-amber-400 hover:border-amber-400/50 transition-colors" title="WhatsApp">
                <mat-icon class="!w-4 !h-4 !text-[16px]">chat</mat-icon>
              </a>
            </div>
          </div>

          <!-- Column 2: 10 Consultation Services -->
          <div>
            <h4 class="font-cinzel text-sm font-bold text-amber-400 tracking-wider uppercase mb-4">
              Consultation Services
            </h4>
            <ul class="space-y-2 text-sm text-emerald-200/80">
              <li><a routerLink="/services" class="hover:text-amber-300 transition-colors">Date of Birth Numerology</a></li>
              <li><a routerLink="/services" class="hover:text-amber-300 transition-colors">Lo Shu Grid Numerology</a></li>
              <li><a routerLink="/services" class="hover:text-amber-300 transition-colors">Mobile Number Numerology</a></li>
              <li><a routerLink="/services" class="hover:text-amber-300 transition-colors">Name Numerology</a></li>
              <li><a routerLink="/services" class="hover:text-amber-300 transition-colors">Wristwatch Numerology</a></li>
              <li><a routerLink="/services" class="hover:text-amber-300 transition-colors">Signature Numerology</a></li>
              <li><a routerLink="/services" class="hover:text-amber-300 transition-colors">Health Numerology</a></li>
              <li><a routerLink="/services" class="hover:text-amber-300 transition-colors">Vedic Numerology</a></li>
              <li><a routerLink="/services" class="hover:text-amber-300 transition-colors">Yantra Vidya</a></li>
              <li><a routerLink="/software" class="hover:text-amber-300 transition-colors">Numerology Software</a></li>
            </ul>
          </div>

          <!-- Column 3: Academy & Tools -->
          <div>
            <h4 class="font-cinzel text-sm font-bold text-amber-400 tracking-wider uppercase mb-4">
              LMS & Interactive Tools
            </h4>
            <ul class="space-y-2 text-sm text-emerald-200/80">
              <li><a routerLink="/courses" class="hover:text-amber-300 transition-colors">Course Marketplace</a></li>
              <li><a routerLink="/lms" class="hover:text-amber-300 transition-colors">Student Learning Portal</a></li>
              <li><a routerLink="/calculators" class="hover:text-amber-300 transition-colors">Birth & Destiny Calculator</a></li>
              <li><a routerLink="/calculators" class="hover:text-amber-300 transition-colors">Lo Shu 3x3 Magic Square</a></li>
              <li><a routerLink="/calculators" class="hover:text-amber-300 transition-colors">Chaldean Name Calculator</a></li>
              <li><a routerLink="/calculators" class="hover:text-amber-300 transition-colors">Mobile Numerology Analyzer</a></li>
              <li><a routerLink="/reports" class="hover:text-amber-300 transition-colors">Printable Numerology Reports</a></li>
              <li><a routerLink="/appointments" class="hover:text-amber-300 transition-colors">Schedule Consultation</a></li>
            </ul>
          </div>

          <!-- Column 4: Institute Headquarters & Contact -->
          <div>
            <h4 class="font-cinzel text-sm font-bold text-amber-400 tracking-wider uppercase mb-4">
              Institute Office
            </h4>
            <div class="space-y-3 text-sm text-emerald-200/80">
              <p class="flex items-start gap-2">
                <mat-icon class="!w-4 !h-4 !text-[18px] text-amber-400 shrink-0 mt-0.5">location_on</mat-icon>
                <span>{{ dataService.settings().officeAddress }}</span>
              </p>
              <p class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[18px] text-amber-400 shrink-0">call</mat-icon>
                <a [href]="'tel:' + dataService.settings().contactNumber" class="hover:text-amber-300">
                  {{ dataService.settings().contactNumber }}
                </a>
              </p>
              <p class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[18px] text-amber-400 shrink-0">mail</mat-icon>
                <a [href]="'mailto:' + dataService.settings().emailAddress" class="hover:text-amber-300">
                  {{ dataService.settings().emailAddress }}
                </a>
              </p>
              <p class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[18px] text-amber-400 shrink-0">schedule</mat-icon>
                <span>Mon – Sat: 10:00 AM – 7:30 PM</span>
              </p>
              <div class="pt-2">
                <a
                  routerLink="/appointments"
                  class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase text-stone-900 bg-amber-400 hover:bg-amber-300 rounded transition-colors">
                  <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">event</mat-icon>
                  Consult Guruji
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Ethical & Traditional Knowledge Disclaimer (Module 7 & 17) -->
        <div class="pt-8 border-t border-emerald-900/80 text-xs text-emerald-400/80 space-y-2">
          <p>
            <strong>Official Institute Disclaimer:</strong> All numerological readings, Lo Shu grid assessments, and occult consultations offered by <em>GYAN JYOTHI SCHOOL OF OCCULT SCIENCE</em> are grounded in traditional philosophical systems and historical symbolic wisdom. Health numerology is non-clinical and strictly advisory. Always consult registered medical healthcare professionals for physical, psychological, or clinical diagnoses.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 text-emerald-400/60 text-[11px]">
            <span>
              &copy; 2026 GYAN JYOTHI SCHOOL OF OCCULT SCIENCE. All Rights Reserved.
            </span>
            <div class="flex items-center gap-4">
              <span>Confidentiality Protected</span>
              <span>·</span>
              <span>Razorpay Verified Gateway</span>
              <span>·</span>
              <a routerLink="/admin" class="hover:text-amber-400 transition-colors">Admin Portal</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class AppFooter {
  public readonly dataService = inject(DataService);
}
