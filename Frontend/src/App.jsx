import { useState } from 'react';
// import Imagen from './components/Home/Home';
import styles from './App.module.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={`${styles.app} `}>
      {/* <Imagen /> */}
    </div>
  )
}

export default App
