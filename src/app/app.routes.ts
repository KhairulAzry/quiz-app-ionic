import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'quiz',
        loadComponent: () => import('./home/quiz/quiz.page').then( m => m.QuizPage)
      },
      {
        path: 'settings',
        loadComponent: () => import('./home/settings/settings.page').then( m => m.SettingsPage)
      },
    ],
  },
];
