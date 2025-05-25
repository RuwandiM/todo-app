use crate::models::todo::Todo;
use crate::services::todo::{load_todos, save_todos, delete_todo as delete_todo_service, change_todo_status};
use chrono;
use tauri::command;

#[command]
pub fn get_todos() -> Vec<Todo> {
    load_todos()
}

#[command]
pub fn add_todo(title: String) {
    let mut todos = load_todos();
    let id = todos.iter().map(|t| t.id).max().unwrap_or(0) + 1;
    let new_todo = Todo {
        id,
        title,
        completed: false,
        created_at: chrono::Local::now().to_string(),
    };
    todos.push(new_todo);
    save_todos(&todos);
}

#[command]
pub fn delete_todo(id: u32) {
    delete_todo_service(id);
}

#[command]
pub fn toggle_todo(id : u32) {
    change_todo_status(id);
}