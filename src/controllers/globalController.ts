import { InterpreterFrom, MachineOptions, assign, createMachine } from "xstate";
import { Task } from "../models/Task";
import { RootStackNavigationProp } from "../navigation/Navigation";
import { EScreens } from "../constants/common";

export type GlobalService = InterpreterFrom<typeof globalController>;

type GlobalContext = {
  currentTasks: Task[];
  completedTasks: Task[];
  currentTask?: Task;
  navigationController: RootStackNavigationProp<EScreens>;
};

type GlobalEvents =
  | { type: "SHOW_EDITOR" }
  | { type: "SAVE"; taskID?: string }
  | { type: "CANCEL" }
  | { type: "EDIT"; data: Partial<Task> };

const actions: MachineOptions<GlobalContext, GlobalEvents>["actions"] = {
  openTaskEditor: (ctx, _) =>
    ctx.navigationController.navigate("TaskEditor" as any),
  editTask: assign((ctx, e) => {
    if (e.type !== "EDIT") {
      return {};
    }
    const currentTask = {
      ...(ctx.currentTask ?? {}),
      ...e.data,
    } as Task;
    return {
      currentTask,
    };
  }),
  saveNewTask: assign((ctx, e) => {
    if (e.type !== "SAVE") {
      return {};
    }
    if (!e.taskID && ctx.currentTask) {
      const newTask: Task = {
        id: (Math.random() * ctx.currentTask.title.length * 100).toString(),
        title: ctx.currentTask.title,
        description: ctx.currentTask.description,
        completed: false,
      };
      const updatedTasks = [...ctx.currentTasks, newTask];
      return {
        currentTasks: updatedTasks,
        currentTask: undefined,
      };
    }
    // Add code here...
    return {};
  }),
  dismissTaskEditor: (ctx, _) =>
    ctx.navigationController.canGoBack() && ctx.navigationController.goBack(),
};

export const globalController = createMachine(
  {
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
        },
      },
      editing: {
        on: {
          EDIT: {
            actions: "editTask",
          },
          SAVE: {
            actions: "saveNewTask",
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
