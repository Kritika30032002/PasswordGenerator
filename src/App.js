// import logo from './logo.svg';
import './App.css';
import Checkbox from './components/Checkbox';
import { useState } from 'react';

function App(props) {
  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const [handelText, setHandelText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChangeUpperCase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowerCase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ['!', '@', '#', '%', '^', '&', '*', '(', ')'];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code - 32)
    );
    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandelText(characters.join(''));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <div className='wrapper'>
      <div className='container wrapper-box'>
        <h2>Password Generator</h2>
        <div className='password-box'>
          <input
            type='text'
            placeholder=''
            autoComplete='off'
            value={handelText}
            onChange={(e) => setHandelText(e.target.value)}
          />

          <button
            className='copy-button'
            onClick={() => {
              if (handelText.length > 0) {
                navigator.clipboard.writeText(handelText);
                setCopied(true);
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            {' '}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
        <br></br>

        <div className='word-crieteria__box'>
          <div>
            <label>Password Length</label>
          </div>
          <div>
            <input
              type='number'
              min='8'
              max='16'
              value={passwordGen.length}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
        </div>

        <div className='word-crieteria__box'>
          <div>
            <label>Uppercase letters</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.uppercase}
              onChange={handleChangeUpperCase}
            />
          </div>
        </div>

        <div className='word-crieteria__box'>
          <div>
            <label>Lowercase letters</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.lowercase}
              onChange={handleChangeLowerCase}
            />
          </div>
        </div>

        <div className='word-crieteria__box'>
          <div>
            <label>Include Numbers</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.numbers}
              onChange={handleChangeNumbers}
            />
          </div>
        </div>

        <div className='word-crieteria__box'>
          <div>
            <label>Include Symbols</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.symbols}
              onChange={handleChangeSymbols}
            />
          </div>
        </div>

        <button className='generate-button' onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
