import React, { useState, useCallback } from 'react';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
import BubbleSort from './components/BubbleSort';

function App() {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [numberCount, setNumberCount] = useState<number>(10);

  const toggleOrder = useCallback(() => {
    setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleNumberCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value, 10);
    if (count >= 2 && count <= 20) {
      setNumberCount(count);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">冒泡排序游戏</h1>
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={toggleOrder}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {order === 'asc' ? (
            <>
              <ArrowUp className="mr-2" /> 升序
            </>
          ) : (
            <>
              <ArrowDown className="mr-2" /> 降序
            </>
          )}
        </button>
        <div className="flex items-center">
          <label htmlFor="numberCount" className="mr-2">数字数量：</label>
          <input
            type="number"
            id="numberCount"
            value={numberCount}
            onChange={handleNumberCountChange}
            min="2"
            max="20"
            className="w-16 px-2 py-1 border rounded"
          />
        </div>
      </div>
      <BubbleSort order={order} numberCount={numberCount} />
    </div>
  );
}

export default App;