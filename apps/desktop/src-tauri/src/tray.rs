use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    App, Emitter, Manager,
};

const SHOW_EVENT: &str = "assistant://show";

/// System tray with Show/Hide/Exit, matching the Phase 1 plan's required
/// menu. Show/Hide act directly on the "main" window; Exit terminates the
/// whole application instead of only hiding it.
pub fn setup_tray(app: &App) -> tauri::Result<()> {
    let show_item = MenuItem::with_id(app, "show", "Show", true, None::<&str>)?;
    let hide_item = MenuItem::with_id(app, "hide", "Hide", true, None::<&str>)?;
    let exit_item = MenuItem::with_id(app, "exit", "Exit", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&show_item, &hide_item, &exit_item])?;

    TrayIconBuilder::new()
        .menu(&menu)
        .tooltip("Personal AI Assistant")
        .on_menu_event(|app, event| match event.id.as_ref() {
            "show" => show_main_window(app),
            "hide" => hide_main_window(app),
            "exit" => app.exit(0),
            _ => {}
        })
        .build(app)?;

    Ok(())
}

fn show_main_window(app: &tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.show();
        let _ = window.set_focus();
        let _ = app.emit(SHOW_EVENT, ());
    }
}

fn hide_main_window(app: &tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.hide();
    }
}
