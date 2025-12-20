/* screening.js - digitized tests + diagnosis engine */

// ------- Data: questions (digitized from your tests) -------
// Each test has: id, title, domain, items[]. Each item: type ('mcq','text','click','teacher'), question, choices, answer, timeLimit (optional)
const TESTS = {
  foundation: [
    { id:'f-dyslexia', title:'Dyslexia — Foundation (10 Q)', domain:'dyslexia', items: [
        {type:'mcq', q:'Circle the word that sounds the same as "cat".', choices:['hat','car','can','cut'], answer:0},
        {type:'mcq', q:'Choose the word that is spelled correctly.', choices:['aplle','apple','aple','appul'], answer:1},
        {type:'mcq', q:'What letter makes the starting sound in "banana"?', choices:['B','N','D','L'], answer:0},
        {type:'mcq', q:'Read sentence and pick the word that looks wrong: "The sun is brite today."', choices:['sun','is','brite','today'], answer:2},
        {type:'mcq', q:'Which word does not belong?', choices:['chair','table','bed','cat'], answer:3},
        {type:'mcq', q:'Which word rhymes with "log"?', choices:['dog','leg','lid','duck'], answer:0},
        {type:'text', q:'Fill in the missing letters: C _ T', answerRegex:/^c.?t$/i},
        {type:'click', q:'Point to the picture that matches this word: frog', choices:['dog','frog','fish','bird'], answer:1},
        {type:'mcq', q:'What word is made from letters: T-A-P?', choices:['pat','tap','apt','atp'], answer:1},
        {type:'teacher', q:'Read this sentence aloud (teacher checks decoding): "A big red bus goes up the hill."'}
      ]},
    { id:'f-dysgraphia', title:'Dysgraphia — Foundation (10 Q)', domain:'dysgraphia', items:[
        {type:'teacher', q:'Copy this sentence neatly: "I love to play with my friends."'},
        {type:'teacher', q:'Write your full name clearly.'},
        {type:'text', q:'Write these words separated by commas: sun, cat, home, dog', answerRegex:/sun.*cat.*home.*dog/i},
        {type:'teacher', q:'Draw and label a tree (teacher reviews).'},
        {type:'text', q:'Finish this sentence: "At school I like to ____."', answerRegex:/.+/},
        {type:'text', q:'Copy the following numbers: 5 9 12 20', answerRegex:/5.*9.*12.*20/},
        {type:'text', q:'Write one short sentence about your favorite color.', answerRegex:/\S+/},
        {type:'mcq', q:'Circle the sentence that is written correctly.', choices:['i lik the dog.','I like the dog.','I lik the Dog.','I like Dog the.'], answer:1},
        {type:'text', q:'Write three words that start with the letter "S" (comma separated).', answerRegex:/\bs\w+/i},
        {type:'teacher', q:'Listen to teacher and write: "The cat ran fast."'}
      ]},
    { id:'f-dyscalculia', title:'Dyscalculia — Foundation (10 Q)', domain:'dyscalculia', items:[
        {type:'mcq', q:'What number comes next: 1,2,3, ___?', choices:['4','5','6','7'], answer:0},
        {type:'click', q:'Count the apples (visual). Type the number you saw.', choices:[], typeOverride:'text', q2:'Enter number of apples', answerRegex:/^\d+$/},
        {type:'mcq', q:'5 + 2 = ?', choices:['6','7','8','9'], answer:1},
        {type:'mcq', q:'9 − 3 = ?', choices:['5','6','7','8'], answer:1},
        {type:'click', q:'Which group has more objects? (select left or right)', choices:['left','right'], answer:0},
        {type:'mcq', q:'Circle the smallest number', choices:['3','5','2','4'], answer:2},
        {type:'mcq', q:'What shape has three sides?', choices:['circle','triangle','square','rectangle'], answer:1},
        {type:'text', q:'If you have 10 sweets and eat 4, how many are left?', answerRegex:/^6$/},
        {type:'text', q:'Which number is missing? 2,4,__,8,10', answerRegex:/^6$/},
        {type:'teacher', q:'Draw 6 circles and color half of them (teacher review).'}
      ]},
    { id:'f-adhd', title:'ADHD — Foundation (10 Q)', domain:'adhd', items:[
        {type:'action', q:'Follow this direction: "Touch your nose, then clap twice." (click "Done" when done)'},
        {type:'click', q:'Circle the red star (visual).', choices:['red','blue','green'], answer:0},
        {type:'mcq', q:'Read carefully: Circle the word "dog".', choices:['cat','dog','frog','log'], answer:1},
        {type:'action', q:'Clap every time you hear the word "apple" (teacher monitors audio).'},
        {type:'click', q:'Which picture came first? (select index)', choices:['1','2','3'], answer:0},
        {type:'click', q:'Copy this pattern: (press the correct sequence)', choices:['RBRBRB','RBRRBR','RBBRBR'], answer:0},
        {type:'action', q:'Count from 1 to 10 out loud — teacher notes skipping.'},
        {type:'mcq', q:'Find missing word: "The boy is _____ a ball."', choices:['run','runs','running','ran'], answer:1},
        {type:'mcq', q:'Which sentence means the same as: "The girl with a hat is dancing."', choices:['The hat is dancing.','The dancing girl has a hat.','The girl lost her hat.','The hat is on the girl.'], answer:1},
        {type:'action', q:'Follow: "Draw a circle, then a square inside it." (teacher reviews).'}
      ]},
    { id:'f-memory', title:'Memory & Processing — Foundation (10 Q)', domain:'memory', items:[
        {type:'audio', q:'Listen and repeat: "Dog, car, tree". Type what you recall after 10s.', answerRegex:/dog.*car.*tree/i},
        {type:'visual', q:'Look at picture for 5s then answer what you saw (teacher supplies image).', answerRegex:/\S+/},
        {type:'text', q:'Remember short story: "Tom has a red bike..." What color is the bike?', answerRegex:/red/i},
        {type:'mcq', q:'What comes after Tuesday?', choices:['Monday','Wednesday','Friday','Sunday'], answer:1},
        {type:'mcq', q:'What comes before 10?', choices:['8','9','7','6'], answer:1},
        {type:'action', q:'Listen and follow: "Stand up, spin around, sit down."'},
        {type:'click', q:'Copy this pattern (choose):', choices:['pattern1','pattern2','pattern3'], answer:0},
        {type:'text', q:'Read and answer: "The cat slept under the bed." — Where did the cat sleep?', answerRegex:/under the bed/i},
        {type:'action', q:'Say alphabet A to G — teacher notes skips.'},
        {type:'click', q:'Which picture appeared twice?', choices:['A','B','C','D'], answer:1}
      ]}
  ],
  intermediate: [
    { id:'i-dyslexia', title:'Dyslexia — Intermediate (15 Q)', domain:'dyslexia', items:[
        {type:'passage', q:'Read passage about Maya. Q1: What is the main idea?', choices:['Maya wanted to visit the moon.','Maya liked reading about space.','Maya flew to Jupiter.','Maya saw real clouds.'], answer:1},
        {type:'mcq', q:'Which planet is mentioned?', choices:['Earth','Mars','Jupiter','Saturn'], answer:2},
        {type:'mcq', q:'The word "imagined" means:', choices:['remembered','created in her mind','copied','read aloud'], answer:1},
        {type:'mcq', q:'Choose the word spelled correctly', choices:['beleive','recieve','because','freind'], answer:2},
        {type:'mcq', q:'Which sounds same as "bare"?', choices:['bear','bar','beer','burr'], answer:0},
        {type:'mcq', q:'Which word does not belong?', choices:['read','book','write','jump'], answer:3},
        {type:'mcq', q:'Find word that looks wrong: "The dog runned fast after the ball."', choices:['the','dog','runned','fast'], answer:2},
        {type:'text', q:'Fill missing letters: Kn _ w _ led _ e', answerRegex:/knowledge/i},
        {type:'mcq', q:'Which sentence is written correctly?', choices:['I dont like ice cream.','I don’t like icecream.','I don’t like ice cream.','I dont like icecream.'], answer:2},
        {type:'text', q:'Rearrange letters "lpeahnt"', answerRegex:/elephant|lpeahnt/i},
        {type:'mcq', q:'Which word best fits: "The rain made the grass ______."', choices:['green','greener','greenest','greenly'], answer:1},
        {type:'mcq', q:'Which pair rhyme?', choices:['time–same','night–light','red–read','cup–cap'], answer:1},
        {type:'text', q:'What does "The wind whispered secrets through the trees" mean?', answerRegex:/.{3,}/},
        {type:'mcq', q:'Which prefix means "not"?', choices:['re-','un-','pre-','sub-'], answer:1},
        {type:'mcq', q:'Which is a noun?', choices:['quickly','beautiful','happiness','running'], answer:2}
      ]},
    { id:'i-dysgraphia', title:'Dysgraphia — Intermediate (15 Q)', domain:'dysgraphia', items:[
        {type:'text', q:'Write a short paragraph describing your favorite place (teacher review).', teacher:true},
        {type:'text', q:'Correct capitalization: "my friend thabo likes to play chess on weekends."', answerRegex:/My friend Thabo likes to play chess on weekends\./i},
        {type:'text', q:'Write a sentence using the word "adventure".', answerRegex:/adventur/i},
        {type:'mcq', q:'Choose correctly punctuated sentence', choices:['Where are you, going?','Where are you going?','Where, are you going.','Where are you going'], answer:1},
        {type:'text', q:'Analogy: Write is to pen as draw is to ____', answerRegex:/.{2,}/},
        {type:'text', q:'Write three sentences that form a short story (teacher review).'},
        {type:'click', q:'Circle the word that does not fit: run jump fly color', choices:['run','jump','fly','color'], answer:3},
        {type:'text', q:'Rewrite "The dog barked." to be more descriptive', answerRegex:/.{5,}/},
        {type:'text', q:'Correct the mistake: "She dont like apples."', answerRegex:/She doesn't like apples|She does not like apples/i},
        {type:'text', q:'Write sentence that uses comma and period correctly', answerRegex:/,.*\./},
        {type:'mcq', q:'What is wrong with "Him is my best friend."', choices:['Him','is','my','best friend'], answer:0},
        {type:'mcq', q:'Choose correct: "They _______ going to the park."', choices:['is','was','are','were'], answer:2},
        {type:'text', q:'Rearrange: "cake / birthday / made / mom / a / my"', answerRegex:/My mom made a birthday cake|mom made a birthday cake/i},
        {type:'text', q:'Describe morning at your school in five sentences (teacher review).'},
        {type:'text', q:'One-sentence summary of favorite movie (teacher review).'}
      ]},
    { id:'i-dyscalculia', title:'Dyscalculia — Intermediate (15 Q)', domain:'dyscalculia', items:[
        {type:'text', q:'45 + 36 = ?', answerRegex:/81/},
        {type:'text', q:'92 − 58 = ?', answerRegex:/34/},
        {type:'text', q:'8 × 7 = ?', answerRegex:/56/},
        {type:'text', q:'63 ÷ 9 = ?', answerRegex:/7/},
        {type:'mcq', q:'Which number is even?', choices:['27','35','40','51'], answer:2},
        {type:'text', q:'What is half of 48?', answerRegex:/24/},
        {type:'text', q:'Write number two thousand and six in digits', answerRegex:/2006/},
        {type:'mcq', q:'Which fraction equals one-half?', choices:['2/4','3/5','4/6','1/3'], answer:0},
        {type:'text', q:'Arrange 57,19,84,72 in descending order', answerRegex:/84.*72.*57.*19/},
        {type:'text', q:'A pizza cut into 8, you eat 3. What fraction left?', answerRegex:/(5\/8|0\.625)/},
        {type:'text', q:'Find missing number: 5,10,15,__ ,25', answerRegex:/20/},
        {type:'text', q:'Perimeter of square side 6 cm', answerRegex:/24/},
        {type:'text', q:'3 pencils for R9. How much is 1 pencil?', answerRegex:/3/},
        {type:'text', q:'Convert 2 hours to minutes', answerRegex:/120/},
        {type:'mcq', q:'Which measurement is longest?', choices:['1 km','800 m','1200 m','900 m'], answer:2}
      ]},
    { id:'i-adhd', title:'ADHD — Intermediate (15 Q)', domain:'adhd', items:[
        {type:'action', q:'Write your name, draw a triangle, then underline it (teacher review).'},
        {type:'click', q:'Which word is spelled differently? jump bump hump jump', choices:['1','2','3','4'], answer:2},
        {type:'mcq', q:'What colour is the grass?', choices:['Blue','Green','Yellow','Red'], answer:1},
        {type:'click', q:'Circle the third word: sun moon star cloud', choices:['sun','moon','star','cloud'], answer:2},
        {type:'action', q:'Write number after 9 then draw a star beside it (teacher).'},
        {type:'mcq', q:'Which sentence is asking a question?', choices:['She is walking to school.','Are you coming with us?','We will eat later.','The dog barked.'], answer:1},
        {type:'text', q:'Who gave Lebo food? (short answer)', answerRegex:/friend/i},
        {type:'click', q:'Copy pattern (choose): 🔴🔵🔴🔵🔴🔵', choices:['RBRBRB','RBRRBR','RBBRBR'], answer:0},
        {type:'action', q:'If teacher says "Clap twice, then write DOG", do both steps (teacher review).'},
        {type:'click', q:'Find the sentence that matches cat sleeping picture', choices:['The dog is barking.','The cat is sleeping.','The bird is flying.','The boy is running.'], answer:1},
        {type:'mcq', q:'Which comes first: pencil eraser book ruler?', choices:['pencil','eraser','book','ruler'], answer:0},
        {type:'click', q:'Circle words starting with B', choices:['ball','cat','bat','dog','bag'], answer:[0,2,4]},
        {type:'text', q:'Write opposite of up', answerRegex:/down/i},
        {type:'action', q:'Draw a square then color two sides (teacher).'},
        {type:'mcq', q:'Which sentence matches: "The girl with the red hat is singing."', choices:['The red hat is on a girl.','The singing girl wears a red hat.','The girl lost her hat.','The red girl is singing.'], answer:1}
      ]},
    { id:'i-memory', title:'Memory & Processing — Intermediate (15 Q)', domain:'memory', items:[
        {type:'audio', q:'Listen: "tree, apple, bike, fish" — type after 20s', answerRegex:/tree.*apple.*bike.*fish/i},
        {type:'text', q:'Sipho forgot umbrella and it started to rain — what happened?', answerRegex:/it started to rain|rain/i},
        {type:'mcq', q:'Which number did you see earlier: 27,32,45?', choices:['27','32','45'], answer:0},
        {type:'text', q:'Which pet is in the middle: cat, bird, rabbit?', answerRegex:/bird/i},
        {type:'text', q:'Pattern 2,4,8,16,___', answerRegex:/32/},
        {type:'text', q:'What did teacher close before the storm?', answerRegex:/window/i},
        {type:'action', q:'Stand up, touch your head, spin once (teacher).'},
        {type:'mcq', q:'Which day comes after Thursday?', choices:['Friday','Wednesday','Saturday','Tuesday'], answer:0},
        {type:'text', q:'What is last word in sentence "My brother runs faster than me."', answerRegex:/me/i},
        {type:'click', q:'If list car, bus, bike — which is different?', choices:['car','bus','bike'], answer:0},
        {type:'text', q:'After a week what happened to seeds?', answerRegex:/began to grow|grow/i},
        {type:'text', q:'Repeat this number backward 9-5-2', answerRegex:/2.*5.*9|2 5 9/},
        {type:'click', q:'Which shape seen first: circle triangle square', choices:['circle','triangle','square'], answer:0},
        {type:'mcq', q:'When did the lion wake up?', choices:['day','night','morning','afternoon'], answer:1},
        {type:'action', q:'Write 10, erase it, then draw a small heart (teacher).'}
      ]}
  ]
};

// ------- App logic -------
document.addEventListener('DOMContentLoaded', () => {
  const testsList = document.getElementById('testsList');
  const phaseBtns = document.querySelectorAll('.phase-btn');
  let activePhase = 'foundation';
  let activeTest = null;
  let currentIdx = 0;
  let answers = []; // {qIndex, value, correct?, timeSpent}
  let qStartTime = null;
  let questionTimer = null;

  // render tests for phase
  function renderTests(phase){
    testsList.innerHTML = '';
    const arr = TESTS[phase];
    arr.forEach(t => {
      const card = document.createElement('div');
      card.className = 'test-card';
      card.innerHTML = `<div><h3>${t.title}</h3><p class="muted">Domain: ${t.domain}</p></div>
        <div class="card-actions">
          <button class="btn outline start-test" data-id="${t.id}">Start Test</button>
          <button class="btn small" data-info="${t.id}">Info</button>
        </div>`;
      testsList.appendChild(card);
    });
  }

  // initialize
  renderTests(activePhase);

  // phase switch
  phaseBtns.forEach(b => b.addEventListener('click', () => {
    phaseBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    activePhase = b.getAttribute('data-phase');
    renderTests(activePhase);
  }));

  // delegate start test
  testsList.addEventListener('click', (e) => {
    const start = e.target.closest('.start-test');
    if(!start) return;
    const id = start.getAttribute('data-id');
    startTestById(id);
  });

  // start test
  function startTestById(id){
    const t = TESTS[activePhase].find(x => x.id === id);
    if(!t) return;
    activeTest = t;
    currentIdx = 0;
    answers = [];
    showModal();
    renderQuestion();
  }

  // modal elements
  const testModal = document.getElementById('testModal');
  const testTitle = document.getElementById('testTitle');
  const testDomain = document.getElementById('testDomain');
  const closeTest = document.getElementById('closeTest');
  const questionForm = document.getElementById('questionForm');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');

  closeTest.addEventListener('click', () => {
    if(confirm('Exit test? Progress will be lost.')) closeModal();
  });

  prevBtn.addEventListener('click', () => {
    saveCurrentAnswer();
    if(currentIdx>0) currentIdx--;
    renderQuestion();
  });

  nextBtn.addEventListener('click', () => {
    if(!saveCurrentAnswer()) return;
    if(currentIdx < activeTest.items.length - 1){
      currentIdx++;
      renderQuestion();
    } else {
      // finish
      finishTest();
    }
  });

  function showModal(){
    testModal.style.display = 'flex';
    testModal.setAttribute('aria-hidden','false');
    testTitle.textContent = activeTest.title;
    testDomain.textContent = activeTest.domain;
    updateProgress();
  }

  function closeModal(){
    testModal.style.display = 'none';
    testModal.setAttribute('aria-hidden','true');
    questionForm.innerHTML = '';
    document.getElementById('resultsSection').hidden = true;
  }

  // render question
  function renderQuestion(){
    clearTimer();
    const item = activeTest.items[currentIdx];
    questionForm.innerHTML = '';
    const qTitle = document.createElement('div');
    qTitle.className = 'q-title';
    qTitle.textContent = `Q${currentIdx+1}. ${item.q || item.q2}`;
    questionForm.appendChild(qTitle);

    const qBody = document.createElement('div');
    qBody.className = 'q-body';
    if(item.type === 'mcq' || item.type === 'passage'){
      const ol = document.createElement('div');
      ol.className = 'option-list';
      item.choices.forEach((c,i)=>{
        const op = document.createElement('div');
        op.className = 'option';
        op.setAttribute('data-index', i);
        op.textContent = c;
        op.addEventListener('click', () => {
          ol.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));
          op.classList.add('selected');
        });
        ol.appendChild(op);
      });
      questionForm.appendChild(ol);
    } else if(item.type === 'click'){
      if(item.choices && item.choices.length){
        const ol = document.createElement('div'); ol.className='option-list';
        item.choices.forEach((c,i)=>{
          const op = document.createElement('div'); op.className='option';
          op.textContent = c;
          op.addEventListener('click',()=> {
            ol.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));
            op.classList.add('selected');
          });
          ol.setAttribute('data-choices','true');
          ol.appendChild(op);
        });
        questionForm.appendChild(ol);
      } else {
        // fallback text input
        const inp = document.createElement('input'); inp.type='text'; inp.className='input'; inp.placeholder='Type answer';
        questionForm.appendChild(inp);
      }
    } else if(item.type === 'text' || item.type === 'audio' || item.type === 'visual'){
      const inp = document.createElement('input'); inp.type='text'; inp.className='input'; inp.placeholder='Type your answer';
      questionForm.appendChild(inp);
    } else if(item.type === 'teacher'){
      const ta = document.createElement('textarea'); ta.className='input'; ta.rows=4; ta.placeholder='Teacher / Student response (text field for review)';
      questionForm.appendChild(ta);
    } else if(item.type === 'action'){
      const info = document.createElement('div'); info.className='muted'; info.textContent = 'This item requires following an instruction. Click Done when completed (teacher may verify).';
      questionForm.appendChild(info);
      const done = document.createElement('button'); done.type='button'; done.className='btn filled'; done.textContent='Done';
      done.addEventListener('click', ()=> {
        // mark as done input
        questionForm.querySelectorAll('.done-mark').forEach(x=>x.remove());
        const mark = document.createElement('div'); mark.className='done-mark muted small'; mark.textContent='Marked done';
        questionForm.appendChild(mark);
      });
      questionForm.appendChild(done);
    }

    // restore previous answer if exists
    const prev = answers.find(a=>a.qIndex===currentIdx);
    if(prev){
      // set selected or value
      const selected = questionForm.querySelectorAll('.option');
      if(selected && selected.length){
        selected.forEach(s=>{
          if(s.getAttribute('data-index') && Number(s.getAttribute('data-index')) === prev.value) s.classList.add('selected');
          else if(s.textContent === prev.value) s.classList.add('selected');
        });
      }
      const input = questionForm.querySelector('input, textarea');
      if(input) input.value = prev.value || '';
    }

    // set timer
    qStartTime = Date.now();
    questionTimer = setInterval(()=>{}, 1000);

    updateProgress();
    // scroll modal top
    testModal.scrollTop = 0;
  }

  function saveCurrentAnswer(){
    clearTimer();
    const item = activeTest.items[currentIdx];
    const entry = { qIndex: currentIdx, domain: activeTest.domain, type: item.type, timeSpent: Math.round((Date.now() - qStartTime)/1000) };
    let value = null;
    // get selected option
    const sel = questionForm.querySelector('.option.selected');
    if(sel){
      const idx = sel.getAttribute('data-index');
      value = (idx !== null) ? (isNaN(idx) ? sel.textContent : Number(idx)) : sel.textContent;
    } else {
      const input = questionForm.querySelector('input, textarea');
      if(input) value = input.value.trim();
      else {
        // action done mark?
        const done = questionForm.querySelector('.done-mark');
        if(done) value = 'DONE';
      }
    }

    entry.value = value;
    // grade if possible
    entry.correct = null;
    if(item.type === 'mcq' || item.type === 'passage'){
      entry.correct = (typeof value === 'number' && value === item.answer);
    } else if(item.type === 'click'){
      if(Array.isArray(item.answer)){
        // multi-answer
        if(Array.isArray(value)) entry.correct = arraysEqual(value,item.answer);
        else entry.correct = (typeof value === 'number' && value === item.answer);
      } else {
        if(item.choices && item.choices.length && typeof value === 'string'){
          // compare by text
          entry.correct = (value.toLowerCase() === item.choices[item.answer].toLowerCase()) || (Number(value) === item.answer);
        } else if(item.answer !== undefined){
          // text match to regex if provided
          entry.correct = true; // fallback
        }
      }
    } else if(item.type === 'text' || item.type === 'audio' || item.type === 'visual'){
      if(item.answerRegex){
        try{
          entry.correct = item.answerRegex.test(String(value || ''));
        } catch(e){ entry.correct = null; }
      } else {
        entry.correct = (String(value || '').length > 0);
      }
    } else if(item.type === 'teacher' || item.type === 'action'){
      entry.correct = null; // teacher/action types not auto-graded
    }

    // replace or push
    const prevIdx = answers.findIndex(a=>a.qIndex===currentIdx);
    if(prevIdx >= 0) answers[prevIdx] = entry;
    else answers.push(entry);
    updateProgress();

    return true;
  }

  function clearTimer(){ if(questionTimer) clearInterval(questionTimer); questionTimer=null; qStartTime=null; }

  function updateProgress(){
    const total = activeTest.items.length;
    const answered = answers.length;
    const pct = Math.round(( (answers.findAll?answers.findAll:answers).length / total) * 100) || Math.round((answers.length/total)*100);
    progressFill.style.width = pct + '%';
    progressText.textContent = `${Math.min(answers.length,total)} / ${total}`;
  }

  // polyfill: answers.findAll not present, replace with length usage
  // finish
  function finishTest(){
    // ensure last saved
    saveCurrentAnswer();
    closeModal();
    // compute report
    const report = computeReport(activeTest, answers);
    showReport(report);
  }

  // show report
  function showReport(report){
    document.getElementById('resultsSection').hidden = false;
    const area = document.getElementById('reportArea');
    area.innerHTML = '';
    const title = document.createElement('h3'); title.textContent = `${activeTest.title} — Report`;
    area.appendChild(title);

    // summary
    const sum = document.createElement('div'); sum.className='report';
    // per-domain card
    const domainCard = document.createElement('div'); domainCard.className='card';
    domainCard.innerHTML = `<h4>Diagnosis Summary</h4>
      <p><strong>Primary domain:</strong> ${activeTest.domain}</p>
      <p><strong>Risk:</strong> ${report.riskLabel} (${report.riskScore.toFixed(2)})</p>
      <p><strong>Suggested diagnosis:</strong> ${report.diagnoses.join(', ') || 'No clear diagnosis; monitor & teacher review.'}</p>
      <p class="muted small">${report.recommendation}</p>`;
    sum.appendChild(domainCard);

    // scores breakdown
    const scoreCard = document.createElement('div'); scoreCard.className='card';
    let breakdownHTML = '<h4>Domain Signals</h4>';
    for(const k in report.domainScores){
      const s = report.domainScores[k];
      breakdownHTML += `<div><strong>${k}</strong>: errorRate ${(s.errorRate*100).toFixed(0)}% — ${s.label}</div>`;
    }
    scoreCard.innerHTML = breakdownHTML;
    sum.appendChild(scoreCard);

    // teacher flags
    const teacherCard = document.createElement('div'); teacherCard.className='card';
    teacherCard.innerHTML = `<h4>Teacher Review Flags</h4><div id="teacherFlags">${report.teacherFlags.length ? report.teacherFlags.map(t=>`<div>- ${t}</div>`).join('') : '<div class="muted">No teacher flags automatically recorded. Manual review recommended for handwriting/drawing items.</div>'}</div>`;
    sum.appendChild(teacherCard);

    area.appendChild(sum);

    // full answers log (collapsible)
    const log = document.createElement('details'); log.open = false; log.style.marginTop='12px';
    log.innerHTML = `<summary>Show detailed answers & auto-grading</summary><pre style="white-space:pre-wrap">${JSON.stringify(report, null, 2)}</pre>`;
    area.appendChild(log);

    // save result to localStorage quick
    const saved = JSON.parse(localStorage.getItem('educrate_reports' )||'[]');
    saved.push({ id: activeTest.id, title: activeTest.title, date: new Date().toISOString(), report});
    localStorage.setItem('educrate_reports', JSON.stringify(saved));
  }

  // computeReport simple diagnosis engine
  function computeReport(test, answersArr){
    // initialize domain buckets
    const domainTotals = {};
    const domainIncorrects = {};
    const domainAutoTotal = {};
    const teacherFlags = [];

    test.items.forEach((it, idx) => {
      const dom = test.domain;
      domainTotals[dom] = domainTotals[dom] || 0;
    });

    // tally
    answersArr.forEach(a => {
      const it = test.items[a.qIndex];
      const dom = test.domain;
      domainAutoTotal[dom] = domainAutoTotal[dom] || 0;
      domainIncorrects[dom] = domainIncorrects[dom] || 0;

      if(it.type === 'teacher' || it.type === 'action'){
        teacherFlags.push(`${it.q} — requires teacher review.`);
      } else {
        // auto-graded
        domainAutoTotal[dom] += 1;
        if(a.correct === false || a.correct === null) domainIncorrects[dom] += 1;
      }

      // ADHD signal: long times
      if(it.type === 'mcq' || it.type === 'text'){
        if(a.timeSpent && a.timeSpent > 30 && test.domain === 'adhd') {
          domainIncorrects[dom] += 1; // penalize for inconsistent response speed
        }
      }
    });

    const domainScores = {};
    for(const dom in domainAutoTotal){
      const total = domainAutoTotal[dom];
      const incorrect = domainIncorrects[dom] || 0;
      const errorRate = total ? incorrect/total : 0;
      let label='Low';
      if(errorRate > 0.4) label='High';
      else if(errorRate > 0.18) label='Moderate';
      domainScores[dom] = { total, incorrect, errorRate, label };
    }

    // primary risk: take the domain error rate
    const mainDom = test.domain;
    const mainScore = domainScores[mainDom] ? domainScores[mainDom].errorRate : 0;
    let riskLabel='Low Risk';
    if(mainScore > 0.4) riskLabel='High Risk';
    else if(mainScore > 0.18) riskLabel='Moderate Risk';

    // diagnoses heuristic: if High in domain -> suggest possible disorder
    const diagnoses = [];
    if(domainScores[mainDom]){
      const lab = domainScores[mainDom].label;
      if(lab === 'High') diagnoses.push(`Likely ${capitalize(mainDom)}`);
      else if(lab === 'Moderate') diagnoses.push(`Possible ${capitalize(mainDom)} — recommend teacher verification`);
    }

    // also check cross-domain issues (if multiple domains moderate/high)
    const cross = Object.keys(domainScores).filter(k => domainScores[k].label !== 'Low');
    if(cross.length >= 2) diagnoses.push('Cross-domain indicators — consider comprehensive evaluation (High priority)');

    // recommendation
    let recommendation = 'No further action required beyond usual monitoring.';
    if(riskLabel === 'Moderate Risk') recommendation = 'Recommend teacher verification and targeted interventions; monitor progress.';
    if(riskLabel === 'High Risk') recommendation = 'Recommend immediate teacher checklist, specialist referral, and PLP activation.';

    return {
      id: test.id,
      title: test.title,
      date: new Date().toISOString(),
      riskScore: mainScore,
      riskLabel,
      diagnoses,
      recommendation,
      domainScores,
      teacherFlags,
      answers: answersArr
    };
  }

  function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

  // utility
  function arraysEqual(a,b){ if(!Array.isArray(a)||!Array.isArray(b)) return false; if(a.length!==b.length) return false; for(let i=0;i<a.length;i++){ if(a[i]!==b[i]) return false;} return true; }

  // Toto widget simple
  const totoOpen = document.getElementById('totoOpen');
  const totoChat = document.getElementById('totoChat');
  const totoClose = document.getElementById('totoClose');
  const totoBody = document.getElementById('totoBody');
  const totoInput = document.getElementById('totoInput');

  totoOpen.addEventListener('click', ()=> {
    totoOpen.style.display='none';
    totoChat.hidden = false;
  });
  totoClose.addEventListener('click', ()=> {
    totoChat.hidden = true;
    totoOpen.style.display='block';
  });
  function appendToto(msg, who='bot'){
    const el = document.createElement('div');
    el.className = 'toto-msg ' + (who==='bot'?'bot':'user');
    el.textContent = msg;
    totoBody.appendChild(el);
    totoBody.scrollTop = totoBody.scrollHeight;
  }
  totoInput.addEventListener('keypress', (e) => {
    if(e.key !== 'Enter') return;
    const v = totoInput.value.trim();
    if(!v) return;
    appendToto(v,'user');
    totoInput.value='';
    const q = v.toLowerCase();
    setTimeout(()=> {
      if(q.includes('scoring') || q.includes('diagnos')) appendToto('Diagnosis is calculated from error rates per domain. High error rate -> High Risk. Teacher-review items are flagged separately.');
      else if(q.includes('help') || q.includes('start')) appendToto('Select a phase and click Start Test on a domain to begin. Stay on task; Toto will explain questions if needed.');
      else appendToto('Nice question — try asking "explain dyslexia signals" or "how is adhd detected"');
    },500);
  });

  // initial close modal
  testModal.style.display = 'none';
  // expose for debug
  window._EDU = { TESTS, startTestById };
});
