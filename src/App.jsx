import { useState } from "react";
import LandingPage from "./components/LandingPage";
import CodeEditorPage from "./components/CodeEditorPage";

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleEnterEditor = () => {
    setShowLanding(false);
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
  };

  if (showLanding) {
    return <LandingPage onEnterEditor={handleEnterEditor} />;
  }

  return <CodeEditorPage onBackToLanding={handleBackToLanding} />;
}

export default App;