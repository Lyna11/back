export interface QuestionChoice {
    id: number;
    body: string;
}
export interface Questions {
    [theme: string]: [
        {
            index: number;
            body: string;
            choices: QuestionChoice[];
            answerId: number;
        }
    ];
}
