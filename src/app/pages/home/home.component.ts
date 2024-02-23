import { Task } from './../models/tasks';
import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Instalar el angular CLI',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear servicios',
      completed: false,
    },
  ]);

  filter = signal<'all' | 'pending' | 'completed'>('all');

  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter == 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter == 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });

  newTaskCrtl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ],
  });

  constructor() {}

  changeHandler() {
    if (this.newTaskCrtl.valid && this.newTaskCrtl.value !== '') {
      const value = this.newTaskCrtl.value.trim();
      this.addTask(value);
      this.newTaskCrtl.setValue('');
    }
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }

  updateTask(index: number) {
    this.tasks.update((task) =>
      task.map((task, position) => {
        if (position === index)
          return {
            ...task,
            completed: !task.completed,
          };
        return task;
      })
    );
  }

  updateTaskEditingMode(index: number) {
    if (this.tasks()[index].completed) return;
    this.tasks.update((task) =>
      task.map((task, position) => {
        if (position === index)
          return {
            ...task,
            editing: true,
          };
        return {
          ...task,
          editing: false,
        };
      })
    );
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((task) =>
      task.map((task, position) => {
        if (position === index)
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        return task;
      })
    );
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
