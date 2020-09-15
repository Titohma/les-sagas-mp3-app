import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SagaService } from 'src/app/services/sagas/saga.service';
import { forkJoin } from 'rxjs';
import { CategoryService } from 'src/app/services/categories/category.service';
import { Category } from 'src/app/entities/category';
import { Saga } from 'src/app/entities/saga';

@Component({
  selector: 'app-list-sagas',
  templateUrl: './list-sagas.page.html',
  styleUrls: ['./list-sagas.page.scss'],
})
export class ListSagasPage implements OnInit {

  public categories: Category[] = [];
  public items: Saga[] = [];
  public isSearchRunning: boolean = false;
  private numPage: number = 0;

  constructor(
    public loadingController: LoadingController,
    private categoryService: CategoryService,
    private sagaService: SagaService) { }

  ngOnInit() {
    this.loadingController.create({
      message: 'Téléchargement...'
    }).then((loading) => {
      loading.present();
      let categoriesRequest = this.categoryService.getAll();
      let authorsRequest = this.sagaService.getPaginated(this.numPage, 20);
      forkJoin([categoriesRequest, authorsRequest]).subscribe(results => {
        this.items = Saga.fromModels(results[1].content);
        this.categories = Category.fromModels(results[0]);
        this.items = this.saveCategories(this.items);
        loading.dismiss();
      });
    });
  }

  search(searchInput) {
    if(searchInput.length > 2) {
      this.isSearchRunning = true;
      this.sagaService.search(searchInput)
        .subscribe(res => {
          this.items = Saga.fromModels(res);
          this.items = this.saveCategories(this.items);
        });
    }
  }

  cancelSearch() {
    this.isSearchRunning = false;
    this.sagaService.getPaginated(this.numPage, 20)
      .subscribe(res => {
        this.items = Saga.fromModels(res.content);
        this.items = this.saveCategories(this.items);
      });
  }

  loadData(event) {
    this.numPage++;
    this.sagaService.getPaginated(this.numPage, 20)
      .subscribe(res => {
        var sagas = Saga.fromModels(res.content);
        sagas = this.saveCategories(sagas);
        sagas.forEach(saga => this.items.push(saga));
        event.target.complete();
        if(this.numPage == res.totalPages) {
          event.target.disabled = true;
        }
      });
  }

  private saveCategories(items: Saga[]) {
    items.forEach(item => {
      item.categories = []
      item.categoriesRef.forEach(categoryRef => {
        item.categories.push(this.categories.find(result => result.id === categoryRef));
      });
    });
    return items;
  }

}
