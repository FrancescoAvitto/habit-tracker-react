import { useHabits } from "../context/HabitProvider";
import { Button } from "./Button";
import { isToday } from "date-fns/isToday";

export function Header() {
  const { habits } = useHabits();

  const doneToday = habits.filter(h => h.completions.some(c => isToday(c))).length;


  return <header className="flex items-center justify-between">
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold">Habit Tracker</h1>
      <span className="text-sm text-zinc-400">{doneToday}/{habits.length} done today</span>
    </div>
    <div className="flex flex-col gap-1 items-end">
       <span className="text-sm text-zinc-400">Apr 6 - Apr 12</span>
       <div className="flex items-center gap-3">
        <Button >Prev</Button>
        <Button >Next</Button>
       </div>
    </div>
  </header>;
}
