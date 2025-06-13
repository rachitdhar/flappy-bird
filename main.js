import { Colors, LevelDesignMap } from "./constants.js";
// initializing all HTML elements
const agent = document.createElement("div");
agent.id = "agent";
const score_counter = document.createElement("label");
score_counter.id = "score_counter";
const world_level_lbl = document.createElement("label");
world_level_lbl.id = "world_level_lbl";
const pause_status_lbl = document.createElement("label");
pause_status_lbl.id = "pause_status_lbl";
const game_over_display = document.createElement("label");
game_over_display.id = "game_over_display";
const next_level_display = document.createElement("label");
next_level_display.id = "next_level_display";
const help_popup = document.getElementById("help-popup");
const lives_display = document.getElementById("lives-display");
const lives_counter = document.getElementById("lives-counter");
const body = document.getElementById("body");
const lives_lbl = document.createElement("label");
lives_lbl.id = "lives_lbl";
const time_counter = document.createElement("label");
time_counter.id = "time_counter";
const agent_size = 30;
const agent_left_init = 200;
const agent_top_init = 200;
let score = 0;
let time_remaining = 300;
const time_init = 300;
const score_increment = 10;
const current_time_hour = new Date().getHours();
let world = 1;
let level = 1;
const last_world = 4;
const lives_init = 5;
let lives_remaining = 5;
let level_props = LevelDesignMap["W11"];
agent.setAttribute("style", `position: absolute; top: ${agent_top_init}px; left: ${agent_left_init}px; width: ${agent_size}px; height: ${agent_size}px; background-color:rgb(156, 7, 7);`);
score_counter.setAttribute("style", `position: absolute; top: 40px; right: 250px; font-size: 20px; display: block; text-align: center; color: ${Colors.WHITE}; z-index: 100;`);
world_level_lbl.setAttribute("style", `position: absolute; top: 40px; left: 50%; display: block; text-align: center; transform: translateX(-50%); font-size: 20px; color: ${Colors.WHITE}; z-index: 100;`);
pause_status_lbl.setAttribute("style", `position: absolute; top: 40px; left: 100px; font-size: 20px; color: ${Colors.WHITE}; z-index: 100;`);
game_over_display.setAttribute("style", `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: none; justify-content: center; align-items: center; background: ${Colors.OVERLAY_DARK}; color: white; font-size: 40px; font-weight: 600; z-index: 9999;`);
next_level_display.setAttribute("style", `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: none; text-align: center; justify-content: center; align-items: center; background-color: ${Colors.BLACK}; color: white; font-size: 20px; font-weight: 600; z-index: 9999;`);
lives_lbl.setAttribute("style", `position: absolute; top: 40px; left: 100px; display: block; text-align: center; font-size: 20px; color: ${Colors.WHITE}; z-index: 100;`);
time_counter.setAttribute("style", `position: absolute; top: 40px; right: 100px; font-size: 20px; display: block; text-align: center; color: ${Colors.WHITE}; z-index: 100;`);
score_counter.innerHTML = "Score<br>0";
lives_lbl.innerHTML = `Lives<br>${lives_remaining}`;
world_level_lbl.innerHTML = `World<br>${world}-${level}`;
pause_status_lbl.textContent = "";
game_over_display.textContent = "GAME OVER";
next_level_display.innerHTML = `World ${world}-${level}`;
lives_counter.textContent = `x ${lives_remaining}`;
time_counter.innerHTML = `Time<br>${time_remaining}`;
body === null || body === void 0 ? void 0 : body.setAttribute("style", (current_time_hour <= 6 || current_time_hour >= 18)
    ? `background-color: ${level_props.bg_night_color};`
    : `background-color: ${level_props.bg_color};`);
