import { InterpreterFrom, MachineOptions, assign, createMachine } from "xstate";
import { Task } from "../models/Task";
import { RootStackNavigationProp } from "../navigation/Navigation";
import { EScreens } from "../constants/common";

export type GlobalService = InterpreterFrom<typeof globalController>;

type GlobalContext = {
  tasks: Task[];
  currentTask?: Task;
  navigationController: RootStackNavigationProp<EScreens>;
};

type GlobalEvents =
  | { type: "SHOW_EDITOR"; taskID?: string }
  | { type: "CREATE" }
  | { type: "SAVE" }
  | { type: "CANCEL" }
  | { type: "EDIT"; data: Partial<Task> }
  | { type: "UPDATE_TASKS" }
  | { type: "UPDATE_TASKS" }
  | {
      type: "TOGGLE_TASK";
      taskID: string;
    }
  | { type: "DELETE_TASK"; taskID: string };

const actions: MachineOptions<GlobalContext, GlobalEvents>["actions"] = {
  openTaskEditor: assign((ctx, e) => {
    if (e.type !== "SHOW_EDITOR") return {};

    ctx.navigationController.navigate("TaskEditor" as any);

    return e.taskID
      ? {
          currentTask: ctx.tasks.find(({ id }) => id === e.taskID),
        }
      : {};
  }),
  editTask: assign((ctx, e) => {
    if (e.type !== "EDIT") return {};

    const currentTask = {
      ...(ctx.currentTask ?? {}),
      ...e.data,
    } as Task;

    return {
      currentTask,
    };
  }),
  createTask: assign((ctx, e) => {
    if (e.type !== "CREATE" || !ctx.currentTask) return {};

    const task: Task = {
      id: (Math.random() * ctx.currentTask.title.length * 100).toString(),
      title: ctx.currentTask.title,
      description: ctx.currentTask.description,
      completed: false,
    };

    console.log("SAVE", task);

    return {
      tasks: [...ctx.tasks, task],
      currentTask: undefined,
    };
  }),
  saveTask: assign((ctx, e) => {
    if (e.type !== "SAVE" || !ctx.currentTask?.id) return {};

    const copy = [...ctx.tasks];
    const idx = copy.findIndex(({ id }) => id === ctx.currentTask?.id);

    copy[idx] = ctx.currentTask;

    return {
      tasks: copy,
      currentTask: undefined,
    };
  }),
  dismissTaskEditor: (ctx, _) =>
    ctx.navigationController.canGoBack() && ctx.navigationController.goBack(),
  toggleStatus: assign((ctx, e) => {
    if (e.type !== "TOGGLE_TASK") return {};

    const task = ctx.tasks.find(({ id }) => id === e.taskID);

    return task?.id
      ? {
          currentTask: {
            ...task,
            completed: !task.completed,
          },
        }
      : {};
  }),
  updateTasks: assign((ctx, _) => {
    if (!ctx.currentTask?.id) return {};
    const tasks = [...ctx.tasks];
    const idx = tasks.findIndex(({ id }) => id === ctx.currentTask?.id);

    if (idx !== -1) {
      tasks[idx] = ctx.currentTask;
    } else {
      tasks.push(ctx.currentTask);
    }

    return {
      tasks,
      currentTask: undefined,
    };
  }),
  deleteTask: assign((ctx, e) => {
    if (e.type !== "DELETE_TASK" || !e.taskID) return {};

    return {
      tasks: ctx.tasks.filter(({ id }) => id !== e.taskID),
    };
  }),
};

export const globalController = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAZQAkB5AdQH0BRAEQEkAVRgEoBtAAwBdRKAAOAe1i4ALrhn5JIAB6IAnABYSAVgDMhkVq0B2AIwAma+YAc5wwBoQAT0QBaLfZI6Rhvr2WvqWoYE2AL6RrmhYeISk5FTU-ADiaQAy7Ky8AIK0ANKiEkggsvJKKmqaCEEiJCL+AGz6+taWzc3mzVquHgg61vokIT765lZdTubRsRg4BMQkkIoEUNRcfCVqFWvVZbWe9s0khtaGlvYdhvbn1839XrdnWpYBATqWxifNcyBxRaJFYQNb4Da0PIANXYOzKeyqqkOiGsIlO+hE9kxhi6YTRwyeCBMWgMjhE5hE1ma1ypllmMQBCwSy1WSnB1AAwnkAHIc9iZOHSOT7JGgI4kobNazBMJBDHBfSE5pNEjXHTNIZNQJaaz-QHM0gAVykEHQbI2AFUAAqcPK8HL5Iq0QXlYWImqINq+Qy6ELtDptQmo8yNVo+BVBTpdaIM-AyCBwNT6pZEXZu5SijReb56c6Xa7fO7SqmEzxXEY6CyGKwBE5vez2PVMlNkShgNOVDMewbWEmTWx2HGWIbSoNaBr6HQ6BsiTpDc5NJvxFus9YdkXd-x+T6zuzYnT6PruRCGLf2KchE52JzUpdA5bG03m9fu5EIHoT4fyyw2C6B49EhcJDvNYB7kiY5gXFSMaREAA */
    schema: {
      context: {} as GlobalContext,
      events: {} as GlobalEvents,
    },

    predictableActionArguments: true,
    initial: "idle",
    states: {
      idle: {
        on: {
          SHOW_EDITOR: {
            target: "editing",
            actions: "openTaskEditor",
          },

          TOGGLE_TASK: {
            actions: ["toggleStatus", "updateTasks"],
          },
          DELETE_TASK: {
            actions: "deleteTask",
          },
        },
      },

      editing: {
        on: {
          EDIT: {
            actions: "editTask",
          },
          CREATE: {
            actions: ["createTask", "dismissTaskEditor"],
            target: "idle",
          },
          SAVE: {
            actions: ["saveTask", "dismissTaskEditor"],
            target: "idle",
          },
          CANCEL: {
            target: "idle",
            actions: "dismissTaskEditor",
          },
        },
      },
    },
  },
  {
    actions,
  }
);
