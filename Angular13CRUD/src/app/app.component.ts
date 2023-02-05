import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  tempoSnackBar = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'Angular13CRUD';

  displayedColumns: string[] = ['produtoNome', 'categoria', 'data', 'qualidade', 'preco', 'descricao', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog : MatDialog,
    private api : ApiService,
    private snackBar : MatSnackBar){

  }
  ngOnInit(): void {
    this.getAllProdutos();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value === 'salvar') {
        this.getAllProdutos();
      }
    })
  }

  getAllProdutos(){
    this.api.getProduto().subscribe({
      next:(res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=> {
        this.snackBar.open('Falha ao carregar os produtos', '',{
          duration: this.tempoSnackBar * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      }
    })
  }

  editarProduto(row : any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(value => {
      if (value === 'atualizar') {
        this.getAllProdutos();
      }
    })
  }

  deletarProduto(id : number){
    this.api.deletarProduto(id).subscribe({
      next:(res) => {
        this.snackBar.open('Produto deletado com sucesso!', '',{
          duration: this.tempoSnackBar * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        this.getAllProdutos();
      },
      error:() => {
        this.snackBar.open('Erro ao deletar o produto!', '',{
          duration: this.tempoSnackBar * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
