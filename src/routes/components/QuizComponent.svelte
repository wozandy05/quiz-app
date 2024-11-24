<script>
  import {allQuestions} from "$lib/questions"

  let activeQuestion = 0
  let selectedQuestions = []
  let finalScore = 0
  let isDone = false

  const calculateScore = () => {
    return selectedQuestions.filter(({answer, selectedAnswer}) => answer === selectedAnswer).length
  }

  const handleNext = () => {
    if (activeQuestion < allQuestions.length - 1) {
      activeQuestion += 1
    } else {
      // calculate score
      finalScore = calculateScore()
      isDone = true
    }
  }

  const handleBack = () => {
    if (activeQuestion > 0) {
      activeQuestion -= 1
    }
  }

  const selectOption = (selectedAnswer, question) => {
    const index = selectedQuestions.findIndex((item) => item.question === question.question)

    if (index != -1) {
      selectedQuestions[index] = {...selectedQuestions[index], selectedAnswer}
    } else {
      selectedQuestions = [
        ...selectedQuestions,
        {
          ...question,
          selectedAnswer
        }
      ]
    }
  }

  const handleReset = () => {
    activeQuestion = 0
    selectedQuestions = []
    finalScore = 0
    isDone = false
  }
</script>

<div class="min-h-screen flex items-center justify-center">
  <div class="border border-gray-600 w-full max-w-[500px] min-h-40 bg-black rounded-3xl p-6 shadow-xl">
    <h1 class="text-white text-3xl font-medium">Quiz App</h1>
    <hr class="w-24 border border-gray-600 my-4">

    {#if isDone}
      <p class="text-white">You scored {finalScore} out of {selectedQuestions?.length}</p>
      <div class="flex justify-end mt-8">
        <button on:click={handleReset} class="py-3 px-10 rounded-xl text-white bg-purple-700 font-medium"> Reset </button>
      </div>
    {:else}    
      <div>
      {#each allQuestions as question, index (index)}
      {#if activeQuestion == index}
        <p class="text-gray-300">{question.question}</p>
        <p class="text-gray-300 text-sm mt-1">{index+1}/{allQuestions.length}</p>

        <div class="mt-5 space-y-5">
          {#each question.options as option, idx (idx)}
          {@const isSelected = selectedQuestions?.find((item) => item.selectedAnswer === option)}
          <button class="w-full h-14 border border-gray-600 text-gray-200 flex items-center rounded-xl px-6" class:selected-option={isSelected} on:click={() => selectOption(option, question)}> {option} </button>
          {/each}
        </div>
      {/if}
    {/each}


      <div class="flex justify-end mt-8">
        <button class="font-medium text-white px-6" on:click={handleBack} class:hidden={activeQuestion < 1}> Back </button>
        <button class="py-3 px-10 rounded-xl text-white bg-purple-700 font-medium" on:click={handleNext}> Next </button>
      </div>
    </div>
    {/if}

  </div>
</div>

<style>
  .selected-option {
    background-color: #164e63;
  }
</style>