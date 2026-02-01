import { useRef, useState, useEffect } from 'react';

// 1. Basic useRef - Focus Input
function FocusInput() {
  const inputRef = useRef(null);
  
  const handleFocus = () => {
    inputRef.current.focus();
  };
  
  const handleClear = () => {
    inputRef.current.value = '';
    inputRef.current.focus();
  };
  
  return (
    <div>
      <h3>1. Focus Input</h3>
      <input ref={inputRef} type="text" placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus</button>
      <button onClick={handleClear}>Clear & Focus</button>
    </div>
  );
}

// 2. useRef vs useState - Understanding the difference
function RefVsState() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);
  const renderCount = useRef(0);
  
  renderCount.current++;
  
  const incrementState = () => {
    setStateCount(stateCount + 1);
  };
  
  const incrementRef = () => {
    refCount.current++;
    console.log('Ref count is now:', refCount.current);
    alert(`Ref: ${refCount.current} (No re-render happened!)`);
  };
  
  return (
    <div>
      <h3>2. useRef vs useState</h3>
      <p>Component rendered {renderCount.current} times</p>
      <p>State Count (visible): {stateCount}</p>
      <p>Ref Count (check console): {refCount.current}</p>
      <button onClick={incrementState}>Increment State (re-renders)</button>
      <button onClick={incrementRef}>Increment Ref (no re-render)</button>
    </div>
  );
}

// 3. Stopwatch with useRef
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  
  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  };
  
  const stop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  
  const reset = () => {
    stop();
    setTime(0);
  };
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <div>
      <h3>3. Stopwatch (Timer ID in Ref)</h3>
      <p>{time}s</p>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// 4. Previous Value Tracker
function PreviousValueTracker() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const prevCountRef = useRef();
  const prevNameRef = useRef();
  
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
  
  useEffect(() => {
    prevNameRef.current = name;
  }, [name]);
  
  return (
    <div>
      <h3>4. Previous Value Tracker</h3>
      <div>
        <p>Current Count: {count}</p>
        <p>Previous Count: {prevCountRef.current}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div>
        <p>Current Name: {name}</p>
        <p>Previous Name: {prevNameRef.current}</p>
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name"
        />
      </div>
    </div>
  );
}

// 5. Scroll to Element
function ScrollToElement() {
  const topRef = useRef(null);
  const middleRef = useRef(null);
  const bottomRef = useRef(null);
  
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  return (
    <div>
      <h3>5. Scroll to Element</h3>
      <div>
        <button onClick={() => scrollTo(topRef)}>Scroll to Top</button>
        <button onClick={() => scrollTo(middleRef)}>Scroll to Middle</button>
        <button onClick={() => scrollTo(bottomRef)}>Scroll to Bottom</button>
      </div>
      
      <div ref={topRef}>
        <h4>Top Section</h4>
        <p>This is the top section</p>
      </div>
      
      <div style={{ height: '200px' }}>
        <p>Scroll space...</p>
      </div>
      
      <div ref={middleRef}>
        <h4>Middle Section</h4>
        <p>This is the middle section</p>
      </div>
      
      <div style={{ height: '200px' }}>
        <p>Scroll space...</p>
      </div>
      
      <div ref={bottomRef}>
        <h4>Bottom Section</h4>
        <p>This is the bottom section</p>
      </div>
    </div>
  );
}

// 6. Input Character Counter (without re-renders)
function CharacterCounter() {
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);
  
  const handleInput = () => {
    countRef.current = inputRef.current.value.length;
    console.log('Characters:', countRef.current);
  };
  
  const showCount = () => {
    setDisplayCount(countRef.current);
  };
  
  return (
    <div>
      <h3>6. Character Counter (Ref - No Re-render)</h3>
      <input 
        ref={inputRef}
        onInput={handleInput}
        placeholder="Type something..."
      />
      <p>Characters typed: {displayCount}</p>
      <button onClick={showCount}>Show Count</button>
      <p>(Input doesn't cause re-renders, click button to see count)</p>
    </div>
  );
}

