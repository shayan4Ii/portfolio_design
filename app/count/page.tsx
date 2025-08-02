"use client";
import React, { useState } from 'react';

function ToggleText() {
  // Step 1: Create a state variable with initial value true
  const [showText, setShowText] = useState(true);

  // Step 2: Return UI
  return (
    <div>
      {/* Step 3: Show the text only if showText is true */}
      {showText && <p>This is visible text</p>}

      {/* Step 4: Toggle the value when button is clicked */}
      <button onClick={() => setShowText(!showText)}>
        Toggle Text
      </button>
    </div>
  );
}

export default ToggleText;
