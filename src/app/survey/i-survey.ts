export interface ISurveyDTO {
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
}




export interface IQuestionDTO {
    question_id: number;
    survey_id: number;
    question_caption: string;
    option_type: string;
    question_isdeleted: number;
    created_at : string;
    updated_at : string;
    options : IOptionDTO[];
}


export interface IOptionDTO {
    option_id : number;
    question_id : number;
    option_caption : string;
    option_isactive : number;
    option_isdeleted : number;
    created_at : string;
    updated_at : string;
}


export interface ISurveyForList extends ISurveyDTO{
    category_name: string;
    respondents: number;
    type_name: string;
}