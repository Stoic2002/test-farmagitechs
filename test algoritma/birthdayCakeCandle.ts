export function birthdayCakeCandles(candles: number[]): number {
    // Write your code here
    const tallest = Math.max(...candles);
    return candles.filter(candle => candle === tallest).length;

}

console.log(birthdayCakeCandles([1,4,7,4,3,7]));