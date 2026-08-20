import { useState } from "react";
import { ThemeToggle } from "./components/Playground/ThemeToggle";
import { ButtonPlayground } from "./components/Playground/ButtonPlayground";
import { InputPlayground } from "./components/Playground/InputPlayground";
import { DialogPlayground } from "./components/Playground/DialogPlayground";
import { Sliders, Type, Maximize2 } from "lucide-react";

type ActiveTab = "button" | "input" | "dialog";

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("button");

  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-200">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-xs">
              F
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-text">Faster UI @filipsol</h1>
              <p className="text-xs text-text-muted">
                Design System Component Playground
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mx-auto max-w-6xl px-6">
          <nav className="flex space-x-2 border-t border-border/40 pt-2" aria-label="Component Tabs">
            <button
              type="button"
              id="tab-button"
              onClick={() => setActiveTab("button")}
              className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "button"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-text-muted hover:border-border-hover hover:text-text"
              }`}
            >
              <Sliders className="h-4 w-4" />
              Button
            </button>

            <button
              type="button"
              id="tab-input"
              onClick={() => setActiveTab("input")}
              className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "input"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-text-muted hover:border-border-hover hover:text-text"
              }`}
            >
              <Type className="h-4 w-4" />
              Input
            </button>

            <button
              type="button"
              id="tab-dialog"
              onClick={() => setActiveTab("dialog")}
              className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "dialog"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-text-muted hover:border-border-hover hover:text-text"
              }`}
            >
              <Maximize2 className="h-4 w-4" />
              Dialog
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {activeTab === "button" && <ButtonPlayground />}
        {activeTab === "input" && <InputPlayground />}
        {activeTab === "dialog" && <DialogPlayground />}
      </main>
    </div>
  );
}

export default App;
