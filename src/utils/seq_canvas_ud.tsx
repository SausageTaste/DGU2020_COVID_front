import { Canvas2D, Canvas2DUserData } from "./../utils/canvas_2d";

import * as ncl from "./../utils/nucleotide_analyze";


class Vec2 {

    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

}

class RectArea {

    public x: number;
    public y: number;
    public w: number;
    public h: number;

    ////

    constructor(x: number = 0, y: number = 0, w: number = 1, h: number = 1) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public transform(pos_x: number, pos_y: number, scale: number) {
        this.x = (this.x - pos_x) * scale;
        this.y = (this.y - pos_y) * scale;
        this.w = this.w * scale;
        this.h = this.h * scale;
    }

    public is_inside_canvas(canv_width: number, canv_height: number) {
        if (this.x > canv_width) {
            return false;
        }
        if (this.y > canv_height) {
            return false;
        }

        const p1 = this.lower_right();

        if (p1.x < 0) {
            return false;
        }
        if (p1.y < 0) {
            return false;
        }

        return true;
    }

    public upper_left() {
        return new Vec2(this.x, this.y);
    }

    public lower_right() {
        return new Vec2(this.x + this.w, this.y + this.h);
    }

}


function get_mouse_pos_in_element(e: any) {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    return new Vec2(x, y);
}

function set_scroll_state(is_enable: boolean) {
    //const style = document.body.style.overflow;
    document.body.style.overflow = is_enable ? 'auto':'hidden';
}

function clamp(x: number, min_val: number, max_val: number) {
    return Math.min(Math.max(x, min_val), max_val);
}

function positive_mod(x: number, denom: number) {
    for (let i = 0; i < 99999; ++i) {
        x += denom;
        if (x >= 0) {
            break;
        }
    }

    return x % denom;
}

function calc_fisrt_visible_horizontal_rect(cam_pos_x: number, series_offset: number, rect_width: number, rect_gap: number) {
    const numer = cam_pos_x - series_offset - rect_width;
    const denom = rect_width + rect_gap;
    return Math.max(0, Math.ceil(numer / denom));
}

function calc_visible_cell_count(canvas_width: number, cell_step_dist: number, cam_scale: number) {
    return Math.ceil(canvas_width / cell_step_dist / cam_scale) + 1;
}

function select_color_by_nucleic_acid(code: string) {
    if ("A" == code) {
        return [1, 0, 0];
    }
    else if ("G" == code) {
        return [0, 1, 0];
    }
    else if ("C" == code) {
        return [0.2, 0.2, 1];
    }
    else if ("T" == code) {
        return [1, 1, 0];
    }
    else {
        return [1, 1, 1];
    }
}


export class MyCanvas2DUserData implements Canvas2DUserData {

    private mouse_captured_for_translate: boolean = false;
    private mouse_captured_for_scroll: boolean = false;
    private need_redraw: boolean = false;

    private cam_pos = new Vec2(0, 0);
    private cam_scale: number = 1;

    private sequence: string = "";
    private last_mouse_pose: Vec2 = null;
    private canvas_width: number = 1;
    private canvas_height: number = 1;

    private FONT_SIZE: number = 30;
    private CELL_SIZE: Vec2 = new Vec2(40, 45);
    private CELL_SEQ_OFFSET: Vec2 = new Vec2(0, 0);
    private CELL_DISTANCE: number = 5;
    private TRIPLET_CELL_ELEVATION_DIST = 10;
    private TRIPLET_CELL_INDEX_OFFSET = 0;
    private FONT_FAMILY = "Consolas"

    private SCROLL_CTRL_BAR_HEIGHT = 15;
    private SCROLL_CTRL_BAR_MARGIN = 10;

    ////

    public init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.font = `${this.FONT_SIZE}px '${this.FONT_FAMILY}'`;

