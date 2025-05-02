export function convertWindSpeed(speedInMeterPerSecond: number): string {
    const speedinKilometrePerHour = speedInMeterPerSecond * 3.6; //conversion from m/s to km/h
    return `${speedinKilometrePerHour.toFixed(0)}km/h`;
}