<script setup lang="ts">
import {Ref, ref} from 'vue'
import Square from "./Square.vue";
import generateFibonacci from "../utils/generateFibonacci";

interface GridColumn {
  number: number
  isFibonacci: boolean
}

const gridArray = () => [...Array(50)].map(() => [...Array(50)].map(() => {
  return {
    number: 0,
    isFibonacci: false
  }
}))
const fibonacciSeries = generateFibonacci(50)
const grid: Ref<GridColumn[][]> = ref(gridArray())

const formArrays = () => {
  const reversedColumns = grid.value.slice().map((row) => row.reverse())
  const rows = grid.value.slice().map((column) => column.map((row, rowIndex) => column[rowIndex]))
  const reversedRows = rows.slice().map((row) => row.reverse())
  return [...grid.value, ...reversedColumns, ...rows, ...reversedRows]
}

const findFibonacci = () => {
  const arr = Array.from(grid.value)
  arr.forEach((lateral) => {
    lateral.forEach((row, rowIndex) => {
      const toCheckArr = lateral.slice(rowIndex, rowIndex + 5)
      const toCheck = lateral.slice(rowIndex, rowIndex + 5).map(x => x.number)
      fibonacciSeries.forEach((fibonacci, fibonacciIndex) => {
        const toCheck2 = fibonacciSeries.slice(fibonacciIndex, fibonacciIndex + 5)
        if (toCheck.length < 5) return
        if (toCheck2.toString() === toCheck.toString()) {
          toCheckArr.forEach(x => {
            x.isFibonacci = true
            x.number = 0
          })
        }
      })
    })
  })
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
  findFibonacci()
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
  margin-left: 3px;
}
</style>
