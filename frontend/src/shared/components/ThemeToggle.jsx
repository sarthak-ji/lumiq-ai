import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../app/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className="theme-toggle p-2 text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] rounded-lg transition-all"
    >
      {isLight ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
