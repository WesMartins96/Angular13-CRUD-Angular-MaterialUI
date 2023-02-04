import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  tempoSnackBar = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  qualidadeProdLista = ["Novo", "Usado", "Restaurado"];
  produtoForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private api : ApiService,
    private snackBar : MatSnackBar) { }

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
    if (this.produtoForm.valid) {
      this.api.postProduto(this.produtoForm.value).subscribe({
        next:(res) => {
          this.snackBar.open('Produto adicionado com Sucesso!', '',{
            duration: this.tempoSnackBar * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        },
        error:() => {
          this.snackBar.open('Erro ao adicionar o produto!', '',{
            duration: this.tempoSnackBar * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        }
      })
    }

  }

}
