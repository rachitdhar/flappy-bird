export enum Colors {
    WHITE = "rgb(255, 255, 255)",
    GREEN = "rgb(36, 193, 22)",
    SKY_BLUE = "rgb(156, 219, 233)",
    NIGHT_BLUE = "rgb(1, 18, 45)",
    OVERLAY_DARK = "rgba(0,0,0,0.5)",
    BLUE = "rgb(63, 175, 239)",
    ROCK_GRAY = "rgb(94, 92, 92)",
    BLACK = "rgb(0, 0, 0)"
};

export type LevelProperties = {
    bg_image?: string,
    bg_night_image?: string,
    pipe_color: string,
    pipe_width: number[],               // [min, max]
    pipe_gap: number[],                 // [min, max]
    pipe_horizontal_gap: number[],      // [min, max]
    is_topbottom_independent: boolean,
    has_top_pipe: boolean,
    has_bottom_pipe: boolean
};

export const LevelDesignMap: { [level_code: string]: LevelProperties } = {
    // ****** WORLD 1 ******
    "W11": {                            // Green fields
        bg_image: "url('resources/mountain_sky_bg.png')",
        bg_night_image: "url('resources/mountain_sky_night_bg.png')",
        pipe_color: Colors.GREEN,
        pipe_width: [50, 300],
        pipe_gap: [100, 200],
        pipe_horizontal_gap: [0, 200],
        is_topbottom_independent: true,
        has_top_pipe: false,
        has_bottom_pipe: true
    },
    "W12": {                            // Cave
        bg_image: "url('resources/cave_bg.png')",
        bg_night_image: "url('resources/cave_bg.png')",
        pipe_color: Colors.BLUE,
        pipe_width: [50, 300],
        pipe_gap: [100, 200],
        pipe_horizontal_gap: [0, 200],
        is_topbottom_independent: true,
        has_top_pipe: false,
        has_bottom_pipe: true
    },
    "W13": {                            // Mountains
        pipe_color: Colors.GREEN,
        pipe_width: [50, 500],
        pipe_gap: [100, 200],
        pipe_horizontal_gap: [0, 200],
        is_topbottom_independent: true,
        has_top_pipe: false,
        has_bottom_pipe: true
    },
    "W14": {                            // Castle
        pipe_color: Colors.ROCK_GRAY,
        pipe_width: [50, 500],
        pipe_gap: [100, 200],
        pipe_horizontal_gap: [0, 200],
        is_topbottom_independent: true,
        has_top_pipe: false,
        has_bottom_pipe: true
    }
};