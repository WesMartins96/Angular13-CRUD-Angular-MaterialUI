import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  qualidadeProdLista = ["Novo", "Usado", "Restaurado"];
  produtoForm !: FormGroup;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group({
      produtoNome : ['', Validators.required],
      categoria : ['', Validators.required],
      qualidade : ['', Validators.required],
      preco : ['', Validators.required],
      descricao : ['', Validators.required],
      data : ['', Validators.required]
    })
  }
  adicionarProduto(){
    console.log(this.produtoForm.value);

  }

}
