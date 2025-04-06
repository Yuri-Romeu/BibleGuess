const bibleText = document.getElementById('bible-text');
const submit = document.getElementById('submit');
const textUser = document.getElementById('user-text');

let dataBible = null;
window.onload = () => {
     randomVerse();
};

submit.addEventListener('click', () => {
     const livro = document.getElementById('livro');
     const cap = document.getElementById('cap');
     const verso = document.getElementById('verso');

     async function executarComIntervalo() {
          await verificarValor(livro, dataBible.verses[0].book_name);
          await verificarValor(cap, dataBible.verses[0].chapter);
          await verificarValor(verso, dataBible.verses[0].verse);

          if (
               livro.value == dataBible.verses[0].book_name &&
               cap.value == dataBible.verses[0].chapter &&
               verso.value == dataBible.verses[0].verse
          ) {
               alert('Parebens voce venceu');
               location.reload();
          }
     }
     userText(livro, cap, verso);
     executarComIntervalo();
});

async function randomVerse() {
     try {
          const response = await fetch('https://bible-api.com/data/web/random');

          if (!response.ok) {
               throw new Error(`erro ${response.status} : ${response.statustext}`);
          }

          const data = await response.json();
          randomPtBr(data.random_verse.book_id, data.random_verse.chapter, data.random_verse.verse);
     } catch (error) {
          (bibleText.innerHTML = ' erro ao buscar:'), error;
     }
}

async function randomPtBr(livro, cap, verse) {
     try {
          const response = await fetch(
               `https://bible-api.com/${livro} ${cap}:${verse}?translation=almeida`,
          );

          if (!response.ok) {
               throw new Error(`erro ${response.status} : ${response.statustext}`);
          }

          const data = await response.json();
          console.log(data);
          bibleText.innerHTML = data.text;
          dataBible = data;
     } catch (error) {
          (bibleText.innerHTML = ' erro ao buscar:'), error;
     }
}

function verificarValor(elemento, valorCorreto) {
     return new Promise(resolve => {
          elemento.style.backgroundColor = elemento.value == valorCorreto ? 'green' : 'red';
          setTimeout(resolve, 1200);
     });
}

async function userText(livro, cap, verso) {
     try {
          const response = await fetch(
               `https://bible-api.com/${livro.value} ${cap.value}:${verso.value}?translation=almeida`,
          );

          if (!response.ok) {
               textUser.innerHTML = ' erro ao buscar:';
          }

          const data = await response.json();
          textUser.style.display = 'block';
          textUser.innerHTML = `<p>"${data.text}" ${livro.value} ${cap.value}:${verso.value}</p>`;
     } catch (error) {
          (textUser.innerHTML = ' erro ao buscar:'), error;
     }
}
