const generateFibonacci = (amount: number): number[] =>
  new Array(amount).fill(1).reduce((arr, _ ,i: number) => {
    arr.push((i <= 1) ? i : arr[i-2] + arr[i-1])
    return arr
  },[])

export default generateFibonacci
