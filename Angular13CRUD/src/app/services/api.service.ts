import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  //adicionar
  postProduto(data : any){
    return this.http.post<any>("http://localhost:3000/produtoLista/", data);
  }

  //ler
  getProduto(){
    return this.http.get<any>("http://localhost:3000/produtoLista/");
  }

  //atualizar
  putProduto(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/produtoLista/" + id, data);
  }

  //deletar
  deletarProduto(id : number){
    return this.http.delete<any>("http://localhost:3000/produtoLista/" + id);
  }
}
