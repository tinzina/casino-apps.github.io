import { StopWatch } from "./stopwatch"

const stopWatch = new StopWatch(function (stopWatch) {
    console.log(stopWatch.value)
})

stopWatch.start()