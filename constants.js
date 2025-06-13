export var Colors;
(function (Colors) {
    Colors["WHITE"] = "rgb(255, 255, 255)";
    Colors["GREEN"] = "rgb(36, 193, 22)";
    Colors["SKY_BLUE"] = "rgb(156, 219, 233)";
    Colors["NIGHT_BLUE"] = "rgb(1, 18, 45)";
    Colors["OVERLAY_DARK"] = "rgba(0,0,0,0.5)";
    Colors["BLUE"] = "rgb(63, 175, 239)";
    Colors["ROCK_GRAY"] = "rgb(94, 92, 92)";
    Colors["BLACK"] = "rgb(0, 0, 0)";
})(Colors || (Colors = {}));
;
export const LevelDesignMap = {
    // ****** WORLD 1 ******
    "W11": {
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
    "W12": {
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
    "W13": {
        pipe_color: Colors.GREEN,
        pipe_width: [50, 500],
        pipe_gap: [100, 200],
        pipe_horizontal_gap: [0, 200],
        is_topbottom_independent: true,
        has_top_pipe: false,
        has_bottom_pipe: true
    },
    "W14": {
        pipe_color: Colors.ROCK_GRAY,
        pipe_width: [50, 500],
        pipe_gap: [100, 200],
        pipe_horizontal_gap: [0, 200],
        is_topbottom_independent: true,
        has_top_pipe: false,
        has_bottom_pipe: true
    }
};
