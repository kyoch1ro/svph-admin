import { Option } from './option.model';
export class Question {
    question_id: number;
    survey_id: number;
    question_parent: number;
    question_caption: string;
    option_type: string;
    question_isdeleted: number;
    created_at: string;
    updated_at: string;
    childrens: Question[];
    options: Option[];
    constructor(obj?: any) {
        this.question_id = obj && obj.question_id || 0;
        this.survey_id = obj && obj.survey_id || 0;
        this.question_parent = obj && obj.question_parent || 0;
        this.question_caption = obj && obj.question_caption || '';
        this.option_type = obj && obj.option_type || '';
        this.question_isdeleted = obj && obj.question_isdeleted || 0;
        this.created_at = obj && obj.created_at || '';
        this.updated_at = obj && obj.updated_at || '';
        this.childrens = obj && obj.childrens || [];
        this.options = obj && obj.options || [];
    }
}