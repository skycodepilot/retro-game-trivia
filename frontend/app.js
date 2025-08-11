// app.js - simple front-end to call the Trivia API and render a quiz

// Replace this BASE URL with your deployed API URL.
const API_BASE_URL = "https://opentdb.com/api.php"; // e.g. https://retro-trivia.onrender.com

const fetchButton = document.getElementById('fetchBtn');
const quizSection = document.getElementById('quizSection');
const countInput = document.getElementById('countInput');
const difficultySelect = document.getElementById('difficultySelect');

// utility: create an element with optional class and text
function el(tag, className, text){
  const node = document.createElement(tag);
  if(className) node.className = className;
  if(text !== undefined) node.textContent = text;
  return node;
}

// fetch trivia data from your API
async function fetchTrivia(count, difficulty){
  const params = new URLSearchParams();
  params.set('count', String(count));
  if(difficulty) params.set('difficulty', difficulty);

  const url = `${API_BASE_URL}/trivia?${params.toString()}`;
  const resp = await fetch(url);
  if(!resp.ok) throw new Error('Network response was not ok');
  return await resp.json();
}

// render the questions
function renderQuiz(questions){
  quizSection.innerHTML = '';
  questions.forEach((q, qIndex) => {
    const card = el('div','card');
    const questionText = el('div','question', `${qIndex + 1}. ${q.question}`);
    card.appendChild(questionText);

    const optionsWrap = el('div','options');

    q.options.forEach((opt) => {
      const btn = el('button','optionBtn', opt);
      btn.addEventListener('click', () => {
        // clear previous selections in this card
        Array.from(optionsWrap.children).forEach(c => c.classList.remove('selected'));
        btn.classList.add('selected');
      });
      optionsWrap.appendChild(btn);
    });

    const revealBtn = el('button','optionBtn','Reveal Answer');
    revealBtn.style.marginLeft = '8px';
    revealBtn.addEventListener('click', () => {
      // mark correct and wrong
      Array.from(optionsWrap.children).forEach(c => {
        c.classList.remove('correct','wrong');
        if(c.textContent === q.answer){
          c.classList.add('correct');
        } else if(c.classList.contains('selected')){
          c.classList.add('wrong');
        }
      });
    });

    card.appendChild(optionsWrap);
    card.appendChild(el('div','',''));
    card.appendChild(revealBtn);

    quizSection.appendChild(card);
  });
}

// wire up the main button
fetchButton.addEventListener('click', async () => {
  const count = Number(countInput.value) || 5;
  const difficulty = difficultySelect.value || '';

  fetchButton.disabled = true;
  fetchButton.textContent = 'Loading...';
  try{
    const data = await fetchTrivia(count, difficulty);
    if(data.error){
      quizSection.innerHTML = `<div class="card">Error: ${data.error}</div>`;
    } else {
      renderQuiz(data.questions);
    }
  } catch(err){
    quizSection.innerHTML = `<div class="card">Request failed: ${err.message}</div>`;
  } finally{
    fetchButton.disabled = false;
    fetchButton.textContent = 'Fetch Trivia';
  }
});