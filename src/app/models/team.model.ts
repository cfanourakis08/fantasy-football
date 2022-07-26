import { Player } from "./player.model";

export interface Team {
    name: string,
    picks: Array<number>,
    qbList?: Array<Player>,
    rbList?: Array<Player>,
    wrList?: Array<Player>,
    teList?: Array<Player>,
    dstList?: Array<Player>,
    kList?: Array<Player>
}