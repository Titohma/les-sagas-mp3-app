import { AuditModel } from './audit.model';

export class SeasonModel extends AuditModel {

    number = 1;
    name: string = '';
    sagaRef: number = 0;
    episodesRef: [] = [];

}
