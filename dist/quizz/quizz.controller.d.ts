import { QuizzService } from '../quizz/quizz.service';
import { QuizzModel } from '../quizz/quizz.interface';
export declare class QuizzController {
    private readonly quizzService;
    constructor(quizzService: QuizzService);
    findAll(): Array<QuizzModel>;
    findOne(id: number): QuizzModel;
}
