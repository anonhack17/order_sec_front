import './App.css';
import Router from "./components/Router";
import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="App">

        <Header></Header>
        <Router/>

      </div>
  );
}

export default App;
