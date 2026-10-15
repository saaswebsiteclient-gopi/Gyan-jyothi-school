import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CalculatorService, MulankInfo, LoShuAnalysis } from '../../services/calculator.service';

@Component({
  selector: 'app-calculators',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './calculators.html'
})
export class CalculatorsPage {
  public readonly calcService = inject(CalculatorService);

  public readonly activeTab = signal<'dob' | 'loshu' | 'name' | 'mobile'>('dob');

  // Tab 1: DOB Inputs
  public readonly dobInput = signal<string>('1992-06-15');
  public readonly birthNumber = signal<number>(6);
  public readonly destinyNumber = signal<number>(6);
  public readonly mulankDetails = signal<MulankInfo>(this.calcService.getMulankInfo(6));
  public readonly bhagyankDetails = signal<MulankInfo>(this.calcService.getMulankInfo(6));

  // Tab 2: Lo Shu Grid Inputs
  public readonly loshuDob = signal<string>('1992-06-15');
  public readonly loshuAnalysis = signal<LoShuAnalysis>(this.calcService.generateLoShuGrid('1992-06-15'));

  // Tab 3: Name Numerology Inputs
  public readonly nameInput = signal<string>('Ramesh Chandra');
  public readonly chaldeanResult = signal(this.calcService.calculateChaldeanNameNumber('Ramesh Chandra'));

  // Tab 4: Mobile Numerology Inputs
  public readonly mobileInput = signal<string>('9845012890');
  public readonly mobileResult = signal(this.calcService.analyzeMobileNumber('9845012890', 6));

  public calculateDob(): void {
    if (!this.dobInput()) return;
    const bNum = this.calcService.calculateBirthNumber(this.dobInput());
    const dNum = this.calcService.calculateDestinyNumber(this.dobInput());
    this.birthNumber.set(bNum);
    this.destinyNumber.set(dNum);
    this.mulankDetails.set(this.calcService.getMulankInfo(bNum));
    this.bhagyankDetails.set(this.calcService.getMulankInfo(dNum));
  }

  public calculateLoShu(): void {
    if (!this.loshuDob()) return;
    const analysis = this.calcService.generateLoShuGrid(this.loshuDob());
    this.loshuAnalysis.set(analysis);
  }

  public calculateName(): void {
    if (!this.nameInput()) return;
    const res = this.calcService.calculateChaldeanNameNumber(this.nameInput());
    this.chaldeanResult.set(res);
  }

  public calculateMobile(): void {
    if (!this.mobileInput()) return;
    const res = this.calcService.analyzeMobileNumber(this.mobileInput(), this.birthNumber());
    this.mobileResult.set(res);
  }
}
