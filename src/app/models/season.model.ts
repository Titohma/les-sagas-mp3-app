import { AuditModel } from './audit.model';

export class SeasonModel extends AuditModel {

    number: number;
    name: string = '';
    sagaRef: number = 0;
    episodesRef: [] = [];

}
