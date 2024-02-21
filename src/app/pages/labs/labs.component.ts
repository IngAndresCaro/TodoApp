import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'Bienvenido';

  tasks = ['Instalar el angular CLI', 'Crear proyecto', 'Crear componentes'];

  name = 'Andres';
  age = '32';

  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png'
  person = {
    name: 'Amdres',
    age: '32',
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  }

  clickHandler(){
    alert('Papitas')
  }

  changeHandler(event: Event){
    console.log(event)
  }

}
