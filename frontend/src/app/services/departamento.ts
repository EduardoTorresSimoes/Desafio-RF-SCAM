import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:3000/departamentos';

export interface Departamento {
  id?: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class DepartamentoService {
  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<Departamento[]>(API); }
  getById(id: number) { return this.http.get<Departamento>(`${API}/${id}`); }
  create(d: Departamento) { return this.http.post<Departamento>(API, d); }
  update(id: number, d: Departamento) { return this.http.put<Departamento>(`${API}/${id}`, d); }
  delete(id: number) { return this.http.delete<void>(`${API}/${id}`); }
}
