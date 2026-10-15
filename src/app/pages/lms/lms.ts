import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { CourseItem, CourseLesson } from '../../models/occult.models';

@Component({
  selector: 'app-lms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './lms.html'
})
export class LmsPage {
  public readonly dataService = inject(DataService);

  // Active view: 'dashboard' | 'classroom' | 'certificate'
  public readonly activeView = signal<'dashboard' | 'classroom' | 'certificate'>('dashboard');

  public readonly activeCourse = signal<CourseItem>(this.dataService.courses()[0]);
  public readonly activeLesson = signal<CourseLesson>(this.dataService.courses()[0].lessons[0]);

  // Quiz State
  public readonly userQuizAnswers = signal<Record<string, number>>({});
  public readonly quizScore = signal<{ total: number; correct: number; passed: boolean } | null>(null);

  // Video playback mock state
  public readonly isPlaying = signal<boolean>(false);
  public readonly videoPlaybackSpeed = signal<number>(1.0);

  public openCourse(course: CourseItem): void {
    this.activeCourse.set(course);
    if (course.lessons && course.lessons.length > 0) {
      this.activeLesson.set(course.lessons[0]);
    }
    this.userQuizAnswers.set({});
    this.quizScore.set(null);
    this.activeView.set('classroom');
  }

  public selectLesson(lesson: CourseLesson): void {
    this.activeLesson.set(lesson);
    this.isPlaying.set(false);
  }

  public markLessonDone(): void {
    const course = this.activeCourse();
    const lesson = this.activeLesson();
    if (course && lesson) {
      this.dataService.markLessonComplete(course.id, lesson.id);
      // update activeCourse reference
      const updated = this.dataService.courses().find(c => c.id === course.id);
      if (updated) {
        this.activeCourse.set(updated);
        const nextLesson = updated.lessons.find(l => !l.isCompleted);
        if (nextLesson) this.activeLesson.set(nextLesson);
      }
    }
  }

  public setAnswer(questionId: string, optionIdx: number): void {
    this.userQuizAnswers.update(curr => ({
      ...curr,
      [questionId]: optionIdx
    }));
  }

  public submitQuiz(): void {
    const course = this.activeCourse();
    const answers = this.userQuizAnswers();
    let correct = 0;
    course.quizzes.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const total = course.quizzes.length;
    const passed = correct >= Math.ceil(total * 0.7);

    this.quizScore.set({ total, correct, passed });

    if (passed && !course.certificateIssued) {
      this.dataService.courses.update(list =>
        list.map(c => c.id === course.id ? { ...c, certificateIssued: true, certificateDate: new Date().toLocaleDateString('en-GB') } : c)
      );
      const updated = this.dataService.courses().find(c => c.id === course.id);
      if (updated) this.activeCourse.set(updated);
    }
  }

  public viewCertificate(course: CourseItem): void {
    this.activeCourse.set(course);
    this.activeView.set('certificate');
  }

  public printCertificate(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }
}
