<script setup lang="ts">
import {Ref, ref} from 'vue'
import Square from "./Square.vue";
import generateFibonacci from "../utils/generateFibonacci";

interface GridColumn {
  number: number
  isFibonacci: boolean
}

// Generates a 2D array of objects with a number container and whether it's a fibonacci number
const gridArray = () => [...Array(50)].map(() => [...Array(50)].map(() => {
  return {
    number: 0,
    isFibonacci: false
  }
}))
const grid: Ref<GridColumn[][]> = ref(gridArray())

// I remove the 0 from the fibonacci array so empty squares
// are not counted as part of the visible sequence of 5
const fibonacciSeries = generateFibonacci(50).slice(1)


const findFibonacci = async () => {
  const gridArray = Array.from(grid.value)

  // Generate array of horizontal slices of the grid
  const horizontalSlices = gridArray.map((sq, idx) => {
    return sq.map((_, idx2) => {
        return gridArray[idx2][idx]
    })
  })

  const verticalAndHorizontalSlices = [...horizontalSlices, ...gridArray]

  // We iterate over the range of numbers in a slice of the grid,
  // each time sampling a 5 number sequential sequence,
  // then for each 5 number sequence we sample, we iterate along the
  // Fibonacci array comparing a 5 number sequence at a time to find a match.
  // Ex: Sampling along the grid slice forward -->
  // ...0, 4, 0, [2, 3, 5, 8, 13], 3, 14, 2, 0, 7, 3... <- grid slice
  // ...1, 1, 0, [2, 3, 5, 8, 13], 21, 34, 55, 19, 2... <- Fibonacci series
  // Ex: For every grid slice sample apply the same 5 number sampling technique
  // as above and compare, push each found match into an array and mark isFibonacci true.

  const validFibonacciSeries: GridColumn[][] = [];

  verticalAndHorizontalSlices.forEach((slice) => {
    slice.forEach((row, rowIndex) => {
      let fibonacciChunk
      const sourceChunk = slice.slice(rowIndex, rowIndex + 5)
      const chunkToCheck = slice.slice(rowIndex, rowIndex + 5).map(x => x.number)
      fibonacciSeries.forEach((fibonacci, fibonacciIndex) => {
        fibonacciChunk = fibonacciSeries.slice(fibonacciIndex, fibonacciIndex + 5)
        if (chunkToCheck.length < 5) return
        if (fibonacciChunk.toString() === chunkToCheck.toString()) {
          validFibonacciSeries.push(sourceChunk)
        }
      })
      // Match the sequence backwards, so we can find matches that are in reverse.
      fibonacciSeries.reverse().forEach((fibonacci, fibonacciIndex) => {
        fibonacciChunk = fibonacciSeries.slice(fibonacciIndex, fibonacciIndex + 5)
        if (chunkToCheck.length < 5) return
        if (fibonacciChunk.toString() === chunkToCheck.toString()) {
          validFibonacciSeries.push(sourceChunk)
        }
      })
    })
  })

  validFibonacciSeries.flat().forEach(square => {
    square.isFibonacci = true
    square.number = 0
  })
}

const updateRowNumber = (columnNumber: number, columnPosition: number) => {
  // columnNumber represents the horizontal position in the 2d grid,
  // columnPosition represents the vertical position in the column.
  // idx represents the current column number horizontally.
  // idx2 represents the current row position inside a column.
  Array.from(grid.value).forEach((row, idxColumn) => {
    row.forEach((value, idxRow) => {
      // If the passed in columnNumber has the same index as the current row, increment by 1
      if (idxColumn === columnNumber) {
        grid.value[idxColumn][idxRow].number += 1;
        if (idxRow === columnNumber) return // Avoids incrementing the same square twice
        grid.value[idxRow][columnPosition].number += 1;
      }
    });
  });
  findFibonacci()
}

</script>

<template>
  <div class="grid">
    <div v-for="(_, rowNumber) in grid">
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
  user-select: none;
}
</style>
