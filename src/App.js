import { ToastContextProvider } from './components/Toast/ToastContext';
import JSONViewer from './components/JSONViewer/JSONViewer';
import './App.css';

function App() {
  return (
    <ToastContextProvider>
      <main>
        <section>
          <JSONViewer />
        </section>
      </main>
    </ToastContextProvider>
  );
}

export default App;
