const question = document.getElementById('q-text');
const questionNo = document.getElementById('q-id');
const qNum = document.querySelector('.q-var');
const answers = document.querySelectorAll("input[name='option']");
const answersLabel = document.querySelectorAll('label');
const checkBtn = document.querySelector('.check-btn');
const showBtn = document.querySelector('.show-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const notifyBox = document.querySelector('.notify');
const notifyText = document.querySelector('#notify-text');



/*Event listeners */

function eventListeners()
{

    checkBtn.addEventListener('click',checkQuiz);
    showBtn.addEventListener('click',showAnswer);
    prevBtn.addEventListener('click',prevQuiz);
    nextBtn.addEventListener('click',nextQuiz);


}

function checkQuiz()
{
    
    const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("questions.json");
  xobj.open('GET', 'questions.json', true); 
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
    CheckCallback(JSON.parse(xobj.responseText));
    
    }
  };
  xobj.send(null);
}

function CheckCallback(obj)
{
    var indexOfQuiz = parseInt(qNum.textContent);
    var i;
   for(i=0;i<4;i++)
   {
       if(answers[i].checked)
       {
           if(answersLabel[i].textContent.toLowerCase()===obj[indexOfQuiz-1].answer)
           {
               rightAnswer(i+1);
           }
           else{
               wrongAnswer(i+1);
           }
       }
   }

   
}

function rightAnswer(optionNum)
{

    var qId = `op-${optionNum}`
    const rightOption = document.getElementById(qId).parentElement
    rightOption.classList.add('right');
    notifyText.textContent= "Right Aswer!";
    notifyBox.style.display = "block";
    notifyBox.style.backgroundColor = "rgb(1, 136, 62)";
    setTimeout(function(){
        rightOption.classList.remove('right');
        notifyBox.style.display = "none";

    },1500);
}

function wrongAnswer(optionNum)
{
    var qId = `op-${optionNum}`
    const wrongOption = document.getElementById(qId).parentElement
    wrongOption.classList.add('wrong');
    notifyText.textContent= "Wrong Aswer!";
    notifyBox.style.display = "block";
    notifyBox.style.backgroundColor = "rgb(138, 5, 5)";
    setTimeout(function(){
        wrongOption.classList.remove('wrong');
        notifyBox.style.display = "none";
    },1500);
}

function removeDesign()
{
    const tdOptions = document.querySelectorAll('td');
    var i;
    for(i=0;i<tdOptions.length;i++)
    {
        tdOptions.classList.remove('right');
        tdOptions.classList.remove('wrong');

    }
}

function showAnswer()
{

    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("questions.json");
    xobj.open('GET', 'questions.json', true); 
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      ShowCallback(JSON.parse(xobj.responseText));
      
      }
    };
    xobj.send(null);
}

function ShowCallback(obj)
{
    var indexOfQuiz = parseInt(qNum.textContent);
    const rightAnswer = obj[indexOfQuiz-1].answer;

        for(i=0;i<4;i++)
        {
            if(answersLabel[i].textContent.toLowerCase()===rightAnswer.toLowerCase())
            {
                answersLabel[i].parentElement.classList.add('show');
                
            }
        }
        setTimeout(function(){
            for(i=0;i<4;i++)
        {
            answersLabel[i].parentElement.classList.remove('show'); 
        }
            
        },2000)
         
}

function prevQuiz()
{
    /*for unchecking radio button*/
    var i;
    for(i=0;i<4;i++)
    {
        answers[i].checked = false;
    }
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("questions.json");
    xobj.open('GET', 'questions.json', true); 
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      prevCallback(JSON.parse(xobj.responseText));
      
      }
    };
    xobj.send(null);
}

function prevCallback(obj)
{
    var qIndex = parseInt(qNum.textContent);
     if(qIndex!==1)
     {
        qIndex-=1;
        qNum.textContent = qIndex;
        questionNo.textContent = qNum.textContent;
        question.innerHTML = `
        <span id="q-id">${qNum.textContent}.</span>
        ${obj[qIndex-1].question}
        `;
        var i;
        for(i=0;i<4;i++)
        {
            answersLabel[i].textContent = obj[qIndex-1].options[i].toUpperCase();
        }
        
     }
}

function nextQuiz()
{
    var i;
    for(i=0;i<4;i++)
    {
        answers[i].checked = false;
    }
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("questions.json");
    xobj.open('GET', 'questions.json', true); 
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      nextCallback(JSON.parse(xobj.responseText));
      
      }
    };
    xobj.send(null);
}

function nextCallback(obj)
{
    var qIndex = parseInt(qNum.textContent);
     if(qIndex!==obj.length)
     {
         qIndex+=1;
        qNum.textContent = qIndex;
        questionNo.textContent = qNum.textContent;
        question.innerHTML = `
        <span id="q-id">${qNum.textContent}.</span>
        ${obj[qIndex-1].question}
        `;
        var i;
        for(i=0;i<4;i++)
        {
            answersLabel[i].textContent = obj[qIndex-1].options[i].toUpperCase();
        }
        
     }
}

function loadQuiz()
{
    var i;
    for(i=0;i<4;i++)
    {
        answers[i].checked = false;
    }
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("questions.json");
    xobj.open('GET', 'questions.json', true); 
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      loadCallback(JSON.parse(xobj.responseText));
      
      }
    };
    xobj.send(null);


}

function loadCallback(obj){
    qNum.textContent = obj[0].qNumber;
    questionNo.textContent = obj[0].qNumber;
    question.innerHTML = `
    <span id="q-id">1.</span>
    ${obj[0].question}
    `;

}


eventListeners();
