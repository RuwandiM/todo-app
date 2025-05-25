mod commands;
mod models;
mod services;

use commands::todo::{get_todos, add_todo, delete_todo, toggle_todo};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_todos, add_todo, delete_todo, toggle_todo])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}