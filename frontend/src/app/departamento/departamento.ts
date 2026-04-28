import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartamentoService, Departamento } from '../services/departamento';

@Component({
  selector: 'app-departamento',
  imports: [FormsModule],
  templateUrl: './departamento.html',
  styleUrl: './departamento.css'
})
export class DepartamentoComponent implements OnInit {
  lista: Departamento[] = [];
  form: Departamento = { nome: '' };
  editandoId: number | null = null;
  mostrarForm = false;

  constructor(private service: DepartamentoService) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.getAll().subscribe(dados => {
      this.lista = dados;
    });
  }

  novo() {
    this.form = { nome: '' };
    this.editandoId = null;
    this.mostrarForm = true;
  }

  editar(dep: Departamento) {
    this.form = { ...dep };
    this.editandoId = dep.id!;
    this.mostrarForm = true;
  }

  salvar() {
    if (!this.form.nome.trim()) return;

    if (this.editandoId) {
      this.service.update(this.editandoId, this.form).subscribe(() => {
        this.cancelar();
        this.carregar();
      });
    } else {
      this.service.create(this.form).subscribe(() => {
        this.cancelar();
        this.carregar();
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
    this.form = { nome: '' };
    this.editandoId = null;
    this.mostrarForm = false;
  }
}
