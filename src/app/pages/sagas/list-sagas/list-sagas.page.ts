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
      let authorsRequest = this.sagaService.getAll();
      forkJoin([categoriesRequest, authorsRequest]).subscribe(results => {
        this.items = Saga.fromModels(results[1]);
        this.categories = Category.fromModels(results[0]);
        this.saveCategories();
        loading.dismiss();
      });
    });
  }

  search(searchInput) {
    if(searchInput.length > 2) {
      this.sagaService.search(searchInput)
        .subscribe(res => {
          this.items = Saga.fromModels(res);
          this.saveCategories();
        });
    }
  }

  cancelSearch() {
    this.sagaService.getAll()
    .subscribe(res => {
      this.items = Saga.fromModels(res);
      this.saveCategories();
    });
  }

  private saveCategories() {
    this.items.forEach(item => {
      item.categories = []
      item.categoriesRef.forEach(categoryRef => {
        item.categories.push(this.categories.find(result => result.id === categoryRef));
      });
    });
  }

}
