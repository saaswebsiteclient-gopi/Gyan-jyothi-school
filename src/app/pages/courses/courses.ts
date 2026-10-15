import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { CourseItem } from '../../models/occult.models';

@Component({
  selector: 'app-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './courses.html'
})
export class CoursesPage {
  public readonly dataService = inject(DataService);

  public readonly selectedCourse = signal<CourseItem>(this.dataService.courses()[0]);
  public readonly showEnrollModal = signal<boolean>(false);
  public readonly enrollingCourse = signal<CourseItem | null>(null);
  public readonly enrollSuccess = signal<string>('');

  public selectCourse(course: CourseItem): void {
    this.selectedCourse.set(course);
  }

  public openEnrollModal(course: CourseItem): void {
    this.enrollingCourse.set(course);
    this.showEnrollModal.set(true);
    this.enrollSuccess.set('');
  }

  public closeEnrollModal(): void {
    this.showEnrollModal.set(false);
    this.enrollingCourse.set(null);
  }

  public completeEnrollment(method: 'Razorpay UPI' | 'Razorpay Card' | 'Razorpay NetBanking'): void {
    const course = this.enrollingCourse();
    if (!course) return;

    const res = this.dataService.enrollInCourse(course.id, method);
    if (res.success) {
      this.enrollSuccess.set(res.message);
      // Refresh current selected course
      const updated = this.dataService.courses().find(c => c.id === course.id);
      if (updated) this.selectedCourse.set(updated);
      setTimeout(() => {
        this.closeEnrollModal();
      }, 1800);
    }
  }

  public onCoursePriceEdit(courseId: string, newPrice: number): void {
    if (newPrice && newPrice > 0) {
      this.dataService.updateCoursePrice(courseId, Number(newPrice));
    }
  }
}