        this.canvas_width = canvas.width;
        this.canvas_height = canvas.height;
    }

    public update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas_width = canvas.width;
        this.canvas_height = canvas.height;

        if (this.need_redraw) {
            this.draw(canvas, ctx);
        }
    }

    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.bind_cam_near_drawn_area(canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw nucleic acid cells

        const fisrt_cell_index = calc_fisrt_visible_horizontal_rect(
            this.cam_pos.x, this.CELL_SEQ_OFFSET.x, this.CELL_SIZE.x, this.CELL_DISTANCE
        );
        const visible_cell_count = calc_visible_cell_count(canvas.width, this.cell_step_dist(), this.cam_scale);

        for (let i = 0; i < visible_cell_count; i++) {
            const c = this.sequence.charAt(fisrt_cell_index + i);
            if ("" === c) {
                continue;
            }
            this.draw_a_cell(ctx, fisrt_cell_index + i, c);
        }

        // Draw triplet cells

        const first_triplet_cell_index = calc_fisrt_visible_horizontal_rect(
            this.cam_pos.x, this.CELL_SEQ_OFFSET.x, 3*this.CELL_SIZE.x + 2*this.CELL_DISTANCE, this.CELL_DISTANCE
        );
        const visible_triplet_cell_count = calc_visible_cell_count(
            canvas.width, 3*this.CELL_SIZE.x + 3*this.CELL_DISTANCE, this.cam_scale
        );

        for (let i = 0; i < visible_triplet_cell_count; ++i) {
            const index = (first_triplet_cell_index + i) * 3 + positive_mod(this.TRIPLET_CELL_INDEX_OFFSET, 3);
            this.draw_a_triplet_info_box(ctx, index);
        }

        // Draw triplet detail info

        if (null != this.last_mouse_pose) {
            const triplet_index = this.get_current_pointed_triplet_cell();
            if (triplet_index >= 0) {
                this.draw_detail_info_box_for_triplet_cell(ctx, triplet_index);
            }
        }

        // Draw scroll control bar

        this.draw_scroll_control_bar(ctx);

        this.need_redraw = false;
    }

    private draw_scroll_control_bar(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(20, 20, 20, 0.3)";
        ctx.fillRect(
            this.SCROLL_CTRL_BAR_MARGIN,
            this.canvas_height - this.SCROLL_CTRL_BAR_HEIGHT,
            this.canvas_width - this.SCROLL_CTRL_BAR_MARGIN * 2,
            this.canvas_height
        )

        const scroll_ratio = (this.CELL_SEQ_OFFSET.x + this.cam_pos.x + this.canvas_width*0.5/this.cam_scale) / (this.cell_step_dist() * this.sequence.length);
        const indicator_pos_x = this.SCROLL_CTRL_BAR_MARGIN + clamp(scroll_ratio, 0, 1) * (this.canvas_width - 2*this.SCROLL_CTRL_BAR_MARGIN);

        ctx.fillStyle = "rgba(20, 20, 20, 1)";
        ctx.fillRect(
            indicator_pos_x - 1,
            this.canvas_height - this.SCROLL_CTRL_BAR_HEIGHT,
            2,
            this.canvas_height
        )
    }

    private stroke_rect_str(ctx: CanvasRenderingContext2D, text: string, font_size: number,
        x: number, y: number, w: number, h: number,
        r: number, g: number, b: number, a: number,
    ) {

        const rect_rect = new RectArea(x, y, w, h);
        rect_rect.transform(this.cam_pos.x, this.cam_pos.y, this.cam_scale);
        ctx.fillStyle = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
        ctx.fillRect(rect_rect.x, rect_rect.y, rect_rect.w, rect_rect.h);

        const text_rect = new RectArea(x + w / 2, y + (h + font_size) / 2, 0, font_size);
        text_rect.transform(this.cam_pos.x, this.cam_pos.y, this.cam_scale);
        ctx.font = `${text_rect.h}px '${this.FONT_FAMILY}'`;
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillText(text, text_rect.x, text_rect.y);
    }

    private draw_a_cell(ctx: CanvasRenderingContext2D, index: number, char: string) {
        const box_color = select_color_by_nucleic_acid(char);
        this.stroke_rect_str(ctx, char, this.FONT_SIZE,
            this.CELL_SEQ_OFFSET.x + this.cell_step_dist() * index,
            this.CELL_SEQ_OFFSET.y,
            this.CELL_SIZE.x,
            this.CELL_SIZE.y,
            box_color[0], box_color[1], box_color[2], 0.5
        );

        if (index % 6 == 0) {
            const text_rect = new RectArea(
                this.CELL_SEQ_OFFSET.x + this.cell_step_dist() * index,
                this.CELL_SEQ_OFFSET.y + this.CELL_SIZE.y + this.TRIPLET_CELL_ELEVATION_DIST + this.FONT_SIZE,
                0, this.FONT_SIZE
            );
            text_rect.transform(this.cam_pos.x, this.cam_pos.y, this.cam_scale);
            ctx.font = `${text_rect.h}px '${this.FONT_FAMILY}'`;
            ctx.textAlign = "left";
            ctx.fillText("" + index, text_rect.x, text_rect.y);
        }
    }

    private draw_a_triplet_info_box(ctx: CanvasRenderingContext2D, index: number, elevation: number = 0) {
        index = Math.floor(index);

        const triplet = this.sequence.substr(index, 3);
        if (3 != triplet.length) {
            return;
        }
        const text = ncl.translate_standard_code(triplet);

        this.stroke_rect_str(ctx, text, this.FONT_SIZE,
            this.CELL_SEQ_OFFSET.x + this.cell_step_dist() * index,
            this.CELL_SEQ_OFFSET.y - (this.CELL_SIZE.y + this.TRIPLET_CELL_ELEVATION_DIST) * (elevation + 1),
            3 * this.CELL_SIZE.x + 2 * this.CELL_DISTANCE,
            this.CELL_SIZE.y,
            0.8, 0.8, 0.8, 0.5
        );
    }

    public set_seq(seq: string) {
        this.sequence = seq;
        this.need_redraw = true;
    }

    private cell_step_dist() {
        return this.CELL_SIZE.x + this.CELL_DISTANCE;
    }

    private convert_pos_element_to_world(pos_x: number, pos_y: number) {
        return new Vec2(this.cam_pos.x + pos_x / this.cam_scale, this.cam_pos.y + pos_y / this.cam_scale);
    }

    private calc_drawn_area() {
        return new RectArea(
            0,
            -(this.CELL_SIZE.y + this.TRIPLET_CELL_ELEVATION_DIST),
            this.cell_step_dist() * this.sequence.length,
            2 * this.CELL_SIZE.y + this.TRIPLET_CELL_ELEVATION_DIST
        );
    }

    private bind_cam_near_drawn_area(canvas: HTMLCanvasElement) {
        const MARGIN = 100;

        const drawn_area = this.calc_drawn_area();
        drawn_area.transform(this.cam_pos.x, this.cam_pos.y, this.cam_scale);

        if (drawn_area.x > canvas.width - MARGIN) {
            const diff = canvas.width - MARGIN - drawn_area.x;
            this.cam_pos.x -= diff / this.cam_scale;
        }
        else if (drawn_area.x + drawn_area.w < MARGIN) {
            const diff = MARGIN - (drawn_area.x + drawn_area.w);
            this.cam_pos.x -= diff / this.cam_scale;
        }

        if (drawn_area.y > canvas.height - MARGIN) {
            const diff = canvas.height - MARGIN - drawn_area.y;
            this.cam_pos.y -= diff / this.cam_scale;
        }
        else if (drawn_area.y + drawn_area.h < MARGIN) {
            const diff = MARGIN - (drawn_area.y + drawn_area.h);
            this.cam_pos.y -= diff / this.cam_scale;
        }
    }

    private get_current_pointed_triplet_cell(): number {
        if (null === this.last_mouse_pose) {
            return -1;
        }

        const mouse_pos_world = this.convert_pos_element_to_world(this.last_mouse_pose.x, this.last_mouse_pose.y);

        const y_min = this.CELL_SEQ_OFFSET.y - (this.CELL_SIZE.y + this.TRIPLET_CELL_ELEVATION_DIST);
        const y_max = y_min + this.CELL_SIZE.y;
        if (mouse_pos_world.y < y_min || mouse_pos_world.y > y_max) {
            return -1;
        }

        const one_element_width = this.CELL_SIZE.x * 3 + this.CELL_DISTANCE * 3;
        const index_float = mouse_pos_world.x / one_element_width;
        if (index_float < 0) {
            return -1
        }

        return Math.floor(index_float);
    }

    private draw_detail_info_box_for_triplet_cell(ctx: CanvasRenderingContext2D, triplet_index: number) {
        const x_pos_of_triplet = this.CELL_SEQ_OFFSET.x + (3 * this.CELL_SIZE.x + 3 * this.CELL_DISTANCE) * triplet_index;
        const width_of_triplet = 3 * this.CELL_SIZE.x + 2 * this.CELL_DISTANCE;

        const text_rect = new RectArea(
            x_pos_of_triplet + width_of_triplet * 0.5,
            -(2 * this.TRIPLET_CELL_ELEVATION_DIST + this.CELL_SIZE.y),
            0,
            this.FONT_SIZE * 0.7,
        );

        const nucleic_acid_triplet = this.sequence.substr(triplet_index * 3, 3);
        const amino_acid_triple_name = ncl.translate_standard_code(nucleic_acid_triplet);
        const amino_acid_info = ncl.get_amino_acid_info_with_triplet_name(amino_acid_triple_name);
        let amino_acid_text = "unknown";
        if (null != amino_acid_info) {
            amino_acid_text = amino_acid_info.full_name;
        }

        text_rect.transform(this.cam_pos.x, this.cam_pos.y, this.cam_scale);
        ctx.font = `${text_rect.h}px '${this.FONT_FAMILY}'`;
        ctx.textAlign = "center";
        ctx.fillText(amino_acid_text, text_rect.x, text_rect.y);
    }

    private move_cam_to_percentage(percentage: number) {
        const render_area_width = (this.CELL_SIZE.x + this.CELL_DISTANCE) * this.sequence.length;
        const camera_target_pos = this.CELL_SEQ_OFFSET.x - 0.5*this.canvas_width/this.cam_scale + render_area_width*percentage;
        this.cam_pos.x = camera_target_pos;
    }

    private calc_ratio_on_scroll_ctrl_bar(mouse_pos_element_x: number) {
        let progress_ratio = (mouse_pos_element_x - this.SCROLL_CTRL_BAR_MARGIN) / (this.canvas_width - this.SCROLL_CTRL_BAR_MARGIN * 2);
        return clamp(progress_ratio, 0, 1);
    }


    public on_mouse_down(e: React.MouseEvent) {
        const mouse_pos_element = get_mouse_pos_in_element(e);

        if (mouse_pos_element.y > this.canvas_height - this.SCROLL_CTRL_BAR_HEIGHT) {
            this.mouse_captured_for_scroll = true;
            this.mouse_captured_for_translate = false;

            const progress_ratio = this.calc_ratio_on_scroll_ctrl_bar(mouse_pos_element.x);
            this.move_cam_to_percentage(progress_ratio);
        }
        else {
            this.mouse_captured_for_scroll = false;
            this.mouse_captured_for_translate = true;
        }

        this.need_redraw = true;
    }

    public on_mouse_up(e: React.MouseEvent) {
        this.mouse_captured_for_translate = false;
        this.mouse_captured_for_scroll = false;
        this.need_redraw = true;
    }

    public on_mouse_enter(e: React.MouseEvent) {
        this.need_redraw = true;
        set_scroll_state(false);
    }

    public on_mouse_leave(e: React.MouseEvent) {
        this.mouse_captured_for_translate = false;
        this.mouse_captured_for_scroll = false;
        this.need_redraw = true;
        this.last_mouse_pose = null;
        set_scroll_state(true);
    }

    public on_mouse_move(e: React.MouseEvent) {
        this.need_redraw = true;
        const mouse_pos_element = get_mouse_pos_in_element(e);

        if (this.mouse_captured_for_translate) {
            const scalar = 1 / this.cam_scale;

            this.cam_pos.x -= e.movementX * scalar;
            this.cam_pos.y -= e.movementY * scalar;
        }
        else if (this.mouse_captured_for_scroll) {
            const progress_ratio = this.calc_ratio_on_scroll_ctrl_bar(mouse_pos_element.x);
            this.move_cam_to_percentage(progress_ratio);
        }

        this.last_mouse_pose = mouse_pos_element;
    }

    public on_wheel(e: React.WheelEvent) {
        if (0 == e.deltaY) {
            return;
        }

        this.need_redraw = true;

        const mouse_pos_element = get_mouse_pos_in_element(e);
        const mouse_pos_world_before = this.convert_pos_element_to_world(mouse_pos_element.x, mouse_pos_element.y);

        const SCALE_FACTOR = 1.3;
        if (e.deltaY < 0) {
            this.cam_scale *= SCALE_FACTOR;
        }
        else {
            this.cam_scale *= 1 / SCALE_FACTOR;
        }
        this.cam_scale = clamp(this.cam_scale, 1 / 4, 4);

        const mouse_pos_world_after = this.convert_pos_element_to_world(mouse_pos_element.x, mouse_pos_element.y);

        this.cam_pos.x += mouse_pos_world_before.x - mouse_pos_world_after.x;
        this.cam_pos.y += mouse_pos_world_before.y - mouse_pos_world_after.y;
    }

}
