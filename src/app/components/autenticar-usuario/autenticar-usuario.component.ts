import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  //criando a estrutura do formulário
  form = new FormGroup({
    /* campo 'email' */
    email: new FormControl('', [Validators.required,
    Validators.email]),
    /* campo 'senha' */
    senha: new FormControl('', [Validators.required,
    Validators.minLength(8)])
  });
  //função para verificar os erros de validação de cada campo
  get f() {
    return this.form.controls;
  }
  //função para capturar o evento de submit do formulário
  onSubmit() {
    console.log(this.form.value);
  }

}
