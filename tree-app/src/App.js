import logo from './logo.svg';
import './App.scss';
import Tree from './components/tree';

function App() {
  return (
    <div className="app-container">
      <div className="header">Tree-structured file storage</div>
        <div className="tree-container">
          <Tree />
        </div>
    </div>
  );
}

export default App;
