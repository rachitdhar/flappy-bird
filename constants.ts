export enum Colors {
    WHITE = "rgb(255, 255, 255)",
    GREEN = "rgb(36, 193, 22)",
    SKY_BLUE = "rgb(156, 219, 233)",
    NIGHT_BLUE = "rgb(1, 18, 45)",
    OVERLAY_DARK = "rgba(0,0,0,0.5)",
    BLACK = "rgb(0, 0, 0)"
};

export type LevelProperties = {
    bg_image?: string,
    bg_night_image?: string,
    pipe_color?: string
};

export const LevelDesignMap: { [level_code: string]: LevelProperties } = {
    // ****** WORLD 1 ******
    "W11": {                            // Green fields
        bg_image: "url('resources/mountain_sky_bg.png')",
        bg_night_image: "url('resources/mountain_sky_night_bg.png')",
        pipe_color: Colors.GREEN
    },
    "W12": {                            // Cave
        bg_image: "url('resources/cave_bg.png')",
        bg_night_image: "url('resources/cave_bg_bg.png')",
        pipe_color: Colors.GREEN
    },
    "W13": {                            // Mountains
        
        pipe_color: Colors.GREEN
    },
    "W14": {                            // Castle
        
        pipe_color: Colors.GREEN
    }
};