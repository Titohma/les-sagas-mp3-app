import { CategoryModel } from '../models/category.model';
import { Saga } from './saga';

export class Category extends CategoryModel {

    sagas: Saga[] = [];

    static fromModel(model: CategoryModel): Category {
        var entity = new Category();
        entity.id = model.id;
        entity.createdAt = model.createdAt;
        entity.createdBy = model.createdBy;
        entity.updatedAt = model.updatedAt;
        entity.updatedBy = model.updatedBy;
        entity.name = model.name;
        entity.nbSagas = model.nbSagas;
        return entity;
    }

    static fromModels(models: CategoryModel[]): Category[] {
        var entities: Category[] = [];
        models.forEach(model => entities.push(this.fromModel(model)));
        return entities;
    }
}
