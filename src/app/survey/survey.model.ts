import { ISurveyDTO,IQuestionDTO } from './i-survey';
export class Survey implements ISurveyDTO{
    id: number;
    survey_type_id: number;
    survey_category_id : number;
    survey_title : string;
    survey_isactive: number;
    survey_isfeatured : number;
    survey_isdeleted : number;
    created_at : string;
    updated_at : string;
    start_date : string;
    end_date : string;
    questions: IQuestionDTO[];

    constructor(obj?: any){
        this.id = obj && obj.id || null;
        this.survey_type_id = obj && obj.numbersurvey_type_id || null;
        this.survey_category_id = obj && obj.survey_category_id || null;
        this.survey_title = obj && obj.survey_title || null;
        this.survey_isactive =  obj && obj.numbersurvey_isactive || null;
        this.survey_isfeatured = obj && obj.survey_isfeatured || null;
        this.survey_isdeleted = obj && obj.survey_isdeleted || null;
        this.created_at = obj && obj.created_at || null;
        this.updated_at = obj && obj.updated_at || null;
        this.start_date = obj && obj.start_date || null;
        this.end_date = obj && obj.end_date || null;
        this.questions = obj && obj.questions || null;
        
    }
}