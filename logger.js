export const logger = (() => {
  const Error = (message, context = null) => {
    Log(message, "error");
    if (context !== null) Log(context, "context");
    return 1;
  };

  const Peek = (message, label) => {
    Log(message, label);
    return message;
  };

  const Log = (message, label) => {
    if (label === undefined) console.log(message);
    else console.log(`${label}: ${message}`);
  };

  const Print = (puzzle, size) => {
    for (let i = 0; i < size * size; i += size) {
      console.log(puzzle.slice(i, i+size))
    }
  }

  return {
    Error,
    Peek,
    Log,
    Print,
  };
})();
