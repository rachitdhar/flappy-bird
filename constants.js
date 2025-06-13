export var Colors;
(function (Colors) {
    Colors["WHITE"] = "rgb(255, 255, 255)";
    Colors["DARK_GREEN"] = "rgb(8, 66, 3)";
    Colors["GREEN"] = "rgb(36, 193, 22)";
    Colors["SKY_BLUE"] = "rgb(156, 219, 233)";
    Colors["NIGHT_BLUE"] = "rgb(1, 18, 45)";
    Colors["OVERLAY_DARK"] = "rgba(0,0,0,0.5)";
    Colors["BLUE"] = "rgb(63, 175, 239)";
    Colors["ROCK_GRAY"] = "rgb(94, 92, 92)";
    Colors["DARK_GRAY"] = "rgb(43, 42, 42)";
    Colors["BLACK"] = "rgb(0, 0, 0)";
    Colors["SUNSET_GRASS"] = "rgb(255, 200, 150)";
    Colors["SUNSET_NIGHT"] = "rgb(100, 30, 0)";
    Colors["MINE_BROWN"] = "rgb(139, 69, 19)";
    Colors["MINE_NIGHT"] = "rgb(60, 30, 10)";
    Colors["MINE_PIPE"] = "rgb(160, 82, 45)";
    Colors["SKY_MOUNTAIN_DAY"] = "rgb(135, 206, 235)";
    Colors["SKY_MOUNTAIN_NIGHT"] = "rgb(25, 25, 112)";
    Colors["LUSH_GRASS"] = "rgb(34, 139, 34)";
    Colors["LUSH_NIGHT"] = "rgb(0, 50, 0)";
    Colors["ICY_CAVE_DAY"] = "rgb(176, 224, 230)";
    Colors["ICY_CAVE_NIGHT"] = "rgb(0, 51, 102)";
    Colors["ICY_PIPE"] = "rgb(173, 216, 230)";
    Colors["SNOWY_NIGHT"] = "rgb(220, 220, 220)";
    Colors["FROZEN_CASTLE_DAY"] = "rgb(169, 169, 169)";
    Colors["FROZEN_CASTLE_NIGHT"] = "rgb(40, 40, 40)";
    Colors["FROZEN_PIPE"] = "rgb(192, 192, 192)";
    Colors["AUTUMN_GRASS"] = "rgb(255, 165, 0)";
    Colors["AUTUMN_NIGHT"] = "rgb(139, 69, 19)";
    Colors["AUTUMN_PIPE"] = "rgb(255, 140, 0)";
    Colors["LAVA_CAVE_DAY"] = "rgb(178, 34, 34)";
    Colors["LAVA_CAVE_NIGHT"] = "rgb(70, 0, 0)";
    Colors["LAVA_PIPE"] = "rgb(255, 69, 0)";
    Colors["HIGH_SKY_DAY"] = "rgb(135, 206, 250)";
    Colors["HIGH_SKY_NIGHT"] = "rgb(0, 0, 128)";
})(Colors || (Colors = {}));
export const LevelDesignMap = {
    "W11": {
        bg_color: Colors.SKY_BLUE,
        bg_night_color: Colors.SKY_BLUE,
        pipe_color: Colors.GREEN,
        pipe_width: [50, 300],
        pipe_gap: [120, 180],
        pipe_horizontal_gap: [80, 200],
        is_topbottom_independent: true,
        has_top_pipe: false,
        has_bottom_pipe: true
    },
    "W12": {
        bg_color: Colors.NIGHT_BLUE,
        bg_night_color: Colors.NIGHT_BLUE,
        pipe_color: Colors.BLUE,
        pipe_width: [50, 200],
        pipe_gap: [140, 220],
        pipe_horizontal_gap: [80, 200],
        is_topbottom_independent: true,
        has_top_pipe: true,
        has_bottom_pipe: true
    },
    "W13": {
        bg_color: Colors.DARK_GREEN,
        bg_night_color: Colors.DARK_GREEN,
        pipe_color: Colors.GREEN,
        pipe_width: [50, 500],
        pipe_gap: [140, 240],
        pipe_horizontal_gap: [100, 200],
        is_topbottom_independent: true,
        has_top_pipe: true,
        has_bottom_pipe: true
    },
    "W14": {
        bg_color: Colors.DARK_GRAY,
        bg_night_color: Colors.DARK_GRAY,
        pipe_color: Colors.ROCK_GRAY,
        pipe_width: [50, 500],
        pipe_gap: [130, 200],
        pipe_horizontal_gap: [80, 200],
        is_topbottom_independent: true,
        has_top_pipe: false,
        has_bottom_pipe: true
    },
    "W21": {
        bg_color: Colors.SUNSET_GRASS,
        bg_night_color: Colors.SUNSET_NIGHT,
        pipe_color: Colors.GREEN,
        pipe_width: [60, 250],
        pipe_gap: [120, 180],
        pipe_horizontal_gap: [80, 180],
        is_topbottom_independent: false,
        has_top_pipe: false,
        has_bottom_pipe: true
    },
    "W22": {
        bg_color: Colors.MINE_BROWN,
        bg_night_color: Colors.MINE_NIGHT,
        pipe_color: Colors.MINE_PIPE,
        pipe_width: [40, 180],
        pipe_gap: [140, 220],
        pipe_horizontal_gap: [80, 150],
        is_topbottom_independent: true,
        has_top_pipe: true,
        has_bottom_pipe: true
    },
    "W23": {
        bg_color: Colors.SKY_MOUNTAIN_DAY,
        bg_night_color: Colors.SKY_MOUNTAIN_NIGHT,
        pipe_color: Colors.ROCK_GRAY,
        pipe_width: [50, 400],
        pipe_gap: [140, 240],
        pipe_horizontal_gap: [100, 200],
        is_topbottom_independent: true,
        has_top_pipe: true,
        has_bottom_pipe: true
    },
    "W24": {
        bg_color: Colors.DARK_GRAY,
        bg_night_color: Colors.BLACK,
        pipe_color: Colors.OVERLAY_DARK,
        pipe_width: [60, 500],
        pipe_gap: [130, 180],
        pipe_horizontal_gap: [80, 150],
        is_topbottom_independent: false,
        has_top_pipe: true,
        has_bottom_pipe: true
    },
    "W31": {
        bg_color: Colors.LUSH_GRASS,
        bg_night_color: Colors.LUSH_NIGHT,
        pipe_color: Colors.GREEN,
        pipe_width: [70, 300],
        pipe_gap: [130, 180],
        pipe_horizontal_gap: [70, 170],
        is_topbottom_independent: true,
        has_top_pipe: false,
        has_bottom_pipe: true
    },
    "W32": {
        bg_color: Colors.ICY_CAVE_DAY,
        bg_night_color: Colors.ICY_CAVE_NIGHT,
        pipe_color: Colors.ICY_PIPE,
        pipe_width: [30, 150],
        pipe_gap: [150, 230],
        pipe_horizontal_gap: [80, 180],
        is_topbottom_independent: true,
        has_top_pipe: true,
        has_bottom_pipe: true
    },
    "W33": {
        bg_color: Colors.WHITE,
        bg_night_color: Colors.SNOWY_NIGHT,
        pipe_color: Colors.ROCK_GRAY,
        pipe_width: [40, 350],
        pipe_gap: [150, 250],
        pipe_horizontal_gap: [100, 180],
        is_topbottom_independent: true,
        has_top_pipe: true,
        has_bottom_pipe: true
    },
    "W34": {
        bg_color: Colors.FROZEN_CASTLE_DAY,
        bg_night_color: Colors.FROZEN_CASTLE_NIGHT,
        pipe_color: Colors.FROZEN_PIPE,
        pipe_width: [50, 500],
        pipe_gap: [130, 180],
        pipe_horizontal_gap: [80, 140],
        is_topbottom_independent: false,
        has_top_pipe: true,
        has_bottom_pipe: true
    },
    "W41": {
        bg_color: Colors.AUTUMN_GRASS,
        bg_night_color: Colors.AUTUMN_NIGHT,
        pipe_color: Colors.AUTUMN_PIPE,
        pipe_width: [60, 280],
        pipe_gap: [130, 180],
        pipe_horizontal_gap: [80, 180],
        is_topbottom_independent: true,
        has_top_pipe: false,
        has_bottom_pipe: true
    },
    "W42": {
        bg_color: Colors.LAVA_CAVE_DAY,
        bg_night_color: Colors.LAVA_CAVE_NIGHT,
        pipe_color: Colors.LAVA_PIPE,
        pipe_width: [40, 200],
        pipe_gap: [140, 200],
        pipe_horizontal_gap: [80, 150],
        is_topbottom_independent: true,
        has_top_pipe: true,
        has_bottom_pipe: true
    },
    "W43": {
        bg_color: Colors.HIGH_SKY_DAY,
        bg_night_color: Colors.HIGH_SKY_NIGHT,
        pipe_color: Colors.WHITE,
        pipe_width: [30, 200],
        pipe_gap: [160, 300],
        pipe_horizontal_gap: [120, 220],
        is_topbottom_independent: true,
        has_top_pipe: true,
        has_bottom_pipe: true
    },
    "W44": {
        bg_color: Colors.BLACK,
        bg_night_color: Colors.BLACK,
        pipe_color: Colors.OVERLAY_DARK,
        pipe_width: [60, 500],
        pipe_gap: [120, 160],
        pipe_horizontal_gap: [80, 140],
        is_topbottom_independent: false,
        has_top_pipe: true,
        has_bottom_pipe: true
    }
};
