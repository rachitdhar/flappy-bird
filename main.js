"use strict";
var _a;
// initializing all HTML elements
const agent = document.createElement("div");
agent.id = "agent";
const score_counter = document.createElement("label");
score_counter.id = "score_counter";
const pause_status_lbl = document.createElement("label");
pause_status_lbl.id = "pause_status_lbl";
const game_over_display = document.createElement("label");
game_over_display.id = "game_over_display";
const help_popup = document.getElementById("help-popup");
const agent_size = 30;
const agent_left_init = 200;
const agent_top_init = 200;
let score = 0;
const score_increment = 10;
const current_time_hour = new Date().getHours();
(_a = document.getElementById("body")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", (current_time_hour <= 6 || current_time_hour >= 18)
    ? "background-color: rgb(1, 18, 45);"
    : "background-color: rgb(156, 219, 233);");
agent.setAttribute("style", `position: absolute; top: ${agent_top_init}px; left: ${agent_left_init}px; width: ${agent_size}px; height: ${agent_size}px; background-color:#9c0707;`);
score_counter.setAttribute("style", "position: absolute; top: 40px; right: 100px; font-size: 40px; font-family: Arial, sans-serif; color: white; z-index: 100;");
pause_status_lbl.setAttribute("style", "position: absolute; top: 40px; left: 100px; font-size: 40px; font-family: Arial, sans-serif; color: white; z-index: 100;");
game_over_display.setAttribute("style", "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: none; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.3); color: white; font-size: 80px; font-weight: 600; font-family: Arial, sans-serif; z-index: 9999;");
score_counter.textContent = "Score: 0";
pause_status_lbl.textContent = "";
game_over_display.textContent = "GAME OVER";
document.body.appendChild(agent);
document.body.appendChild(score_counter);
document.body.appendChild(pause_status_lbl);
document.body.appendChild(game_over_display);
// **************** Game *****************
// universal controls
let is_paused = false;
let is_game_over = false;
let show_help = false;
// physics (taking downward direction as +ve y-axis)
let agent_vy = 0;
let agent_ay = 0;
const ay_gravity = 2;
const terminal_speed = 30;
let jump_vy = -15;
// entities
const min_obstacle_gap = 100;
const max_obstacle_gap = 200;
const pipe_width = 50;
const min_pipe_height = 50;
const entity_vx = -15;
let last_used_entity_id = 0;
let temporary_entity_ids = [];
function handleEntities() {
    temporary_entity_ids.forEach((id) => {
        const entity = document.getElementById(id);
        if (entity) {
            let entity_style = window.getComputedStyle(entity);
            let agent_style = window.getComputedStyle(agent);
            let current_left = pixel_val(entity_style.left);
            let entity_width = pixel_val(entity_style.width);
            let entity_height = pixel_val(entity_style.height);
            let entity_top = pixel_val(entity_style.top);
            let new_left = current_left + entity_vx;
            entity.style.left = pixel_str(new_left); // move the entities to the left
            // handle collision with entity
            if (pixel_val(agent_style.left) + agent_size > current_left &&
                pixel_val(agent_style.left) < current_left + entity_width &&
                ((entity.getAttribute("pipe_type") === "bottom" &&
                    pixel_val(agent_style.top) + agent_size > entity_top) ||
                    (entity.getAttribute("pipe_type") === "top" &&
                        pixel_val(agent_style.top) < entity_top + entity_height))) {
                set_gameover();
            }
            // remove entity after it leaves the screen
            if (new_left + entity_width <= 0)
                destroy_entity(id);
        }
    });
}
function create_obstacle() {
    const bottom_pipe = document.createElement("div");
    const top_pipe = document.createElement("div");
    bottom_pipe.id = create_entity_id();
    top_pipe.id = create_entity_id();
    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
    let gap = rand_int(min_obstacle_gap, max_obstacle_gap);
    let bp_top = rand_int(min_pipe_height + gap, window_height - min_pipe_height);
    bottom_pipe.setAttribute("style", `position: absolute; top: ${bp_top}px; left: ${window_width}px; height: ${window_height - bp_top}px; width: ${pipe_width}px; background-color:rgb(36, 193, 22);`);
    top_pipe.setAttribute("style", `position: absolute; top: 0px; left: ${window_width}px; height: ${bp_top - gap}px; width: ${pipe_width}px; background-color: rgb(36, 193, 22);`);
    bottom_pipe.setAttribute("pipe_type", "bottom");
    top_pipe.setAttribute("pipe_type", "top");
    document.body.appendChild(bottom_pipe);
    document.body.appendChild(top_pipe);
}
function create_entity_id() {
    const new_id = last_used_entity_id.toString();
    last_used_entity_id += 1;
    temporary_entity_ids.push(new_id);
    return new_id;
}
function destroy_entity(id) {
    const entity = document.getElementById(id);
    if (entity) {
        if (entity.getAttribute("pipe_type") === "bottom") {
            score += score_increment;
            score_counter.textContent = `Score: ${score}`;
        }
        entity.remove();
    }
    const index = temporary_entity_ids.indexOf(id);
    if (index != -1)
        temporary_entity_ids.splice(index, 1);
}
function restart_game() {
    temporary_entity_ids.forEach((id) => {
        const entity = document.getElementById(id);
        if (entity)
            entity.remove();
    });
    temporary_entity_ids = [];
    last_used_entity_id = 0;
    agent.style.top = pixel_str(agent_top_init);
    agent_ay = 0;
    agent_vy = 0;
    score = 0;
    score_counter.textContent = `Score: ${score}`;
    game_over_display.style.display = "none";
    is_game_over = false;
    is_paused = false;
}
// **************** Core *****************
function handleUpKeyPress(key_code) {
    let multiplier = (key_code === "KeyK" || key_code === "Space") ? 1.33 : 1;
    agent_vy = multiplier * jump_vy;
    agent_ay = ay_gravity;
}
function toggleHelpPopup() {
    if (!show_help) {
        help_popup.setAttribute("style", "display: flex;");
        is_paused = true;
        show_help = true;
    }
    else {
        help_popup.setAttribute("style", "display: none;");
        is_paused = false;
        show_help = false;
    }
}
function handleTimeTick() {
    if (is_paused || is_game_over)
        return;
    handleEntities();
    if (agent_vy < terminal_speed) {
        agent_vy += agent_ay;
    }
    agent.style.top = pixel_str(pixel_val(agent.style.top) + agent_vy);
    if (pixel_val(agent.style.top) >= window.innerHeight) {
        set_gameover();
    }
}
// handling elapsed time
function handleClockTick() {
    if (is_paused || is_game_over)
        return;
    create_obstacle();
}
function set_gameover() {
    is_game_over = true;
    game_over_display.style.display = "flex";
}
// handling keyboard presses
function handleKeyPress(e) {
    switch (e.code) {
        case 'ArrowUp':
        case 'KeyJ':
        case 'KeyK':
            handleUpKeyPress(e.code);
            break;
        case 'KeyP':
            if (!is_game_over && !show_help) {
                is_paused = !is_paused;
                if (is_paused)
                    pause_status_lbl.textContent = "Paused";
                else
                    pause_status_lbl.textContent = "";
            }
            break;
        case 'Space':
            if (is_game_over) {
                restart_game();
            }
            else {
                handleUpKeyPress(e.code);
            }
            break;
        case 'KeyH':
            if (!is_game_over) {
                toggleHelpPopup();
            }
            break;
        default: break;
    }
}
document.addEventListener("keydown", (e) => handleKeyPress(e));
setInterval(handleClockTick, 1000); // creating timer for time elapsed clock
setInterval(handleTimeTick, 50); // creating universal timer for game
// ****************** Helper ********************
function pixel_val(data) {
    let val = data.slice(0, data.indexOf("px"));
    return parseInt(val);
}
function pixel_str(data) {
    return `${data}px`;
}
// generate random integer betweeen min and max (min and max included)
function rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
