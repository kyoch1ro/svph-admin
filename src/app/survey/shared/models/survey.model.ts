import { Duration } from './duration.model';
import { Option } from './option.model';
import { Question, QuestionOptionChildren } from './question.model';




export class Survey {
    id: number;
    created_at: string;
    durations: Duration[];
    survey_category_id: number;
    survey_isactive: number;
    survey_isdeleted: number;
    survey_isfeatured: number;
    survey_title: string;
    survey_type_id: number;
    updated_at: string;
    respondents: number;
    img: string;

    constructor(obj?: any) {
        this.id                 = obj && obj.id || 0;
        this.created_at         = obj && obj.created_at || '';
        this.durations          = obj && obj.durations || [];
        this.survey_category_id = obj && obj.survey_category_id || 0;
        this.survey_isactive    = obj && obj.survey_isactive || 0;
        this.survey_isdeleted   = obj && obj.survey_isdeleted || 0;
        this.survey_isfeatured  = obj && obj.survey_isfeatured || 0;
        this.survey_title       = obj && obj.survey_title || '';
        this.survey_type_id     = obj && obj.survey_type_id || 0;
        this.updated_at         = obj && obj.updated_at || '';
        this.respondents        = obj && obj.respondents || 0;
        this.img                = obj && obj.img || '';
    }
}


export class SurveyQuestion extends Survey {
    questions: QuestionOptionChildren[];
    constructor(obj?: any) {
        super(obj);
        this.questions = obj && obj.questions || [];
    }

    setQuestions(val: QuestionOptionChildren[]) {
        this.questions = val;
    }

    updateQuestion(question: Question) {
        const quest = new QuestionOptionChildren(question);
        if (question.question_parent > 0) {
            const parent_indx = this.questions.findIndex(x => x.question_id === question.question_parent);
            const children_indx = this.questions[parent_indx].childrens.findIndex(x => x.question_id === question.question_id);
            this.questions[parent_indx].childrens[children_indx] =
              new QuestionOptionChildren(Object.assign({}, this.questions[parent_indx].childrens[children_indx],  question));
        }else {
            const indx = this.questions.findIndex(x => x.question_id === question.question_id);
            this.questions[indx] =
                new QuestionOptionChildren(Object.assign({}, this.questions[indx],  question));
        }
    }


    addQuestion(question: Question) {
        const quest = new QuestionOptionChildren(question);
        if (quest.question_parent === 0) {
            this.questions.push(quest);
        }else {
            const parent_indx = this.questions.findIndex(x => x.question_id === quest.question_parent);
            this.questions[parent_indx].childrens.push(quest);
        }
    }
    addQuestionOption(indx: number, val: Option) {
        this.questions[indx].options.push(val);
    }
}
