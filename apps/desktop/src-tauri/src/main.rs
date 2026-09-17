#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod tray;

use tauri::{Emitter, Manager, WindowEvent};

const SHOW_EVENT: &str = "assistant://show";

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            // A second launch focuses the existing window instead of opening another instance (P1-01).
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.show();
                let _ = window.set_focus();
                let _ = app.emit(SHOW_EVENT, ());
            }
        }))
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .setup(|app| {
            tray::setup_tray(app)?;
            // The window is visible at launch; emit once so the frontend greets on startup too.
            if let Some(window) = app.get_webview_window("main") {
                let _ = app.emit(SHOW_EVENT, ());
                let _ = window.set_focus();
            }
            Ok(())
        })
        .on_window_event(|window, event| {
            if let WindowEvent::CloseRequested { api, .. } = event {
                // Close-to-tray: the window hides instead of the app quitting (Exit is tray-only).
                api.prevent_close();
                let _ = window.hide();
            }
        })
        .run(tauri::generate_context!())
        .expect("failed to run the Desktop Assistant shell");
}
