interface Room {
    id: string;
    users: string[];
}
declare class RoomManagerService {
    private rooms;
    readonly MAX_USERS_IN_ROOM = 2;
    findOrCreateRoom(username: string): Room;
}
export default RoomManagerService;
