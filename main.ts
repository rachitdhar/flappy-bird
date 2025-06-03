
// initializing all HTML elements
const agent: HTMLDivElement = document.createElement("div"); agent.id = "agent";
const score_counter: HTMLLabelElement = document.createElement("label"); score_counter.id = "score_counter";
const pause_status_lbl: HTMLLabelElement = document.createElement("label"); pause_status_lbl.id = "pause_status_lbl";
const game_over_display: HTMLLabelElement = document.createElement("label"); game_over_display.id = "game_over_display";

const agent_size: number = 30;
const agent_left_init: number = 200;
const agent_top_init: number = 200;
let score: number = 0;
const score_increment: number = 10;

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
let is_paused: boolean = false;
let is_game_over: boolean = false;

// physics (taking downward direction as +ve y-axis)
let agent_vy: number = 0;
let agent_ay: number = 0;
const ay_gravity: number = 2;
let jump_vy: number = -15;

// entities
const min_obstacle_gap: number = 100;
const max_obstacle_gap: number = 200;
const pipe_width: number = 50;
const min_pipe_height: number = 50;

const entity_vx: number = -15;
let last_used_entity_id: number = 0;
let temporary_entity_ids: string[] = [];

function handleEntities(): void {
    temporary_entity_ids.forEach((id: string) => {
        const entity = document.getElementById(id);
        if (entity) {
            let entity_style: CSSStyleDeclaration = window.getComputedStyle(entity);
            let agent_style: CSSStyleDeclaration = window.getComputedStyle(agent);

            let current_left: number = pixel_val(entity_style.left);
            let entity_width: number = pixel_val(entity_style.width);
            let entity_height: number = pixel_val(entity_style.height);
            let entity_top: number = pixel_val(entity_style.top);
            let new_left: number = current_left + entity_vx;

            entity.style.left = pixel_str(new_left);    // move the entities to the left

            // handle collision with entity
            if (
                pixel_val(agent_style.left) + agent_size > current_left &&
                pixel_val(agent_style.left) < current_left + entity_width &&
                ((
                    entity.getAttribute("pipe_type") === "bottom" &&
                    pixel_val(agent_style.top) + agent_size > entity_top
                ) ||
                (
                    entity.getAttribute("pipe_type") === "top" &&
                    pixel_val(agent_style.top) < entity_top + entity_height
                ))
            ) {
                set_gameover();
            }
            
            // remove entity after it leaves the screen
            if (new_left + entity_width <= 0)
                destroy_entity(id);
        }
    });
}

function create_obstacle(): void {
    const bottom_pipe: HTMLDivElement = document.createElement("div");
    const top_pipe: HTMLDivElement = document.createElement("div");
    bottom_pipe.id = create_entity_id();
    top_pipe.id = create_entity_id();

    let window_width: number = window.innerWidth;
    let window_height: number = window.innerHeight;
    let gap: number = rand_int(min_obstacle_gap, max_obstacle_gap);
    let bp_top: number = rand_int(min_pipe_height + gap, window_height - min_pipe_height);

    bottom_pipe.setAttribute("style", `position: absolute; top: ${bp_top}px; left: ${window_width}px; height: ${window_height - bp_top}px; width: ${pipe_width}px; background-color:rgb(36, 193, 22);`);
    top_pipe.setAttribute("style", `position: absolute; top: 0px; left: ${window_width}px; height: ${bp_top - gap}px; width: ${pipe_width}px; background-color: rgb(36, 193, 22);`);
    bottom_pipe.setAttribute("pipe_type", "bottom");
    top_pipe.setAttribute("pipe_type", "top");

    document.body.appendChild(bottom_pipe);
    document.body.appendChild(top_pipe);
}

function create_entity_id(): string {
    const new_id: string = last_used_entity_id.toString();
    last_used_entity_id += 1;
    temporary_entity_ids.push(new_id);
    return new_id;
}

function destroy_entity(id: string): void {
    const entity = document.getElementById(id);
    if (entity) {
        if (entity.getAttribute("pipe_type") === "bottom") {
            score += score_increment;
            score_counter.textContent = `Score: ${score}`;
        }
        entity.remove();
    }
    
    const index: number = temporary_entity_ids.indexOf(id);
    if (index != -1) temporary_entity_ids.splice(index, 1);
}

function restart_game(): void {
    temporary_entity_ids.forEach((id: string) => {
        const entity = document.getElementById(id);
        if (entity) entity.remove();
    });
    temporary_entity_ids = [];
    last_used_entity_id = 0;

    agent.style.top = pixel_str(agent_top_init);
    score = 0;
    score_counter.textContent = `Score: ${score}`;

    game_over_display.style.display = "none";
    is_game_over = false;
    is_paused = false;
}

// **************** Core *****************

function handleUpKeyPress(): void {    
    agent_vy = jump_vy;
    agent_ay = ay_gravity;
}

function handleTimeTick(): void {
    if (is_paused || is_game_over) return;

    handleEntities();

    agent_vy += agent_ay;
    agent.style.top = pixel_str(pixel_val(agent.style.top) + agent_vy);
}

// handling elapsed time
function handleClockTick(): void {
    if (is_paused || is_game_over) return;

    create_obstacle();
}

function set_gameover(): void {
    is_game_over = true;
    game_over_display.style.display = "flex";
}

// handling keyboard presses
function handleKeyPress(e: KeyboardEvent) {
    switch (e.code) {
        case 'ArrowUp':
            handleUpKeyPress();
            break;
        case 'Space':
            if (is_game_over) {
                restart_game();
            } else {
                is_paused = !is_paused;
                if (is_paused) pause_status_lbl.textContent = "Paused";
                else pause_status_lbl.textContent = "";
            }
        default: break;
    }
}
document.addEventListener("keydown", (e: KeyboardEvent) => handleKeyPress(e));

setInterval(handleClockTick, 1000);     // creating timer for time elapsed clock
setInterval(handleTimeTick, 50);        // creating universal timer for game

// ****************** Helper ********************

function pixel_val(data: string): number {
    let val: string = data.slice(0, data.indexOf("px"));
    return parseInt(val);
}

function pixel_str(data: number): string {
    return `${data}px`;
}

// generate random integer betweeen min and max (min and max included)
function rand_int(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
