import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'Bienvenido';

  tasks = [
    'Instalar el angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicios',
  ];
  tasksSignal = signal([
    'Instalar el angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicios',
  ]);

  name = 'Andres';
  nameSignal = signal('Andres');
  age = '32';

  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = {
    name: 'Andres',
    age: '32',
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  };
  personSignal = signal({
    name: 'Andres',
    age: 5,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  });

  clickHandler() {
    alert('Papitas');
  }

  changeHandler(event: Event) {
    console.log(event);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeHandlerSignal(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.nameSignal.set(newValue);
    console.log(event);
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.personSignal.update((prevState) => {
      return { ...prevState, age: parseInt(newValue, 10) };
    });
  }
}
