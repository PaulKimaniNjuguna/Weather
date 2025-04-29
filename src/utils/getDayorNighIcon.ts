
export function getDayorNightIcon(
    iconName: string,
    dateTimeString: string;
): string {
    const hours = new Date(dateTimeString).getHours(); //Get hours
    
    const isDayTime = hours >= 6 && hours < 18; //daytime from 6AM to 6PM

    return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n")

}