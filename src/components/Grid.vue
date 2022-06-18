<script setup lang="ts">
import { ref } from 'vue'
import Square from "./Square.vue";
import generateFibonacci from "../utils/generateFibonacci";

const gridArray = () => [...Array(50)].map(x => [...Array(50)].map(() => { return {number: 0, isFibonacci: false }}))
const fibonacciSeries = generateFibonacci(50)
const grid = ref(gridArray())

const findFibonacci = () => {
  const arr = Array.from(grid.value[0])
  for (const index of arr.keys()) {
    const toCheckArr = arr.slice(index, index + 5)
    const toCheck = arr.slice(index, index + 5).map(x => x.number)
    for (const index2 of fibonacciSeries.keys()) {
      const toCheck2 = fibonacciSeries.slice(index2, index2 + 5)
      if (toCheck2.toString() === toCheck.toString()) {
        console.log(toCheckArr)
        toCheckArr.forEach(x => {
          x.isFibonacci = true
        })
        return true
      }
    }
  }
  return false
}

const updateRowNumber = (columnNumber: number, columnPosition: number) => {
  Array.from(grid.value).forEach((row, i) => {
    row.forEach((value, j) => {
      if (i === columnNumber) {
        grid.value[i][j].number = grid.value[i][j].number + 1;
        if (j === columnNumber) return
        grid.value[j][columnPosition].number += 1;
      }
    });
  });
  console.log(findFibonacci());
}

</script>

<template>
  <div class="grid">
    <div v-for="(row, rowNumber) in grid">
      <Square
        v-for="(squareNumber, index) in grid[rowNumber]"
        :rowNumber="rowNumber"
        :rowIndex="index"
        :updateRowNumber="updateRowNumber"
        :squareValue="squareNumber"
      >
        <span v-show="squareNumber.number > 0">
          {{ squareNumber.number }}
        </span>
      </Square>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: flex;
  gap: 3px;
}
</style>
