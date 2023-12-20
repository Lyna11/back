"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const room_service_1 = require("./room.service");
const common_1 = require("@nestjs/common");
let EventsGateway = class EventsGateway {
    constructor(roomManagerService) {
        this.roomManagerService = roomManagerService;
    }
    healthCheck() {
        return 'WebSocket server is running.';
    }
    onSearchRoom(payload, client) {
        console.log('searchRoom', payload, client.id, client.handshake);
        const room = this.roomManagerService.findOrCreateRoom(client.id);
        const roomKey = `room/${room.id}`;
        client.join(roomKey);
        this.server.to(roomKey).emit('roomStatusUpdated', {
            players: [],
            roomCurrentPlayers: 1,
            roomMaxPlayers: this.roomManagerService.MAX_USERS_IN_ROOM,
        });
        this.server.to(client.id).emit('playerJoined');
        if (room.users.length === this.roomManagerService.MAX_USERS_IN_ROOM) {
            this.server.to(roomKey).emit('nextQuestion', {
                question: 'slt',
                reponses: [],
            });
        }
    }
    onPlayerSendResponse(payload, client) {
        if (client.data.score) {
            client.data.score = 0;
        }
        if (payload === +'idBonneReponse') {
            client.data.score += 5;
        }
        else {
            client.data.score -= 5;
        }
        this.server.to(client.rooms[0]).emit('nextQuestion', {
            question: 'slt',
            reponses: [],
        });
        return client.data.score;
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], EventsGateway.prototype, "healthCheck", null);
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('searchRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "onSearchRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('playerSendResponse'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], EventsGateway.prototype, "onPlayerSendResponse", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(4001, { cors: { origin: '*' } }),
    __metadata("design:paramtypes", [room_service_1.default])
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map