document.body.appendChild(agent);
document.body.appendChild(score_counter);
document.body.appendChild(world_level_lbl);
document.body.appendChild(pause_status_lbl);
document.body.appendChild(game_over_display);
document.body.appendChild(next_level_display);
document.body.appendChild(lives_lbl);
document.body.appendChild(time_counter);
// **************** Game *****************
// universal controls
let is_paused = false;
let is_game_over = false;
let show_help = false;
let keys_currently_pressed = [];
// physics (taking downward direction as +ve y-axis)
let agent_vy = 0;
let agent_ay = 0;
const ay_gravity = 2;
const terminal_speed = 30;
let jump_vy = -15;
let agent_vx = 0;
// entities
let last_entity = null;
let second_last_entity = null;
const min_pipe_height = 50;
let pipes_per_level = 20; // the number of pipes that must cross the left edge of the screen
let pipes_crossed = 0;
let entity_vx = -15;
let last_used_entity_id = 0;
let temporary_entity_ids = [];
function initializeLevel(show_world_number_at_start = true) {
    let level_code = `W${world}${level}`;
    level_props = LevelDesignMap[level_code];
    time_remaining = time_init;
    time_counter.innerHTML = `Time<br>${time_remaining}`;
    body === null || body === void 0 ? void 0 : body.setAttribute("style", (current_time_hour <= 6 || current_time_hour >= 18)
        ? `background-color: ${level_props.bg_night_color};`
        : `background-color: ${level_props.bg_color};`);
    world_level_lbl.innerHTML = `World<br>${world}-${level}`;
    temporary_entity_ids.forEach((id) => {
        const entity = document.getElementById(id);
        if (entity)
            entity.remove();
    });
    temporary_entity_ids = [];
    last_used_entity_id = 0;
    last_entity = null;
    second_last_entity = null;
    pipes_crossed = 0;
    entity_vx = -15;
    agent.style.top = pixel_str(agent_top_init);
    agent.style.left = pixel_str(agent_left_init);
    agent_ay = 0;
    agent_vy = 0;
    if (show_world_number_at_start && !(world === 1 && level === 1)) {
        is_paused = true;
        next_level_display.textContent = `World ${world}-${level}`;
        next_level_display.style.display = "flex";
        setTimeout(() => {
            next_level_display.style.display = "none";
            is_paused = false;
        }, 3000);
    }
}
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
            if (new_left + entity_width <= 0) {
                destroy_entity(id);
                pipes_crossed++;
            }
        }
    });
}
function handleEntityCreation() {
    if (!last_entity) {
        create_obstacle(0);
        return;
    }
    // get position of the farthest pipe
    const last_entity_style = window.getComputedStyle(last_entity);
    let second_last_entity_style = null;
    if (second_last_entity) {
        second_last_entity_style = window.getComputedStyle(second_last_entity);
    }
    let last_entity_left = pixel_val(last_entity_style.left) + pixel_val(last_entity_style.width);
    let second_last_entity_left = null;
    if (second_last_entity_style) {
        second_last_entity_left = pixel_val(second_last_entity_style.left) + pixel_val(second_last_entity_style.width);
    }
    let farthest_left = (second_last_entity_left != null)
        ? Math.max(last_entity_left, second_last_entity_left)
        : last_entity_left;
    // determine whether to create new obstacle
    if (farthest_left <= window.innerWidth) {
        let horizontal_gap = rand_int(level_props.pipe_horizontal_gap[0], level_props.pipe_horizontal_gap[1]);
        create_obstacle(horizontal_gap);
    }
}
function create_obstacle(horizontal_gap) {
    // randomize the choice of creating top and bottom pipes
    let should_create_top = level_props.has_top_pipe ? rand_int(1, 10) > 2 : false;
    let should_create_bottom = level_props.has_bottom_pipe ? rand_int(1, 10) > 2 : false;
    let bottom_pipe = (should_create_bottom) ? document.createElement("div") : null;
    if (bottom_pipe) {
        bottom_pipe.id = create_entity_id();
        last_entity = bottom_pipe;
    }
    let top_pipe = null;
    if ((!level_props.is_topbottom_independent && should_create_bottom) ||
        (level_props.is_topbottom_independent && should_create_top)) {
        top_pipe = document.createElement("div");
        top_pipe.id = create_entity_id();
        last_entity = top_pipe;
    }
    // apply styling
    let t_pipe_width = rand_int(level_props.pipe_width[0], level_props.pipe_width[1]);
    let b_pipe_width = rand_int(level_props.pipe_width[0], level_props.pipe_width[1]);
    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
    let gap = rand_int(level_props.pipe_gap[0], level_props.pipe_gap[1]);
    let bp_top = rand_int(min_pipe_height + gap, window_height - min_pipe_height);
    if (top_pipe) {
        top_pipe.setAttribute("style", `position: absolute;
            top: 0px;
            left: ${window_width + horizontal_gap}px;
            height: ${bp_top - gap}px;
            width: ${t_pipe_width}px;
            background:
                linear-gradient(to right,rgba(255,255,255,0.2), rgba(0,0,0,0.2)),
                ${level_props.pipe_color};
            border-radius: 0px 0px 10px 10px;
            box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
        `);
        top_pipe.setAttribute("pipe_type", "top");
        document.body.appendChild(top_pipe);
    }
    if (bottom_pipe) {
        bottom_pipe.setAttribute("style", `position: absolute;
            top: ${bp_top}px;
            left: ${window_width + horizontal_gap}px;
            height: ${window_height - bp_top}px;
            width: ${b_pipe_width}px;
            background:
                linear-gradient(to right,rgba(255,255,255,0.2), rgba(0,0,0,0.2)),
                ${level_props.pipe_color};
            border-radius: 10px 10px 0px 0px;
            box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
        `);
        bottom_pipe.setAttribute("pipe_type", "bottom");
        document.body.appendChild(bottom_pipe);
    }
}
function create_entity_id() {
    if (last_used_entity_id > 0) {
        second_last_entity = document.getElementById(last_used_entity_id.toString());
    }
    last_used_entity_id += 1;
    const new_id = last_used_entity_id.toString();
    temporary_entity_ids.push(new_id);
    return new_id;
}
function destroy_entity(id) {
    const entity = document.getElementById(id);
    if (entity) {
        score += score_increment;
        score_counter.innerHTML = `Score<br>${score}`;
        entity.remove();
    }
    const index = temporary_entity_ids.indexOf(id);
    if (index != -1)
        temporary_entity_ids.splice(index, 1);
}
function restart_game() {
    world = 1;
    level = 1;
    pipes_per_level = 20;
    lives_remaining = lives_init;
    lives_lbl.innerHTML = `Lives<br>${lives_remaining}`;
    lives_counter.textContent = `x ${lives_remaining}`;
    initializeLevel();
    score = 0;
    score_counter.innerHTML = `Score<br>${score}`;
    game_over_display.style.display = "none";
    game_over_display.textContent = "GAME OVER";
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
    if (pipes_crossed >= pipes_per_level) {
        entity_vx = 0;
    }
    handleEntities();
    if (entity_vx !== 0) {
        handleEntityCreation();
    }
    if (agent_vy < terminal_speed) {
        agent_vy += agent_ay;
    }
    // agent movement
    agent.style.top = pixel_str(pixel_val(agent.style.top) + agent_vy);
    if (agent_vx > 0 || (agent_vx < 0 && pixel_val(agent.style.left) > 0)) {
        agent.style.left = pixel_str(pixel_val(agent.style.left) + agent_vx);
    }
    if (time_remaining <= 0 || pixel_val(agent.style.top) >= window.innerHeight) {
        set_gameover();
    }
    if (pixel_val(agent.style.left) >= window.innerWidth) {
        if (level < 4) {
            level++;
            initializeLevel();
        }
        else if (world < last_world) {
            world++;
            pipes_per_level = 20 + (world * 5);
            level = 1;
            initializeLevel();
        }
        else
            set_gameover(true);
    }
}
// handling elapsed time
function handleClockTick() {
    if (is_paused || is_game_over)
        return;
    time_remaining--;
    time_counter.innerHTML = `Time<br>${time_remaining}`;
}
function set_gameover(has_won = false) {
    if (lives_remaining > 0 && !has_won) {
        initializeLevel(false);
        is_paused = true;
        lives_display.style.display = "flex";
        lives_remaining--;
        lives_lbl.innerHTML = `Lives<br>${lives_remaining}`;
        setTimeout(() => transition_text(lives_counter, `x ${lives_remaining}`), 750);
        setTimeout(() => {
            lives_display.style.display = "none";
            is_paused = false;
        }, 2000);
        return;
    }
    if (has_won) {
        game_over_display.textContent = "YOU WIN!";
    }
    is_game_over = true;
    game_over_display.style.display = "flex";
}
// handling keyboard presses
function handleKeyPress(e) {
    keys_currently_pressed.push(e.code);
    switch (e.code) {
        case 'ArrowUp':
        case 'KeyJ':
        case 'KeyK':
            handleUpKeyPress(e.code);
            break;
        case 'ArrowLeft':
        case 'KeyD':
            agent_vx = -10;
            break;
        case 'ArrowRight':
        case 'KeyF':
            agent_vx = 10;
            break;
        case 'KeyP':
            if (!is_game_over && !show_help) {
                is_paused = !is_paused;
                if (is_paused) {
                    pause_status_lbl.textContent = "Paused";
                    lives_lbl.style.display = "none";
                }
                else {
                    pause_status_lbl.textContent = "";
                    lives_lbl.style.display = "block";
                }
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
document.addEventListener("keyup", (e) => {
    keys_currently_pressed = keys_currently_pressed.filter(x => x !== e.code);
    if (!keys_currently_pressed.includes("ArrowLeft") &&
        !keys_currently_pressed.includes("ArrowRight") &&
        !keys_currently_pressed.includes("KeyD") &&
        !keys_currently_pressed.includes("KeyF"))
        agent_vx = 0;
});
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
function transition_text(element, new_text, duration = 200) {
    element.classList.add("fade-out");
    setTimeout(() => {
        element.textContent = new_text;
        element.classList.remove("fade-out");
    }, duration);
}
// ***********************************************
initializeLevel();
setInterval(handleClockTick, 1000); // creating timer for time elapsed clock
setInterval(handleTimeTick, 50); // creating universal timer for game
