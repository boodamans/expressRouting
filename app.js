const express = require('express')

const app = express();

//will convert array of strings to numbers

function convertAndValidateNumsArray(numsAsStrings) {
    let result = [];
  
    for (let i = 0; i < numsAsStrings.length; i++) {
      let valToNumber = Number(numsAsStrings[i]);
  
      if (Number.isNaN(valToNumber)) {
        return new Error(
          `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
        );
      }
  
      result.push(valToNumber);
    }
    return result;
  }

//mean, median, and mode functions

function mean(arr){
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
    }
    return total / arr.length;
}

function median(arr){
    const { length } = arr;
  
    arr.sort((a, b) => a - b);
    
    if (length % 2 === 0) {
      return (arr[length / 2 - 1] + arr[length / 2]) / 2;
    }
    
    return arr[(length - 1) / 2];
};

function mode(arr){
    const mode = {};
    let max = 0, count = 0;
  
    for(let i = 0; i < arr.length; i++) {
      const item = arr[i];
      
      if(mode[item]) {
        mode[item]++;
      } else {
        mode[item] = 1;
      }
      
      if(count < mode[item]) {
        max = item;
        count = mode[item];
      }
    }
     
    return max;
}

//Express routes

app.get('/', function(request, response){
    return response.send('hoooomepage')
})

app.get('/mean', (req, res) => {

    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);

    let result = {
        operation: "mean",
        result: mean(nums)
      }
      return res.send(result)
})
app.get('/median', (req, res) => {

    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);

    let result = {
        operation: "median",
        result: median(nums)
      }
      return res.send(result)
})
app.get('/mode', (req, res) => {

    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);

    let result = {
        operation: "mode",
        result: mode(nums)
      }
      return res.send(result)
})

app.listen(3000, function(){
    console.log('App on port 3000!')
})