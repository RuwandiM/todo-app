use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Todo {
    pub id: u32,
    pub title: String,
    pub completed: bool,
    pub created_at: String,
}