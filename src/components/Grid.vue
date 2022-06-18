<script setup lang="ts">
import { ref } from 'vue'
import Square from "./Square.vue";
import generateFibonacci from "../utils/generateFibonacci";

const gridArray = () => [...Array(50)].map(x => Array(50).fill(0));
const fibonacciSeries = generateFibonacci(50)
const grid = ref(gridArray())

const findFibonacci = () => {
  const arr = Array.from(grid.value[0])
  for (const index of arr.keys()) {
    const toCheck = arr.slice(index, index + 5)
    for (const index2 of fibonacciSeries.keys()) {
      const toCheck2 = fibonacciSeries.slice(index2, index2 + 5)
      if (toCheck2.toString() === toCheck.toString()) {
        return true
      }
    }
  }
  return false
}

const updateRowNumber = (columnNumber: number, columnPosition: number) => {
  grid.value.forEach((row, i) => {
    row.forEach((value, j) => {
      if (i === columnNumber) {
        grid.value[i][j] += 1;
        if (j === columnNumber) return
        grid.value[j][columnPosition] += 1;
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
        <span v-show="squareNumber > 0">
          {{ squareNumber }}
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
