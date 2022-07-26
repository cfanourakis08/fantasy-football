export type Player = {
    id: number,
    name: string,
    position: string,
    adp: number,
    ceiling: number,
    floor: number,
    mean: number,
    team: string,
    risk: number,
    vor?: number,
    starterValue: number,
    benchValue: number
}