import { IQuestionDTO, IOptionDTO } from 'app/survey/i-survey';
export class Question implements IQuestionDTO{
    question_id: number;
    survey_id: number;
    question_caption: string;
    option_type: string;
    question_isdeleted: number;
    created_at : string;
    updated_at : string;
    options : IOptionDTO[];

    constructor(obj?: any){
        this.question_id = obj && obj.question_id || 0;
        this.survey_id = obj && obj.survey_id || 0;
        this.question_caption = obj && obj.question_caption || '';
        this.option_type = obj && obj.option_type || '';
        this.question_isdeleted = obj && obj.question_isdeleted || 0;
        this.created_at  = obj && obj.created_at  || '';
        this.updated_at  = obj && obj.updated_at  || '';
        this.options  = obj && obj.options  || [];
    }
}