"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzService = void 0;
const common_1 = require("@nestjs/common");
let QuizzService = class QuizzService {
    constructor() {
        this.quizzs = [];
    }
    findAll() {
        const testQuizz = {
            id: 417,
            questions: {},
            players: [],
        };
        return [testQuizz, ...this.quizzs];
    }
    findOne(id) {
        const quizz = this.quizzs.find((quizz) => quizz.id === id);
        if (!quizz) {
            throw new common_1.NotFoundException('Quizz not found.');
        }
        return quizz;
    }
    create(quizz) {
        const maxId = Math.max(...this.quizzs.map((quizz) => quizz.id), 0);
        const id = maxId + 1;
        const newQuizz = {
            ...quizz,
            id,
        };
        this.quizzs.push(newQuizz);
        return newQuizz;
    }
    update(id, quizz) {
        const index = this.quizzs.findIndex((quizz) => quizz.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException('Quizz introuvable');
        }
        const quizzUpdate = {
            ...quizz,
            id,
        };
        return quizz;
    }
};
exports.QuizzService = QuizzService;
exports.QuizzService = QuizzService = __decorate([
    (0, common_1.Injectable)()
], QuizzService);
//# sourceMappingURL=quizz.service.js.map