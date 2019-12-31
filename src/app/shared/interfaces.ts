export interface EasyMode {
    field: number;
    delay: number;
    mode: string;
}
export interface NormalMode {
    field: number;
    delay: number;
    mode: string;
}
export interface HardMode {
    field: number;
    delay: number;
    mode: string;
}
export interface Mode {
    easyMode: EasyMode;
    normalMode: NormalMode;
    hardMode: HardMode;
}


export interface Winner {
    name: string;
    date: string;
}
