import React from 'react';
import PropTypes from 'prop-types';

const ConsoleOutput = ({ output }) => {
  return (
    <div className="console-output bg-black text-white p-2 h-full overflow-y-auto">
      {output.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

ConsoleOutput.propTypes = {
  output: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ConsoleOutput;
