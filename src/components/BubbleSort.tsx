import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, X } from 'lucide-react';

interface BubbleSortProps {
  order: 'asc' | 'desc';
  numberCount: number;
}

const BubbleSort: React.FC<BubbleSortProps> = ({ order, numberCount }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(1);
  const [comparisons, setComparisons] = useState<number>(0);
  const [rounds, setRounds] = useState<number>(0);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  useEffect(() => {
    resetGame();
  }, [order, numberCount]);

  const resetGame = () => {
    const newNumbers = Array.from({ length: numberCount }, () => Math.floor(Math.random() * 100));
    setNumbers(newNumbers);
    setCurrentIndex(0);
    setNextIndex(1);
    setComparisons(0);
    setRounds(0);
    setIsSorted(false);
  };

  const handleSwap = () => {
    if (isSorted) return;

    const shouldSwap = order === 'asc'
      ? numbers[currentIndex] > numbers[nextIndex]
      : numbers[currentIndex] < numbers[nextIndex];

    if (shouldSwap) {
      const newNumbers = [...numbers];
      [newNumbers[currentIndex], newNumbers[nextIndex]] = [newNumbers[nextIndex], newNumbers[currentIndex]];
      setNumbers(newNumbers);
    }

    moveToNextComparison();
  };

  const handleNoSwap = () => {
    if (isSorted) return;
    moveToNextComparison();
  };

  const moveToNextComparison = () => {
    setComparisons((prev) => prev + 1);

    if (nextIndex === numbers.length - 1) {
      setRounds((prev) => prev + 1);
      if (currentIndex === 0) {
        checkIfSorted();
      } else {
        setCurrentIndex(0);
        setNextIndex(1);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
      setNextIndex((prev) => prev + 1);
    }
  };

  const checkIfSorted = () => {
    const sorted = numbers.every((num, index) => {
      if (index === numbers.length - 1) return true;
      return order === 'asc' ? num <= numbers[index + 1] : num >= numbers[index + 1];
    });
    setIsSorted(sorted);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between mb-4">
        <span className="font-bold">比较次数：{comparisons}</span>
        <span className="font-bold">排序轮数：{rounds}</span>
        <button
          onClick={resetGame}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          重置
        </button>
      </div>
      <div className="flex justify-center mb-4 flex-wrap">
        {numbers.map((num, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center border m-1 ${
              index === currentIndex || index === nextIndex
                ? 'border-red-500'
                : 'border-gray-300'
            } ${isSorted ? 'bg-green-200' : ''}`}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleSwap}
          disabled={isSorted}
          className={`flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors ${
            isSorted ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <ArrowLeftRight className="mr-2" /> 交换
        </button>
        <button
          onClick={handleNoSwap}
          disabled={isSorted}
          className={`flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors ${
            isSorted ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <X className="mr-2" /> 不交换
        </button>
      </div>
      {isSorted && (
        <p className="text-center mt-4 text-green-600 font-bold">
          排序完成！总共进行了 {rounds} 轮排序，比较了 {comparisons} 次。
        </p>
      )}
    </div>
  );
};

export default BubbleSort;