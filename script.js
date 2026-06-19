const bicto = new XMLHttpRequest();
bicto.open("GET", "https://raw.githubusercontent.com/DigitalRedPanda/drple/main/new%20english%20words.txt");
bicto.responseType = "text";
let s;
let morbiddle;
let dictio;
let deftio;
let fandy = false;
bicto.send(null);
bicto.onreadystatechange = () => {
  if (bicto.readyState === bicto.DONE && bicto.status === 200) {

    dictio = bicto.responseText.split("\n");
    temp = dictio[Math.floor(Math.random() * dictio.length)].split(':');
    morbiddle = temp[0].toUpperCase();
    deftio = temp[1].toUpperCase();
    // morbiddle = "APPLE"
    console.log(morbiddle);
    dictio = null;
    s =  document.getElementById("grid");
    s.style = `grid-template-columns: ${'1fr '.repeat(morbiddle.length - 1)} 1fr;`;

    for(let i = 0; i < 6; i++) {
      for (const char of morbiddle) {
        const delulu = document.createElement("div");
        delulu.setAttribute('class',"letterbox");
        // const tftoty = document.createElement("input");
        // tftoty.setAttribute('type', 'text');
        // tftoty.setAttribute('id', 'letters');
        // delulu.appendChild(tftoty);
        s.appendChild(delulu);
      }
    }
  }
}

let voidable = 0;
let tmtomy = "";
let rorory = 0;
window.addEventListener('keydown', async (e) => {

  if ((e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z")) {
    if(e.key.length === 1) {
      if(tmtomy.length < morbiddle.length) {
        console.log((tmtomy.length) + morbiddle.length * rorory);
        tmtomy += e.key.toUpperCase();

        s.childNodes[tmtomy.length + morbiddle.length * rorory].textContent = e.key.toUpperCase();
      }

    } else {
      switch(e.key) {
        case "Delete":
        case "Backspace":
          if (tmtomy.length > 0) {
            s.childNodes[tmtomy.length + morbiddle.length * rorory].textContent = "";
            tmtomy = tmtomy.substring(0, tmtomy.length - 1);
          }
          break;
        case "Enter":

          if(tmtomy.length === morbiddle.length) {
            const resros = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${tmtomy}`);
            if(resros.status === 404) {
              for(let i = 0; i < morbiddle.length; i++) {
                //s.childNodes[i].style = "background-color: darkred;\nborder: 2px solid red";
                s.childNodes[(i + 1) + morbiddle.length * rorory].classList.add("wrong");
                setTimeout(() => {
                  s.childNodes[(i + 1) + morbiddle.length * rorory].classList.remove("wrong");
                }, 200);
              }

            } else {
              for(let i = 0; i < tmtomy.length; i++) {
                if(tmtomy[i] === morbiddle[i]) {
                  console.log(tmtomy[i] + " = " + morbiddle[i]);
                  s.childNodes[(i + 1) + morbiddle.length * rorory].classList.add("correct");
                  //           break;
                  voidable |=  1  << i;
                  //break;
                }// else {
                //
                //   //s.childNodes[(i + 1) + morbiddle.length * rorory].classList.add("maybe");
                // }
              }
              //if(tmtomy[i] === morbiddle[j]) {
              //console.log("okay...")
              //if(i === j) {
              //console.log("%c" + tmtomy[i] + "%c", "color:green;", "color:white;");
              //continue;
              //}
              //console.log("%c" + tmtomy[i] + "%c", "color:yellow;", "color:white;");
              //} else {
              //console.log("%c" + tmtomy[i] + "%c", "color:red;", "color:white;");
              //}  


              for(let i = 0; i < tmtomy.length; i++) {
                const idx = (i+1) + morbiddle.length * rorory;
                if(s.childNodes[idx].classList.contains("correct")) continue;
                for(let j = 0; j < morbiddle.length; j++) {
                  if(!(voidable & (1 << j)) && tmtomy[i] === morbiddle[j]) {
                    s.childNodes[idx].classList.add("maybe");
                    voidable |=  1 << j; 
                  }
                }
              }
              rorory++;
              fandy = morbiddle == tmtomy;
              if(rorory === 6 || fandy) {
                sumus(fandy);
                // setTimeout(() => {
                //   location.reload()
                //
                // }, 5000);
              };
              voidable &= 0;
              tmtomy = "";
            }
          }
        default: break;
      }
    }

  }
});

function close() {
  const sumus = document.getElementById('summary');
  document.getElementById("container").style.opacity = '100%';
  document.body.removeChild(sumus);
}

function refresh() {
  location.reload();
}


function sumus(fandy) {
  let def = deftio.toLowerCase();
  let didle = morbiddle.toLowerCase();
  let gsm;
  let ma = document.createElement('div');
  ma.setAttribute("class","message");
  if(!fandy) {
    gsm = `<div style="color: red; font-size: 40px;">WRONG</div><br><div>You gotta drp harder, you got it</div><br></div>${didle}: ${def}</div>`
  } else {
    gsm = `<div style="color: green; font-size: 40px;">CORRECT</div><br><div>You drp well, you did me honor</div><br><div>Fluent sesquipedalian</div><br><div>${didle}: ${def}</div><br>`
  }
  let bt = document.createElement('div');
  bt.onclick = close;
  bt.classList.add("closing")
  let int = document.createElement('img');
  int.src = "close.svg";
  int.classList.add("close-button");

  let cnt = document.createElement('div');
  cnt.classList.add("button-list");
  let inter = document.createElement('img');
  inter.src = "refresh.svg";
  inter.classList.add("close-button");
  let btRe = document.createElement('div');
  btRe.onclick = refresh;
  btRe.classList.add("closing")
  btRe.appendChild(inter);
  let sumus = document.createElement('div');
  sumus.id = 'summary';
  ma.innerHTML = `${gsm}`
  cnt.append(ma, bt, btRe);
  sumus.appendChild(cnt)
  document.body.appendChild(sumus);
  document.getElementById("container").style.opacity = '40%'
}


