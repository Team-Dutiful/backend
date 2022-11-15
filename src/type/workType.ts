export enum WorkType {
    DAY, EVENING, NIGHT, OFF, ETC
}

export function getWorkType(workType : string) {
    if (workType.match("DAY")) {
        return WorkType.DAY
    } else if (workType.match("EVENING")){
        return WorkType.EVENING
    } else if (workType.match("NIGHT")){
        return WorkType.NIGHT
    } else if (workType.match("OFF")){
        return WorkType.OFF
    } else {
        return WorkType.ETC
    }
}