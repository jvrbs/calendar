import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event';
import { Event } from '../../event.model';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-modal.html',
  styleUrl: './event-modal.css',
})
export class EventModal implements OnChanges {
  @Input() event: Event | null = null;        // null = modo criação
  @Input() selectedDate: Date | null = null;  // data pré-selecionada

  @Output() saved   = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();
  @Output() closed  = new EventEmitter<void>();

  form: Event = this.emptyForm();

  constructor(private eventService: EventService) {}

  // Executado toda vez que os @Inputs mudam (novo modal aberto)
  ngOnChanges(): void {
    if (this.event) {
      this.form = { ...this.event }; // copia o evento para edição
    } else {
      this.form = this.emptyForm();
      if (this.selectedDate) {
        // Pré-preenche a data clicada no formato do input datetime-local
        const str = this.toDateTimeLocal(this.selectedDate);
        this.form.startDateTime = str;
        this.form.endDateTime   = str;
      }
    }
  }

  isEditing(): boolean { return !!this.event?.id; }

  save(): void {
    if (this.isEditing()) {
      this.eventService.update(this.event!.id!, this.form).subscribe({
        next: () => this.saved.emit(),
        error: (e) => console.error('Erro ao atualizar', e)
      });
    } else {
      this.eventService.save(this.form).subscribe({
        next: () => this.saved.emit(),
        error: (e) => console.error('Erro ao criar', e)
      });
    }
  }

  delete(): void {
    if (this.event?.id) {
      this.eventService.delete(this.event.id).subscribe({
        next: () => this.deleted.emit(),
        error: (e) => console.error('Erro ao deletar', e)
      });
    }
  }

  close(): void { this.closed.emit(); }

  private emptyForm(): Event {
    return { title: '', description: '', startDateTime: '', endDateTime: '', color: '#4285f4' };
  }

  // Converte Date → string compatível com <input type="datetime-local">
  private toDateTimeLocal(date: Date): string {
    const p = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${p(date.getMonth()+1)}-${p(date.getDate())}T08:00`;
  }
}