import { Survey } from './models/survey.model';


export class SurveyList extends Survey  {
    category_name: string;
    respondents: number;
    type_name: string;
}
