<script lang="ts">
import {ref, watch, defineComponent, toRefs} from 'vue'
import delay from "../utils/delay";

export default defineComponent({
  name: 'Square',
  props: {
    rowNumber: Number,
    rowIndex: Number,
    updateRowNumber: Function,
    squareValue: Object
  },
  setup(props) {
    const backgroundColor = ref('#c4c4c4')
    watch(
        () => props.squareValue?.isFibonacci,
        async () => {
          backgroundColor.value = 'green'
          await delay(800)
          backgroundColor.value = '#c4c4c4'
          // if (!props.squareValue?.number) return
          // props.squareValue.number = 0
        }
    )

    watch(
        () => props.squareValue?.number,
        async () => {
          if (props.squareValue?.isFibonacci) return
          backgroundColor.value = '#E8BF1FFF'
          await delay(500)
          backgroundColor.value = '#c4c4c4'
        }
    )

    return {
      ...toRefs(props),
      backgroundColor
    }
  },
})

</script>

<template>
  <div class="square" @click="updateRowNumber(rowNumber, rowIndex)">
<!--    <span class="square__index">{{rowNumber}} {{rowIndex}}</span>-->
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .square {
    display: grid;
    place-content: center;
    width: 50px;
    height: 50px;
    background-color: v-bind(backgroundColor);
    color: #000;
    cursor: pointer;
    margin: 3px 0 3px 0;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;
    &__index {
      font-size: 0.4rem;
      font-weight: bold;
      text-align: center;
    }
    &:hover {
      background-color: #000;
      color: #c4c4c4;
    }
  }
</style>
