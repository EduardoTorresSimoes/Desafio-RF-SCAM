import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:3000/empregados';

export interface Empregado {
  id?: number;
  nome: string;
  email: string;
  cargo: string;
  departamento_id: number;
  departamento_nome?: string;
}

@Injectable({ providedIn: 'root' })
export class EmpregadoService {
  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<Empregado[]>(API); }
  getById(id: number) { return this.http.get<Empregado>(`${API}/${id}`); }
  create(e: Empregado) { return this.http.post<Empregado>(API, e); }
  update(id: number, e: Empregado) { return this.http.put<Empregado>(`${API}/${id}`, e); }
  delete(id: number) { return this.http.delete<void>(`${API}/${id}`); }
}
