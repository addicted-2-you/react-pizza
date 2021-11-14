import React from 'react';

function PizzaOrderSwitch(props) {
  const { options, radioGroupName, checkedOptionId, checkOption } = props;

  return (
    <div className="flex space-x-2">
      {options.map((option) => (
        <label
          key={`${radioGroupName}-${option.id}`}
          className={`p-2 flex-grow text-center rounded-lg cursor-pointer hover:bg-gray-50 ${
            checkedOptionId === option.id ? 'bg-white' : ''
          }`}
          htmlFor={`pizza-order-switch-${radioGroupName}-${option.id}`}
        >
          <span className="text-sm">{option.name}</span>
          <input
            className="hidden"
            id={`pizza-order-switch-${radioGroupName}-${option.id}`}
            type="radio"
            checked={checkedOptionId === option.id}
            radioGroup={radioGroupName}
            onChange={() => checkOption(option)}
          />
        </label>
      ))}
    </div>
  );
}

export default PizzaOrderSwitch;
