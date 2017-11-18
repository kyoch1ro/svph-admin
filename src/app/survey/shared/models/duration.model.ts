
export class Duration {
    id: number;
    survey_id: number;
    start_date: string;
    end_date: string;
    reward_point: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.survey_id = obj && obj.survey_id || 0;
        this.start_date = obj && obj.start_date || '';
        this.end_date = obj && obj.end_date || '';
        this.reward_point = obj && obj.reward_point || 0;
    }
}
