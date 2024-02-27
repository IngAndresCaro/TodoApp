import { Task } from './../models/tasks';

import {
  Component,
  computed,
  signal,
  effect,
  OnInit,
  inject,
  Injector,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  tasks = signal<Task[]>([]);

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

  injector = inject(Injector);

  constructor() {}

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(
      () => {
        const tasks = this.tasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
      },
      { injector: this.injector }
    );
  }

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
