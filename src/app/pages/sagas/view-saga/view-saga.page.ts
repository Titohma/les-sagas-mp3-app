import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { Saga } from 'src/app/entities/saga';
import { AuthorService } from 'src/app/services/authors/author.service';
import { CategoryService } from 'src/app/services/categories/category.service';
import { SagaService } from 'src/app/services/sagas/saga.service';

@Component({
  selector: 'app-view-saga',
  templateUrl: './view-saga.page.html',
  styleUrls: ['./view-saga.page.scss'],
})
export class ViewSagaPage implements OnInit {

  public item: Saga = new Saga();

  constructor(
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public authorService: AuthorService,
    public categoryService: CategoryService,
    private sagaService: SagaService) { }

  ngOnInit() {
    var itemId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadingController.create({
      message: 'Téléchargement...'
    }).then((loading) => {
      loading.present();
      this.sagaService.getById(itemId)
        .subscribe(data => {
          this.item = Saga.fromModel(data);
          let categories = this.categoryService.getAllByIds(data.categoriesRef);
          let authors = this.authorService.getAllByIds(data.authorsRef);
          forkJoin([authors, categories]).subscribe(results => {
            this.item.authors = results[0];
            this.item.categories = results[1];
            loading.dismiss();
          });
        });
    });
  }

  backgroundImage(): string {
    if(this.item.backgroundUrl) {
      return 'url(' + this.item.backgroundUrl + ')';
    } else {
      return '';
    }
  }

}
