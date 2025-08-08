import React, { useState } from 'react';
import { Delete, Calculator } from 'lucide-react';

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const Button: React.FC<{
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
    variant?: 'number' | 'operator' | 'action' | 'equals';
  }> = ({ onClick, className = '', children, variant = 'number' }) => {
    const baseClasses = "h-16 rounded-2xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border";
    
    const variantClasses = {
      number: "bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30",
      operator: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/30 hover:border-blue-400/50",
      action: "bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border-orange-400/30 hover:border-orange-400/50",
      equals: "bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-400/30 hover:border-green-400/50"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl backdrop-blur-sm">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-semibold text-white">Calculator</h1>
      </div>

      {/* Display */}
      <div className="mb-6 p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-inner">
        <div className="text-right">
          {previousValue !== null && operation && (
            <div className="text-white/50 text-sm mb-2 font-mono">
              {previousValue} {operation}
            </div>
          )}
          <div className="text-white text-4xl font-light font-mono truncate">
            {display}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-4 flex-1">
        {/* First Row */}
        <Button
          onClick={clear}
          variant="action"
          className="col-span-2"
        >
          Clear
        </Button>
        <Button
          onClick={clearEntry}
          variant="action"
        >
          CE
        </Button>
        <Button
          onClick={() => inputOperation('÷')}
          variant="operator"
        >
          ÷
        </Button>

        {/* Second Row */}
        <Button onClick={() => inputNumber('7')}>7</Button>
        <Button onClick={() => inputNumber('8')}>8</Button>
        <Button onClick={() => inputNumber('9')}>9</Button>
        <Button
          onClick={() => inputOperation('×')}
          variant="operator"
        >
          ×
        </Button>

        {/* Third Row */}
        <Button onClick={() => inputNumber('4')}>4</Button>
        <Button onClick={() => inputNumber('5')}>5</Button>
        <Button onClick={() => inputNumber('6')}>6</Button>
        <Button
          onClick={() => inputOperation('-')}
          variant="operator"
        >
          −
        </Button>

        {/* Fourth Row */}
        <Button onClick={() => inputNumber('1')}>1</Button>
        <Button onClick={() => inputNumber('2')}>2</Button>
        <Button onClick={() => inputNumber('3')}>3</Button>
        <Button
          onClick={() => inputOperation('+')}
          variant="operator"
          className="row-span-2"
        >
          +
        </Button>

        {/* Fifth Row */}
        <Button
          onClick={() => inputNumber('0')}
        >
          0
        </Button>
        <Button onClick={inputDot}>.</Button>
        <Button
          onClick={performCalculation}
          variant="equals"
        >
          =
        </Button>
        
        {/* Empty cell to maintain grid */}
        <div></div>
      </div>
    </div>
  );
};

export default CalculatorApp;