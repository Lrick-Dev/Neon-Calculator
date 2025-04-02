import React, { useEffect, useState } from 'react';
import './index.css';


const App = () => {
   const [input, setInput] = useState("");


   return (
      <div>
         <LogicCalculator
            input={input} setInput={setInput} />
      </div>
   );
};

const LogicCalculator = ({ input, setInput }) => {


   // Essa função pega os valores atribuidos aos botões e passa para o input acima. //  
   const handleClick = (e) => {
      console.log("Botão clicado:", e.target); // Verificando valores indefinidos.FFFFF
      console.log("Valor do botão:", e.target.value);

      if (!e.target.value) {
         console.error("Erro: o botão clicado não tem um value definido!");
         return;
      }
      const value = e.target.value;
      setInput((p) => String(p) + String(value));
      console.log(value);  // Aquié so pra verificar o valor.//
   };


   // Limpa tudo.//
   const clearDisplay = () => {
      setInput('');
   };

   // Apaga um por vez//    
   const clean = (p) => {
      setInput((p) => String(p).slice(0, -1)); // Também posso substituir (prev) por (p)
   }

   // aqui é pra verificar o valor de entrada no input
   const handleChange = (e) => {
      const value = e.target.value;
      if (/^[0-9+\-*/.]*$/.test(value)) {
         setInput(value);
      }
   }



   // Função que chama o cálculo 
   const calculate = (e) => {
      if (/[\+\*/]{2,}/.test(input)) { // Verifica se há dois operadores seguidos
         alert("Erro: Expressão inválida! Verifique sua digitação.");
         return;

      }
      const value = e.target.value;
      setInput((p) => eval(p));

   }


   const key = (e) => {
      const keyPressed = e.key;
      if (!isNaN(keyPressed)) {

         setInput(prev => prev + keyPressed);
      } else if (keyPressed === 'Enter') {
         calculate(e);

      } else if (keyPressed === 'Backspace') {
         clean();

      } else if (keyPressed === 'Escape') {
         clearDisplay();

      } else if ((keyPressed === '+' || keyPressed === '-' || keyPressed === '*' || keyPressed === '/')) {
         setInput(prev => prev + keyPressed);

      } else if (keyPressed === '.') {
         setInput(prev => prev + keyPressed);

      }
   }
   useEffect(() => {
      window.addEventListener('keydown', key);

      return () => {
         window.removeEventListener('keydown', key);
      }
   })




   return (
      <body>

         <div className="container">
            <input
               onChange={handleChange}
               type="text"
               value={input}
               id="result"
               readOnly
               placeholder="0" />
            <table>
               <tr>
                  <td colSpan={2} ><button onClick={clean} id="clean" >←</button></td>
                  <td colSpan={2} ><button onClick={clearDisplay} id="allclean" >Ac</button></td>

               </tr>
               <tr>
                  <td><button onClick={handleClick} value={"7"}>7</button></td>
                  <td><button onClick={handleClick} value={"8"}>8</button></td>
                  <td><button onClick={handleClick} value={"9"}>9</button></td>
                  <td><button onClick={handleClick} value={"+"} >+</button></td>
               </tr>
               <tr>
                  <td><button onClick={handleClick} value={"4"}>4</button></td>
                  <td><button onClick={handleClick} value={"5"}>5</button></td>
                  <td><button onClick={handleClick} value={"6"}>6</button></td>
                  <td><button onClick={handleClick} value={"-"}>-</button></td>
               </tr>
               <tr>
                  <td><button onClick={handleClick} value={"1"}>1</button></td>
                  <td><button onClick={handleClick} value={"2"}>2</button></td>
                  <td><button onClick={handleClick} value={"3"}>3</button></td>
                  <td><button onClick={handleClick} value={"*"}>*</button></td>
               </tr>
               <tr>
                  <td><button onClick={handleClick} value={"0"}>0</button></td>
                  <td><button onClick={handleClick} value={"."}>.</button></td>
                  <td><button onClick={calculate}>=</button></td>
                  <td><button onClick={handleClick} value={"/"}>÷</button></td>
               </tr>
            </table>

            <div class="lines">
               <div class="line"></div>
               <div class="line"></div>
               <div class="line"></div>
               <div class="line"></div>

            </div>
         </div>
      </body>
   );
}



export default App;
