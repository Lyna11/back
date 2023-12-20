import { QuizzModel } from '../quizz/quizz.interface';
export declare class QuizzService {
    private quizzs;
    findAll(): Array<QuizzModel>;
    findOne(id: number): QuizzModel;
    create(quizz: QuizzModel): QuizzModel;
    update(id: number, quizz: QuizzModel): QuizzModel;
}
