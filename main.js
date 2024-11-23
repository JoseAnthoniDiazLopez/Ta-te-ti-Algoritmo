
let estadoInicial=['','','','','','','','','']
let turno='0'




function turnoC() {
  if (turno=='x') {
    turno='0'
  }else{
    turno='x'
  }
}
let turnos=0




function push(n) {
  if (ganad(estadoInicial)==null) {
  if (estadoInicial[n]=='') {
  estadoInicial[n]=turno
  let casilla=document.querySelector('#a'+n)
  casilla.innerHTML=turno
  turnos++
  turnoC()
  if (turno=="x") {
    Ia()
  }
  }
let questionGana=ganad(estadoInicial,1)
setTimeout(()=>{
switch (questionGana) {
  case "x":
    msgbox("Perdiste","Gana la ia")
    break;
  case '0':
    msgbox("Ganaste","pierde la ia")
    break;
  case "emp":
    msgbox("Empate","Jugaste bien")
    break;
}
  },200)
}
}

function msgbox(title,parrafo) {
  /*
  let pantLoding=document.getElementById("msgCont").style
  document.getElementById("msgencabezado").innerHTML=title
  document.getElementById("msgtext").innerHTML=parrafo
    pantLoding.display="grid"
    pantLoding.placeItems="center"
    */
    alert(title)
}



function play(p) {
  if (p) {
    let pantLoding=document.getElementById("msgCont").style
    pantLoding.display="none"
  }
estadoInicial=['','','','','','','','',''] 
for (let i = 0; i < 9; i++){
let casilla=document.querySelector('#a'+i)
casilla.innerHTML=''
casilla.style.background='transparent'
}
if (turnos%2==0){
  turnoC()
}
turnos=0
if (turno=="x") {
  Ia()
}
}


function ganad(estado,o) {
  let empate="emp"
  let a0 = estado[0]
  let a1 = estado[1]
  let a2 = estado[2]
  let a3 = estado[3]
  let a4 = estado[4]
  let a5 = estado[5]
  let a6 = estado[6]
  let a7 = estado[7]
  let a8 = estado[8]
  let ganadoras = [
    { data: a0 + a1 + a2, fuente: [0, 1, 2] },
    { data: a3 + a4 + a5, fuente: [3, 4, 5] },
    { data: a6 + a7 + a8, fuente: [6, 7, 8] },
    { data: a0 + a3 + a6, fuente: [0, 3, 6] },
    { data: a1 + a4 + a7, fuente: [1, 4, 7] },
    { data: a2 + a5 + a8, fuente: [2, 5, 8] },
    { data: a0 + a4 + a8, fuente: [0, 4, 8] },
    { data: a2 + a4 + a6, fuente: [2, 4, 6] },
      ]
let $x=ganadoras.findIndex((a) => a.data == 'xxx')
let $0=ganadoras.findIndex((a) => a.data == '000')

if ($x>=0) {
  if (o) {
    for (var i of ganadoras[$x].fuente) {
      document.querySelector('#a'+i).style.background='green'
        }
  }
 

  return 'x'
}else
if ($0>=0) {
  if (o) {
    for (var i of ganadoras[$0].fuente) {
      document.querySelector('#a' + i).style.background = 'blue'
    }
  }
 
  return '0'
}
else{
  for (let i = 0; i < estado.length; i++) {
    if (estado[i] == "") {
      empate=null
        break
    }
}
}

return empate
}                           


function Ia() {
  let pantLoding=document.getElementById("changeCont").style
  pantLoding.display="grid"
  pantLoding.placeItems="center"
  setTimeout(()=>{
  push(calcularPerdidas(estadoInicial,"0",0).casilla);
  pantLoding.display="none"
  },650)
}


function calcularPerdidas(estadoE, sigt, mayorValue) {
  let casilla = null
  let valor = null
  let turn
  if (sigt == "0") {
    turn = "x"
  } else {
    turn = "0"
  }

  for (let paso = 0; paso < 9; paso++) {
    let value;
    let estadoI = estadoE.slice()
    if (estadoI[paso] == "") {
      estadoI[paso] = turn
      calculo = analizarVal(estadoI, turn, mayorValue)
      value = calculo.valor
      if (mayorValue == 0) {
  console.log(valor,value,estadoI)
}
if (valor == null) {
  valor=value
  casilla=paso
}

      if (turn == "x") {
        if (valor < value) {
          valor = value
          casilla = paso
        }
      }
      if (turn == "0") {
        if (valor > value) {
          valor = value
          casilla = paso
        }
      }
     
    }
  }

  return { valor, casilla }
}


function analizarVal(estadoE, turn, mayorValue) {
  switch (ganad(estadoE)) {
    case "0":
      return { valor: mayorValue - 1 }
      break
    case "x":
      return { valor: mayorValue + 1 }
      break
    case "emp":
      return { valor: mayorValue }
      break
    default:
      return calcularPerdidas(estadoE, turn, mayorValue==0?mayorValue-1:mayorValue)
  }

}

