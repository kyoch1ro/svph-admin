import { Survey } from '../survey.model';
import { Duration } from '../duration.model';

export class SurveyList extends Survey  {
    category_name: string;
    respondents: number;
    type_name: string;
}
