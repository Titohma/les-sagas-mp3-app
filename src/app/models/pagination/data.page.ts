import { DataSort } from './data.sort';

export class DataPage<T> {

    content: T[] = [];
    totalPages: number = 0;
    totalElements: number = 0;
    number: number = 0;
    size: number = 0;
    numberOfElements: number = 0;
    sort: DataSort = new DataSort();

}
