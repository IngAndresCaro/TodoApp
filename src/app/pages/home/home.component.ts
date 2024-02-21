import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal([
    'Instalar el angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicios',
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTasks = input.value;
    this.tasks.update((tasks) => [...tasks, newTasks]);
    input.value = '';
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }
}
