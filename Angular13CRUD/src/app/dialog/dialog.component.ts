import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  tempoSnackBar = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  qualidadeProdLista = ["Novo", "Usado", "Restaurado"];
  produtoForm !: FormGroup;

  actionBtn : string = "Salvar";

  constructor(
    private formBuilder : FormBuilder,
    private api : ApiService,
    private snackBar : MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editarData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group({
      produtoNome : ['', Validators.required],
      categoria : ['', Validators.required],
      qualidade : ['', Validators.required],
      preco : ['', Validators.required],
      descricao : ['', Validators.required],
      data : ['', Validators.required]
    });

    if (this.editarData) {
      this.actionBtn = "Atualizar";
      this.produtoForm.controls['produtoNome'].setValue(this.editarData.produtoNome);
      this.produtoForm.controls['categoria'].setValue(this.editarData.categoria);
      this.produtoForm.controls['qualidade'].setValue(this.editarData.qualidade);
      this.produtoForm.controls['preco'].setValue(this.editarData.preco);
      this.produtoForm.controls['descricao'].setValue(this.editarData.descricao);
      this.produtoForm.controls['data'].setValue(this.editarData.data);
    }

  }
  adicionarProduto(){
    if (!this.editarData) {
      if (this.produtoForm.valid) {
        this.api.postProduto(this.produtoForm.value).subscribe({
          next:(res) => {
            this.snackBar.open('Produto adicionado com Sucesso!', '',{
              duration: this.tempoSnackBar * 1000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            })
            this.produtoForm.reset();
            this.dialogRef.close('salvar');
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
    }else {
      this.atualizarProduto()
    }
  }

  atualizarProduto(){
    this.api.putProduto(this.produtoForm.value, this.editarData.id).subscribe({
      next:(res) => {
        this.snackBar.open('Produto atualizado com Sucesso!', '',{
          duration: this.tempoSnackBar * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        this.produtoForm.reset();
        this.dialogRef.close('atualizar')
      },
      error:() => {
        this.snackBar.open('Erro ao atualizar o produto!', '',{
          duration: this.tempoSnackBar * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      }
    })
  }

}
