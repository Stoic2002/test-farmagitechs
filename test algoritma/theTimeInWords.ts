function timeInWords(h: number, m: number): string {
    // Write your code here
    const words = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", 
                   "thirteen", "fourteen", "quarter", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", 
                   "twenty one", "twenty two", "twenty three", "twenty four", "twenty five", "twenty six", 
                   "twenty seven", "twenty eight", "twenty nine", "half"];
    
    if (m === 0) return `${words[h]} o' clock`;
    if (m === 15) return `quarter past ${words[h]}`;
    if (m === 30) return `half past ${words[h]}`;
    if (m === 45) return `quarter to ${words[h % 12 + 1]}`;

    return m < 30 
        ? `${words[m]} ${m === 1 ? "minute" : "minutes"} past ${words[h]}`
        : `${words[60 - m]} ${60 - m === 1 ? "minute" : "minutes"} to ${words[h % 12 + 1]}`;

}

console.log(timeInWords(5,47));