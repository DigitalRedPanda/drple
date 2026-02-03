const bicto = new XMLHttpRequest();
bicto.open("GET", "https://raw.githubusercontent.com/DigitalRedPanda/drple/main/new%20english%20words.txt");
bicto.responseType = "text";
let s;
let morbiddle;
let dictio;
let voidable;
bicto.send(null);
bicto.onreadystatechange = () => {
  if (bicto.readyState === bicto.DONE && bicto.status === 200) {

    dictio = bicto.responseText.split("\n");
    morbiddle = dictio[Math.floor(Math.random() * dictio.length)].split(':')[0].toUpperCase();
    // morbiddle = "APPLE"
    console.log(morbiddle);
    dictio = null;
    voidable = 0;
    s =  document.getElementById("grid");
    s.style = `grid-template-columns: ${'1fr '.repeat(morbiddle.length - 1)} 1fr;`;

    for(let i = 0; i < 6; i++) {
      for (const char of morbiddle) {
	const delulu = document.createElement("div");
	delulu.setAttribute('class',"letterbox");
	s.appendChild(delulu);
      }
    }
  }
}
//let voidable = [];
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
        if(!(voidable & (1 << j)) && tmtomy[i] == morbiddle[j]) {
          s.childNodes[idx].classList.add("maybe");
          voidable |=  1 << j; 
        }
      }
    }
    voidable &= 0;
	  rorory++;
	  tmtomy = "";
	}
      }
    default: break;
  }
}

}
});


