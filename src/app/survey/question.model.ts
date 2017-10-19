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
}
