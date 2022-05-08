import './App.css';
import img from "./assets/Sprinkle.png"
import TodoList from './components/TodoList/TodoList';

const Background = {
  backgroundImage : `url(${img})`,
  backgroundSize : "cover",
  backgroundAttachment : "fixed", 
  width : "100vw",
  height : "100vh",
}

function App() {
  return (
    <div className="App" style={Background}>
      <TodoList />
    </div>
  );
}

export default App;
