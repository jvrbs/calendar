import { Routes } from '@angular/router';
import { Calendar } from './components/calendar/calendar'; // era CalendarComponent

export const routes: Routes = [
  { path: '', component: Calendar },
  { path: '**', redirectTo: '' }
];