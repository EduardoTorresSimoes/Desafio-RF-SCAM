import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpregadoService, Empregado } from '../services/empregado';
import { DepartamentoService, Departamento } from '../services/departamento';

@Component({
  selector: 'app-empregado',
  imports: [FormsModule],
  templateUrl: './empregado.html',
  styleUrl: './empregado.css'
})
export class EmpregadoComponent implements OnInit {
  lista: Empregado[] = [];
  departamentos: Departamento[] = [];
  form: Empregado = { nome: '', email: '', cargo: '', departamento_id: 0 };
  editandoId: number | null = null;
  mostrarForm = false;
  erro = '';

  constructor(
    private service: EmpregadoService,
    private depService: DepartamentoService
  ) {}

  ngOnInit() {
    this.carregar();
    this.depService.getAll().subscribe(dados => {
      this.departamentos = dados;
    });
  }

  carregar() {
    this.service.getAll().subscribe(dados => {
      this.lista = dados;
    });
  }

  novo() {
    this.form = { nome: '', email: '', cargo: '', departamento_id: 0 };
    this.editandoId = null;
    this.mostrarForm = true;
    this.erro = '';
  }

  editar(emp: Empregado) {
    this.form = { ...emp };
    this.editandoId = emp.id!;
    this.mostrarForm = true;
  }

  salvar() {
    if (!this.form.nome.trim() || !this.form.email.trim() || !this.form.cargo.trim() || !this.form.departamento_id) return;

    this.erro = '';
    if (this.editandoId) {
      this.service.update(this.editandoId, this.form).subscribe({
        next: () => { this.cancelar(); this.carregar(); },
        error: (err) => { this.erro = err.error?.message ?? 'Erro ao salvar'; }
      });
    } else {
      this.service.create(this.form).subscribe({
        next: () => { this.cancelar(); this.carregar(); },
        error: (err) => { this.erro = err.error?.message ?? 'Erro ao salvar'; }
      });
    }
  }

  deletar(id: number) {
    this.service.delete(id).subscribe({
      next: () => this.carregar(),
      error: (err) => alert(err.error?.message ?? 'Erro ao excluir')
    });
  }

  cancelar() {
    this.form = { nome: '', email: '', cargo: '', departamento_id: 0 };
    this.editandoId = null;
    this.mostrarForm = false;
    this.erro = '';
  }
}
