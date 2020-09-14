import { SagaModel } from '../models/saga.model';
import { Author } from './author';
import { Category } from './category';
import { Season } from './season';

export class Saga extends SagaModel {
    authors: Author[] = []
    categories: Category[] = []
    seasons: Season[] = []

    static fromModel(model: SagaModel): Saga {
        var entity = new Saga();
        entity.id = model.id;
        entity.createdAt = model.createdAt;
        entity.createdBy = model.createdBy;
        entity.updatedAt = model.updatedAt;
        entity.updatedBy = model.updatedBy;
        entity.title = model.title;
        entity.backgroundUrl = model.backgroundUrl;
        entity.coverUrl = model.coverUrl;
        entity.url = model.url;
        entity.urlWiki = model.urlWiki;
        entity.levelArt = model.levelArt;
        entity.levelTech = model.levelTech;
        entity.nbReviews = model.nbReviews;
        entity.urlReviews = model.urlReviews;
        entity.nbBravos = model.nbBravos;
        entity.authorsRef = model.authorsRef;
        entity.categoriesRef = model.categoriesRef;
        entity.seasonsRef = model.seasonsRef;
        return entity;
    }

    static fromModels(models: SagaModel[]): Saga[] {
        var entities: Saga[] = [];
        models.forEach(model => entities.push(this.fromModel(model)));
        return entities;
    }

}
