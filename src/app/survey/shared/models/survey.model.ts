import { Duration } from './duration.model';
import { Option } from './option.model';
import { Question, QuestionOptionChildren } from './question.model';

export class Survey {
    id: number;
    created_at: string;
    durations: Duration[] = [];
    survey_category_id: number;
    survey_isactive: number;
    survey_isdeleted: number;
    survey_isfeatured: number;
    survey_title: string;
    survey_type_id: number;
    updated_at: string;
    respondents?: number;
    img?: string;

    constructor(obj?: any) {
        this.id                 = obj && obj.id || 0;
        this.created_at         = obj && obj.created_at || '';
        this.survey_category_id = obj && obj.survey_category_id || 0;
        this.survey_isactive    = obj && obj.survey_isactive || 0;
        this.survey_isdeleted   = obj && obj.survey_isdeleted || 0;
        this.survey_isfeatured  = obj && obj.survey_isfeatured || 0;
        this.survey_title       = obj && obj.survey_title || '';
        this.survey_type_id     = obj && obj.survey_type_id || 0;
        this.updated_at         = obj && obj.updated_at || '';
        this.respondents        = obj && obj.respondents || 0;
        this.img                = obj && obj.img || '';
        if (obj && obj.durations) this.durations = obj.durations.map(x => new Duration(x));
    }
}







export class SurveyQuestion extends Survey {
    questions: QuestionOptionChildren[] = [];
    constructor(obj?: any) {
        super(obj);
        if (obj && obj.questions) this.questions = obj.questions.map(x => new QuestionOptionChildren(x));
    }
    setQuestions(val: QuestionOptionChildren[]) {
        this.questions = val;
    }
    saveQuestion(question: Question, isNew = false) {
        return (question.question_id === 0 || isNew === true) ? this.addQuestion(question) : this.updateQuestions(question);
    }
    saveOption(opt: Option, isNew = false) {
        return (opt.option_id === 0 || isNew === true) ? this.addOption(opt) : this.updateOption(opt);
    }
    updateQuestions(questions) {
        this.questions = this.updatedQuestionList(this.questions, questions);
    }

    saveDuration(data: Duration, isNew = false) {
        return (data.id === 0 || isNew === true) ? this.addDuration(data) : this.updateDuration(data);
    }

    private addDuration(data: Duration) {
        this.durations.push(data);
    }
    private updateDuration(data: Duration) {
       const indx = this.durations.findIndex(x => x.id === +data.id);
       this.durations[indx] = new Duration(data);
    }


    private updatedQuestionList(questions: QuestionOptionChildren[], item: Question) {
        if (questions) {
            return questions.map(x => {
                if (x.question_id === item.question_id) {
                    x = new QuestionOptionChildren(Object.assign({}, x,  item))
                    return x;
                }
                if (x.childrens) {
                    x.childrens = this.updatedQuestionList(x.childrens, item);
                    return x;
                }
            })
        }
    }
    private addQuestion(question: Question) {
        const quest = new QuestionOptionChildren(question);
        if (quest.question_parent === 0) {
            this.questions.push(quest);
        }else {
            const parent_indx = this.questions.findIndex(x => x.question_id === quest.question_parent);
            this.questions[parent_indx].childrens.push(quest);
        }
    }
    private addOption(val: Option) {
        try {
            const optionQuestion = this.findParentQuestion(this.questions, val);
            optionQuestion.options.push(val);
        } catch (error) {
            console.log(error);
        }
    }
    private updateOption(val: Option) {
        const parentOption = this.findParentQuestion(this.questions, val);
        const indx = parentOption.options.findIndex(x => x.option_id === val.option_id);
        parentOption.options[indx] = Object.assign({}, parentOption.options[indx] , val);
    }
    private findParentQuestion(items: QuestionOptionChildren[], option: Option): QuestionOptionChildren {
        if (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].question_id === option.question_id) return items[i];
                const found = this.findParentQuestion(items[i].childrens, option);
                if (found) return found;
            }
        }
    }
}
