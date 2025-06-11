export var Colors;
(function (Colors) {
    Colors["WHITE"] = "rgb(255, 255, 255)";
    Colors["GREEN"] = "rgb(36, 193, 22)";
    Colors["SKY_BLUE"] = "rgb(156, 219, 233)";
    Colors["NIGHT_BLUE"] = "rgb(1, 18, 45)";
    Colors["OVERLAY_DARK"] = "rgba(0,0,0,0.5)";
    Colors["BLACK"] = "rgb(0, 0, 0)";
})(Colors || (Colors = {}));
;
export const LevelDesignMap = {
    // ****** WORLD 1 ******
    "W11": {
        bg_image: "url('resources/mountain_sky_bg.png')",
        bg_night_image: "url('resources/mountain_sky_night_bg.png')",
        pipe_color: Colors.GREEN
    },
    "W12": {
        bg_image: "url('resources/cave_bg.png')",
        bg_night_image: "url('resources/cave_bg_bg.png')",
        pipe_color: Colors.GREEN
    },
    "W13": {
        pipe_color: Colors.GREEN
    },
    "W14": {
        pipe_color: Colors.GREEN
    }
};
