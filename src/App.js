import { useState } from 'react';
import { ToastContextProvider } from './components/Toast/ToastContext';
import './App.css';
import JSONViewer from './components/JSONViewer/JSONViewer';
import AllToolList from './components/AllToolList';
import Base64EncoderDecoder from './components/Base64/Base64EnDecoder';
import URLEncoderDecoder from './components/URL/URLEnDecoder';

function App() {
  const [tool, setTool] = useState('json');

  return (
    <ToastContextProvider>
      <main>
        <aside>
          <AllToolList selected={tool} onToolChange={(e) => setTool(e)} />
        </aside>
        <section>
          {tool === 'json' && <JSONViewer />}
          {tool.startsWith('url-') && <URLEncoderDecoder />}
          {tool.startsWith('base64-') && (
            <Base64EncoderDecoder
              view={tool}
              onViewChange={(e) => setTool(e)}
            />
          )}
        </section>
      </main>
    </ToastContextProvider>
  );
}

export default App;
