import { Server, Socket as RawSocket } from 'socket.io';
import RoomManagerService from './room.service';
export type ClientToServerEvents = {
    searchRoom: (payload: number) => void;
    playerSendResponse: (payload: number, callback: (score: number) => void) => void;
};
type PayloadForEvent<T extends keyof ClientToServerEvents> = Parameters<ClientToServerEvents[T]>[0];
type ResponseForEvent<T extends keyof ClientToServerEvents> = Parameters<ClientToServerEvents[T]>[1] extends (response: infer U) => void ? U : void;
export type ServerToClientEvents = {
    playerJoined: () => void;
    nextQuestion: (status: {
        question: string;
        reponses: string[];
    }) => void;
    roomStatusUpdated: (status: {
        players: string[];
        roomCurrentPlayers: number;
        roomMaxPlayers: number;
    }) => void;
};
export type SocketData = {
    score?: number;
};
export type Socket = RawSocket<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>;
export declare class EventsGateway {
    private readonly roomManagerService;
    constructor(roomManagerService: RoomManagerService);
    healthCheck(): string;
    server: Server<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>;
    onSearchRoom(payload: PayloadForEvent<'searchRoom'>, client: Socket): void;
    onPlayerSendResponse(payload: PayloadForEvent<'playerSendResponse'>, client: Socket): ResponseForEvent<'playerSendResponse'>;
}
export {};
