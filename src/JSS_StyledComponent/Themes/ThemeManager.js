import { ToDoListDarkTheme } from "./DarkThemeToDoList";
import { ToDoListLightTheme } from "./LightThemeToDoList";
import { ToDoListPrimaryTheme } from "./PrimaryThemeToDoList";

export const arrTheme = [
    {
        id: 3,
        name: 'Default Theme',
        theme: ToDoListPrimaryTheme,
    },
    {
        id: 2,
        name: 'Light Theme',
        theme: ToDoListLightTheme,
    },
    {
        id: 1,
        name: 'Dark Theme',
        theme: ToDoListDarkTheme,
    },
]