// 7. Click Outside to Close
function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div>
      <h3>7. Click Outside to Close</h3>
      <div ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'} Dropdown
        </button>
        {isOpen && (
          <div style={{ border: '1px solid black', padding: '10px' }}>
            <p>Dropdown Content</p>
            <p>Click outside to close</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 8. Debounced Search Input
function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const timeoutRef = useRef(null);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      console.log('Searching for:', value);
      setResults(value ? [`Result 1 for "${value}"`, `Result 2 for "${value}"`] : []);
    }, 500);
  };
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return (
    <div>
      <h3>8. Debounced Search</h3>
      <input 
        value={query}
        onChange={handleChange}
        placeholder="Type to search..."
      />
      <p>(Search happens 500ms after you stop typing)</p>
      {results.length > 0 && (
        <div>
          <h4>Results:</h4>
          {results.map((result, idx) => (
            <p key={idx}>{result}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// 9. First Render Detection
function FirstRenderDetector() {
  const [count, setCount] = useState(0);
  const isFirstRender = useRef(true);
  const renderCountRef = useRef(0);
  
  useEffect(() => {
    renderCountRef.current++;
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log('Component mounted - First render');
    } else {
      console.log('Component re-rendered');
    }
  });
  
  return (
    <div>
      <h3>9. First Render Detection</h3>
      <p>Count: {count}</p>
      <p>Total Renders: {renderCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Check console for render logs</p>
    </div>
  );
}

// 10. Multiple Input Focus Manager
function MultiInputFocus() {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  
  const focusNext = (currentRef, nextRef) => {
    if (currentRef.current.value.length === 3) {
      nextRef.current?.focus();
    }
  };
  
  return (
    <div>
      <h3>10. Auto-Focus Next Input</h3>
      <p>Enter 3 digits in each box (auto-moves to next)</p>
      <input 
        ref={input1Ref}
        maxLength={3}
        onChange={() => focusNext(input1Ref, input2Ref)}
        placeholder="###"
      />
      <input 
        ref={input2Ref}
        maxLength={3}
        onChange={() => focusNext(input2Ref, input3Ref)}
        placeholder="###"
      />
      <input 
        ref={input3Ref}
        maxLength={3}
        placeholder="###"
      />
    </div>
  );
}

// 11. Canvas Drawing with Ref
function CanvasDrawing() {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  
  const startDrawing = (e) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };
  
  const draw = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    isDrawingRef.current = false;
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  return (
    <div>
      <h3>11. Canvas Drawing</h3>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: '1px solid black' }}
      />
      <br />
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
}

// 12. Form with Auto-Save (no re-renders)
function AutoSaveForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [savedData, setSavedData] = useState(null);
  const saveTimeoutRef = useRef(null);
  
  const handleInput = () => {
    clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      const data = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        savedAt: new Date().toLocaleTimeString()
      };
      setSavedData(data);
      console.log('Auto-saved:', data);
    }, 1000);
  };
  
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <div>
      <h3>12. Auto-Save Form</h3>
      <input
        ref={nameRef}
        onInput={handleInput}
        placeholder="Name"
      />
      <input
        ref={emailRef}
        onInput={handleInput}
        placeholder="Email"
      />
      <p>(Auto-saves 1 second after you stop typing)</p>
      {savedData && (
        <div>
          <p><strong>Last Saved:</strong> {savedData.savedAt}</p>
          <p>Name: {savedData.name}</p>
          <p>Email: {savedData.email}</p>
        </div>
      )}
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <div>
      <h1>useRef Hook Examples</h1>
      <FocusInput />
      <RefVsState />
      <Stopwatch />
      <PreviousValueTracker />
      <ScrollToElement />
      <CharacterCounter />
      <ClickOutsideDemo />
      <DebouncedSearch />
      <FirstRenderDetector />
      <MultiInputFocus />
      <CanvasDrawing />
      <AutoSaveForm />
    </div>
  );
}