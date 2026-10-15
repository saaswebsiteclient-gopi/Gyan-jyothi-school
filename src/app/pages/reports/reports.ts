import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { CalculatorService, MulankInfo, LoShuAnalysis } from '../../services/calculator.service';

@Component({
  selector: 'app-reports',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatIconModule],
  templateUrl: './reports.html'
})
export class ReportsPage {
  public readonly dataService = inject(DataService);
  public readonly calcService = inject(CalculatorService);

  public readonly reportCategory = signal<'dob' | 'loshu' | 'name' | 'mobile'>('dob');

  // Customer form details
  public readonly customerName = signal<string>('Priya Kulkarni');
  public readonly customerDob = signal<string>('1992-06-15');
  public readonly customerMobile = signal<string>('9823456789');
  public readonly reportDate = signal<string>(new Date().toLocaleDateString('en-GB'));

  // Generated Report Data
  public readonly birthNumber = signal<number>(6);
  public readonly destinyNumber = signal<number>(6);
  public readonly mulankInfo = signal<MulankInfo>(this.calcService.getMulankInfo(6));
  public readonly bhagyankInfo = signal<MulankInfo>(this.calcService.getMulankInfo(6));
  public readonly loShuAnalysis = signal<LoShuAnalysis>(this.calcService.generateLoShuGrid('1992-06-15'));
  public readonly nameAnalysis = signal(this.calcService.calculateChaldeanNameNumber('Priya Kulkarni'));
  public readonly mobileAnalysis = signal(this.calcService.analyzeMobileNumber('9823456789', 6));

  public generateReport(): void {
    const dob = this.customerDob();
    const name = this.customerName();
    const mob = this.customerMobile();

    const b = this.calcService.calculateBirthNumber(dob);
    const d = this.calcService.calculateDestinyNumber(dob);
    this.birthNumber.set(b);
    this.destinyNumber.set(d);
    this.mulankInfo.set(this.calcService.getMulankInfo(b));
    this.bhagyankInfo.set(this.calcService.getMulankInfo(d));

    this.loShuAnalysis.set(this.calcService.generateLoShuGrid(dob));
    this.nameAnalysis.set(this.calcService.calculateChaldeanNameNumber(name));
    this.mobileAnalysis.set(this.calcService.analyzeMobileNumber(mob, b));
  }

  public printReport(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }
}
