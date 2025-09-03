import { useEffect, useRef, useState } from "react";

const TestComponent = ({ value }: { value?: string }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [index] = useState(0);

  useEffect(() => {
    // This example is very simplified and doesn't make sense in this small project context but pretend that `showPlaceholder` state is necessary and could be changed by other logic
    if (!value) {
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-chain-state-updates -- warning says "Avoid chaining state changes. When possible, update all relevant state simultaneously"
      setShowPlaceholder(false);

      // The above error can be confusing because there isn't any chained state updates so the error description isn't very helpful or actionable for this case. However,
      // this rule still flags an unnecessary useEffect (that the other lint rules don't) so it still has value - i.e. we could instead derive boolean logic below by using `value` & `showPlaceholder`
    }
  }, [value]);

  useEffect(() => {
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-chain-state-updates -- simplified example but main takeaway is that this seems to be a false positive
    inputRefs.current?.[index]?.focus();
  }, [value, index]);

  return (
    <>
      <p>Example: {showPlaceholder ? "Placeholder" : value}</p>
      <label htmlFor="email">Name:</label>
      <input
        ref={(ref) => {
          if (ref) {
            inputRefs.current[0] = ref;
          }
        }}
        id="email"
        name="email"
        placeholder="Email"
        type="text"
      />
    </>
  );
};

function App() {
  return (
    <>
      <h1>Demo</h1>
      <TestComponent value="" />
    </>
  );
}

export default App;
