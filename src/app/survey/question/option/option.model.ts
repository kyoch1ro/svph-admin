import { IOption } from '../../shared/survey.interface';


export class Option implements IOption{
    option_id : number;
    question_id : number;
    option_caption : string;
    option_isactive : number;
    option_isdeleted : number;
    created_at : string;
    updated_at : string;

    constructor(obj? : any){
        this.option_id          = obj && obj.option_id  || 0;
        this.question_id        = obj && obj.question_id  || 0;
        this.option_caption     = obj && obj.option_caption  || '';
        this.option_isactive    = obj && obj.option_isactive  || 0;
        this.option_isdeleted   = obj && obj.option_isdeleted  || 0;
        this.created_at         = obj && obj.created_at  || '';
        this.updated_at         = obj && obj.updated_at  || '';
    }
}