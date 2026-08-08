import { Button } from "./Button";
import {eachDayOfInterval, endOfWeek, format, isFuture, startOfWeek} from "date-fns"

export type Habit = {
  id: string,
  name: string
}

type HabitListProps = {
  habits: Habit[]
  deleteHabit: (id: string) => void
}

export function HabitList({habits, deleteHabit}: HabitListProps) {

  // const habits = [{ id: 'dijg', name: "Drink Water" }, { id: 'dhai1', name: "Exercise" }];
  
  if(habits.length === 0){
    return <p className="text-zinc-500 text-center py-12">No habits yet. Add one to get started!</p>
  };

  return <div className="flex flex-col gap-3">
    {habits.map((habit) => (
      <HabitItem deleteHabit={deleteHabit} key={habit.id} habit={habit} />
    ))}
  </div>
}

type HabitItemProps = {
  habit: Habit
  deleteHabit: (id: string) => void
}

function HabitItem({habit, deleteHabit}: HabitItemProps){
  const visibleDates= eachDayOfInterval({
    start: startOfWeek(new Date(), {weekStartsOn: 1}),
    end: endOfWeek(new Date(), {weekStartsOn: 1})
  });

  return <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-400">🔥3</span>
        </div>

     </div>
        <Button variant="ghost-destructive" className="text-sm" onClick={() => deleteHabit(habit.id)}>Delete</Button>
    </div>

    <div className="flex gap-1.5" >
      {visibleDates.map((date) => (<Button className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs" key={date.toISOString()} disabled={isFuture(date)}>
        <span className="font-medium">{format(date, "EEE")}</span>
        <span>{format(date, "d")}</span>
      </Button>))}
    </div>


  </div>;
}