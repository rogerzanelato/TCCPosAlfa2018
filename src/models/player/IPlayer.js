export interface IPlayer {
    name: string;
    img: string;
    role?: IRole;
    status: Array<number>;
    isAlive: boolean;
    votes: number;
    wasKilledByPlayer?: boolean | null;
    idPlayer: string;
}