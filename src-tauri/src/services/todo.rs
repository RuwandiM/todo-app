use crate::models::todo::Todo;
use std::fs;
use std::path::PathBuf;
use std::fs::{File};
use std::io::{BufReader, Write};

pub fn get_data_file_path() -> PathBuf {
    let mut path = dirs::data_local_dir().expect("Failed to get data local directory");
    path.push("todo-desktop-app");
    fs::create_dir_all(&path).unwrap();
    path.push("todos.json");
    path
}

pub fn load_todos() -> Vec<Todo> {
    let file_path = get_data_file_path();
    if !file_path.exists() {
        return vec![];
    }

    let file = File::open(file_path).expect("Failed to open file");
    let reader = BufReader::new(file);
    serde_json::from_reader(reader).unwrap_or_else(|_| vec![])
}

pub fn save_todos(todos: &Vec<Todo>) {
    let file_path = get_data_file_path();
    let mut file = File::create(file_path).expect("Failed to create file");
    let data = serde_json::to_string_pretty(todos).expect("Failed to serialize data");
    file.write_all(data.as_bytes()).expect("Failed to write data");
}

pub fn delete_todo(id: u32) {
    let mut todos = load_todos();
    todos.retain(|todo| todo.id != id);
    save_todos(&todos)
}

pub fn change_todo_status(id: u32) {
    let mut todos = load_todos();
    let todo = todos.iter_mut().find(|todo| todo.id == id);
    todo.map(|t| t.completed = !t.completed);
    save_todos(&todos);
}