import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  // Atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  // Criando o formulário para cadastro de usuário
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
  });

  // Função para retornar o estado de cada campo e então exibir uma mensagem de erro de validação
  get f() {
    return this.form.controls;
  }

  // Função para submeter o formulário
  onSubmit() {

    // Limpar as mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.httpClient.post(environment.apiUsuarios + '/api/usuarios/criar', this.form.value)
      .subscribe({ //Capturando o retorno da requisição
        next: (data: any) => { // Recebendo o retorno de sucesso
          this.mensagemSucesso = `Parabéns, ${data.nome}, seu cadastro foi realizado com sucesso!`;
          this.form.reset(); // Limpar o formulário

        },
        error: (e) => { // Recebendo o retorno de erro
          this.mensagemErro = e.error[0];
        }
      });
  }
}
