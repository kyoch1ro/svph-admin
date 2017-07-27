export interface ISurvey {
    id: number;
    created_at: string;
    durations: ISurveyDuration[];
    survey_category_id: number;
    survey_isactive: number;
    survey_isdeleted: number;
    survey_isfeatured: number;
    survey_title: string;
    survey_type_id: number;
    updated_at: string;
    respondents: number;
    img: string;
}

export interface ISurveyDuration {
    id: number;
    survey_id: number;
    start_date: string;
    end_date: string;
    reward_point: number;
}

export interface IQuestion {
    question_id: number;
    survey_id: number;
    question_parent: number;
    question_caption: string;
    option_type: string;
    question_isdeleted: number;
    created_at: string;
    updated_at: string;
    childrens: IQuestion[];
}

export interface IOption {
    option_id: number;
    question_id: number;
    option_caption: string;
    option_isactive: number;
    option_isdeleted: number;
    created_at: string;
    updated_at: string;
}


export interface ISurveyQuestion extends ISurvey{
    questions: IQuestionOption[];
}
export interface IQuestionOption extends IQuestion{
    options: IOption[];
}


export interface ISurveyForList extends ISurvey {
    category_name: string;
    respondents: number;
    type_name: string;
}