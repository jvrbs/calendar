import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event';
import { Event } from '../../event.model';
import { EventModal } from '../event-modal/event-modal';




@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, EventModal],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth(); // 0 = janeiro

  days: (Date | null)[] = []; // o dia pode ser uma data ou um 'null', para formatar a 'tabela' visual de um calendário aonde um mês pode começar em uma quinta-feira, então, domingo, segunda e quarta são nulos.

  events: Event[] = []

  showModal = false;
  selectedDate: Date | null = null;
  selectedEvent: Event | null = null;

  monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  weekDays = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

  constructor(private eventService: EventService){}

  ngOnInit(): void {
    this.buildCalendar(); //'this.' chama a classe calendar
    this.loadEvents();
  }

  buildCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    this.days = [];

    for(let i = 0; i < firstDay.getDay(); i++ ){this.days.push(null)};

    for(let d = 1; d <= lastDay.getDate(); d++){
      this.days.push(new Date(this.currentYear, this.currentMonth, d));
    }
  }

  loadEvents(): void{
    this.eventService.findAll().subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error('Erro ao carregar eventos', err)
    });
  }

  getEventsForDay(day: Date): Event[]{
    return this.events.filter(e=> {
      const d = new Date(e.startDateTime);
      return d.getFullYear() === day.getFullYear() &&
             d.getMonth() === day.getMonth() &&
             d.getDate() === day.getDate();
    });
  }

  isToday(day: Date): boolean{
    const t = new Date();
    return day.getFullYear() === t.getFullYear() &&
           day.getMonth() === t.getMonth() &&
           day.getDate() === t.getDate();
  }

  prevMonth(): void{
    if(this.currentMonth == 0) {this.currentMonth = 11; this.currentYear -- }
    else this.currentMonth --;
    this.buildCalendar();
  }

  nextMonth(): void{
    if(this.currentMonth == 11) {this.currentMonth = 0; this.currentYear ++}
    else this.currentMonth ++;
    this.buildCalendar();
  }

  openCreate(day: Date): void{

    this.selectedDate = day;
    this.selectedEvent = null;
    this.showModal = true;

  }

  openEdit(event: Event, $e: MouseEvent): void{
    $e.stopPropagation();
    this.selectedEvent =event;
    this.selectedDate = null;
    this.showModal = true;
  }

  closeModal(): void{
    this.showModal = false;
    this.selectedEvent = null;
    this.selectedDate = null;
  }

  onSaved(): void{
    this.loadEvents();
    this.closeModal();
  }

  onDeleted(): void{
    this.loadEvents();
    this.closeModal();
  }


  
}
