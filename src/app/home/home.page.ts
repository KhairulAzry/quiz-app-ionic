import { Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonContent, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonInput, IonText, IonSelect, IonSelectOption, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonButton, IonButtons, IonSpinner, IonIcon, IonHeader, IonToolbar, IonTitle, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardCircleOutline, cog } from 'ionicons/icons';
import { QuizService } from '../services/quiz/quiz.service';
import { Category } from '../interfaces/category.interface';
import { CategoryService } from '../services/category/category.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonCard, 
    IonCardContent,
    IonCardSubtitle, 
    IonCardTitle, 
    IonContent, 
    IonDatetime,
    IonDatetimeButton,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class HomePage {

  form = signal<FormGroup | null>(null);
  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(false);

  masterSettings = computed(() => this.quizService.masterSettings)

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private quizService = inject(QuizService);
  private categoryService = inject(CategoryService);

  constructor() {
    addIcons({
      arrowForwardCircleOutline,
      cog,
    });
    this.initForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  initForm() {
    const form = this.formBuilder.group({
      question_count: [null, [Validators.required, Validators.min(1), this.maxQuestionCountValidator(
        this.masterSettings().questionsMaxLimit
      ),],],
      category_id: [null, [Validators.required]],
      duration: [this.toIsoDateTime(), [Validators.required, this.durationValidator()]],
    });

    this.form.set(form);
  }

  private maxQuestionCountValidator(max: number){
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value !== null && control.value > max 
        ? { maxLimit: `Cannot exceed ${max} questions`} 
        : null;
    };
  }

  private durationValidator(): ValidatorFn {
    return(control: AbstractControl): ValidationErrors | null => {
    return this.parseDuration(control.value) === 0 
      ? { invalidDuration: 'Duration cannot be 00:00'} 
      : null;
    }
  }

  private parseDuration(duration: string): number {
    if (!duration || !duration.includes('T')) return 0; // Handle invalid inputs

    const timePart = duration.split('T')[1]; // Extract HH:mm:ss part
    if (!timePart) return 0;

    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    return (
      (hours || 0) * 3600 * 1000 +
      (minutes || 0) * 60 * 1000 +
      (seconds || 0) * 1000
    );
  }

  getCategories(){
    const data: Category[] = this.categoryService.getCategories();
    this.categories.set(data);
  }

  // Assuming defaultTiming is a string in 'HH:mm' format
  getDateFromTime(defaultTiming: string): Date {
    // Split the string into hours and minutes
    const [hours, minutes] = defaultTiming.split(':').map(Number);

    // Create a new Date object with the parsed hours and minutes
    return new Date(1970, 0, 1, hours, minutes);
  }

  toIsoDateTime(): string{
    // Setting the time directly to 00:30
    const defaultTiming = this.masterSettings().defaultTiming; // '00:30'

    const date = this.getDateFromTime(defaultTiming);

    const year = date.getFullYear();
    const month = (date.getMonth() +1).toString().padStart(2, '0');
    const dateOfMonth = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    // Return fix ISO formatted string for 00:30
    return `${year}-${month}-${dateOfMonth}T${hour}:${minute}:00`;
  }

  setLoader(value: boolean){
    this.isLoading.set(value);
  }

  onSubmit() {
    if(this.form()?.invalid){
      this.form()!.markAllAsTouched();
      return;
    }

    const formValue = this.form()!.value;

    console.log(formValue);

    try {
      this.setLoader(true);
      this.quizService.fetchQuestions(formValue);
      this.router.navigate(['/', 'home', 'quiz']);
    } catch(e) {
      console.log(e);
      this.setLoader(false);
    } finally {
      this.setLoader(false);
    }
  }
}
