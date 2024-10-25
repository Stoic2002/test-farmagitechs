function plusMinus(arr: number[]): void {
    // Write your code here
    const total = arr.length;
    const positives = arr.filter(x => x > 0).length / total;
    const negatives = arr.filter(x => x < 0).length / total;
    const zeros = arr.filter(x => x === 0).length / total;

    console.log(positives.toFixed(6));
    console.log(negatives.toFixed(6));
    console.log(zeros.toFixed(6));

}

plusMinus([-4,3,-9,0,4,1]);

