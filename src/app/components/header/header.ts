import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <!-- Top Utility Bar: Institute Contact & Active Role Switcher -->
    <div class="bg-emerald-950 text-emerald-100 text-xs border-b border-emerald-900/60 no-print">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-4 text-[13px]">
          <span class="flex items-center gap-1.5 text-amber-300 font-medium">
            <mat-icon class="!w-4 !h-4 !text-[16px] leading-none">call</mat-icon>
            {{ dataService.settings().contactNumber }}
          </span>
          <span class="hidden md:inline-block text-emerald-600">|</span>
          <span class="hidden md:flex items-center gap-1.5 text-emerald-200">
            <mat-icon class="!w-4 !h-4 !text-[16px] leading-none">mail</mat-icon>
            {{ dataService.settings().emailAddress }}
          </span>
        </div>

        <!-- Role Mode Switcher (Guest / Student / Admin) -->
        <div class="flex items-center gap-2">
          <span class="text-emerald-400 font-mono text-[11px] uppercase tracking-wider hidden sm:inline">Role View:</span>
          <div class="flex items-center bg-emerald-900/80 rounded border border-emerald-700/50 p-0.5 text-xs">
            <button
              (click)="setRole('guest')"
              [class]="dataService.currentRole() === 'guest' ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs' : 'text-emerald-200 hover:text-white'"
              class="px-2 py-0.5 rounded transition-all cursor-pointer">
              Visitor
            </button>
            <button
              (click)="setRole('student')"
              [class]="dataService.currentRole() === 'student' ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs' : 'text-emerald-200 hover:text-white'"
              class="px-2 py-0.5 rounded transition-all cursor-pointer">
              Student
            </button>
            <button
              (click)="setRole('admin')"
              [class]="dataService.currentRole() === 'admin' ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs' : 'text-emerald-200 hover:text-white'"
              class="px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1">
              <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">shield</mat-icon>
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar conforming to the Top Bar Contract -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs no-print">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        <!-- Zone 1: Single Brand Wordmark Element -->
        <a routerLink="/" class="flex items-center gap-3 shrink-0 group">
          <div class="w-10 h-10 rounded-lg bg-emerald-900 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xs shrink-0 group-hover:border-amber-400 transition-colors">
            <mat-icon class="!w-6 !h-6 !text-[24px]">explore</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="font-cinzel text-base sm:text-lg lg:text-xl font-bold tracking-tight text-emerald-950 whitespace-nowrap shrink-0 group-hover:text-emerald-800 transition-colors">
              GYAN JYOTHI SCHOOL OF OCCULT SCIENCE
            </span>
          </div>
        </a>

        <!-- Zone 2: 4-5 Clean Nav Links (single-line, whitespace-nowrap) -->
        <nav class="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          <a routerLink="/services" routerLinkActive="text-emerald-900 font-semibold" class="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Services
          </a>
          <a routerLink="/courses" routerLinkActive="text-emerald-900 font-semibold" class="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Courses
          </a>
          <a routerLink="/lms" routerLinkActive="text-emerald-900 font-semibold" class="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Student LMS
          </a>
          <a routerLink="/calculators" routerLinkActive="text-emerald-900 font-semibold" class="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Calculators
          </a>
          <a routerLink="/software" routerLinkActive="text-emerald-900 font-semibold" class="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Software
          </a>
          <a routerLink="/admin" routerLinkActive="text-emerald-900 font-semibold" class="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-amber-700">
            <mat-icon class="!w-4 !h-4 !text-[16px]">admin_panel_settings</mat-icon>
            Admin Panel
          </a>
        </nav>

        <!-- Zone 3: 1 Primary Action -->
        <div class="hidden sm:flex items-center gap-3 shrink-0">
          <a
            routerLink="/appointments"
            class="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md shadow-xs transition-all flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95">
            <mat-icon class="!w-4 !h-4 !text-[18px]">calendar_today</mat-icon>
            Book Appointment
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center gap-2 lg:hidden">
          <a
            routerLink="/appointments"
            class="px-3 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 rounded-md sm:hidden">
            Book
          </a>
          <button
            (click)="toggleMobileMenu()"
            type="button"
            class="p-2 text-stone-700 hover:text-emerald-900 rounded-md focus:outline-hidden"
            aria-label="Toggle Navigation">
            <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Navigation -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-5 space-y-2">
          <a (click)="closeMobileMenu()" routerLink="/services" class="block py-2 text-stone-800 font-medium hover:text-emerald-900 border-b border-stone-200/60">
            Services (10 Categories)
          </a>
          <a (click)="closeMobileMenu()" routerLink="/courses" class="block py-2 text-stone-800 font-medium hover:text-emerald-900 border-b border-stone-200/60">
            Courses Marketplace
          </a>
          <a (click)="closeMobileMenu()" routerLink="/lms" class="block py-2 text-stone-800 font-medium hover:text-emerald-900 border-b border-stone-200/60">
            Student LMS & Portal
          </a>
          <a (click)="closeMobileMenu()" routerLink="/calculators" class="block py-2 text-stone-800 font-medium hover:text-emerald-900 border-b border-stone-200/60">
            Numerology Calculators
          </a>
          <a (click)="closeMobileMenu()" routerLink="/reports" class="block py-2 text-stone-800 font-medium hover:text-emerald-900 border-b border-stone-200/60">
            PDF Numerology Reports
          </a>
          <a (click)="closeMobileMenu()" routerLink="/software" class="block py-2 text-stone-800 font-medium hover:text-emerald-900 border-b border-stone-200/60">
            Numerology Software
          </a>
          <a (click)="closeMobileMenu()" routerLink="/crm" class="block py-2 text-stone-800 font-medium hover:text-emerald-900 border-b border-stone-200/60">
            Customer CRM
          </a>
          <a (click)="closeMobileMenu()" routerLink="/admin" class="block py-2 text-amber-800 font-semibold hover:text-amber-900 border-b border-stone-200/60 flex items-center gap-2">
            <mat-icon class="!w-4 !h-4 !text-[16px]">shield</mat-icon>
            Admin Control Center
          </a>
          <div class="pt-2">
            <a
              (click)="closeMobileMenu()"
              routerLink="/appointments"
              class="w-full py-2.5 px-4 text-center block text-sm font-semibold uppercase text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md">
              Book Appointment Now
            </a>
          </div>
        </div>
      }
    </header>
  `
})
export class AppHeader {
  public readonly dataService = inject(DataService);
  public readonly mobileMenuOpen = signal<boolean>(false);

  public toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  public closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  public setRole(role: 'guest' | 'student' | 'admin'): void {
    this.dataService.currentRole.set(role);
  }
}
