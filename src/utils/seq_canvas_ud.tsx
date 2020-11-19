import { Canvas2D, Canvas2DUserData } from "./../utils/canvas_2d";


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


export class MyCanvas2DUserData implements Canvas2DUserData {

    private mouse_captured: boolean = false;

    private cam_pos = new Vec2(0, 0);
    private cam_scale: number = 1;

    private sequence: string = "";

    private FONT_SIZE: number = 30;
    private CELL_SIZE: Vec2 = new Vec2(35, 40);
    private CELL_SEQ_OFFSET: Vec2 = new Vec2(0, 0);
    private CELL_DISTANCE: number = 5;

    ////

    public init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.font = `${this.FONT_SIZE}px 'Malgun Gothic'`;
        ctx.textAlign = "center";
    }

    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const fisrt_cell_index = this.calc_first_visible_cell_index_in_world();
        const visible_cell_count = this.calc_visible_cell_count(canvas.width);

        for (let i = 0; i < visible_cell_count; i++) {
            const c = this.sequence.charAt(fisrt_cell_index + i);
            this.draw_a_cell(ctx, fisrt_cell_index + i, c);
        }
    }

    private draw_a_rect_char(ctx: CanvasRenderingContext2D, pos_x: number, pos_y: number, char: string) {
        ctx.fillStyle = "rgba(0, 0, 0, 1)";

        const rect_rect = new RectArea(pos_x, pos_y, this.CELL_SIZE.x, this.CELL_SIZE.y);
        rect_rect.transform(this.cam_pos.x, this.cam_pos.y, this.cam_scale);
        ctx.strokeRect(rect_rect.x, rect_rect.y, rect_rect.w, rect_rect.h);

        const text_rect = new RectArea(
            pos_x + this.CELL_SIZE.x / 2,
            pos_y + (this.CELL_SIZE.y + this.FONT_SIZE) / 2,
            0,
            this.FONT_SIZE
        );
        text_rect.transform(this.cam_pos.x, this.cam_pos.y, this.cam_scale);
        ctx.font = `${text_rect.h}px 'Malgun Gothic'`;
        ctx.fillText(char, text_rect.x, text_rect.y);
    }

    private draw_a_cell(ctx: CanvasRenderingContext2D, index: number, char: string) {
        this.draw_a_rect_char(ctx, this.CELL_SEQ_OFFSET.x + this.cell_step_dist() * index, this.CELL_SEQ_OFFSET.y, char);
    }

    public set_seq(seq: string) {
        this.sequence = seq;
    }

    private cell_step_dist() {
        return this.CELL_SIZE.x + this.CELL_DISTANCE;
    }

    private calc_first_visible_cell_index_in_world() {
        const numerator = this.cam_pos.x - this.CELL_SEQ_OFFSET.x - this.CELL_SIZE.x;
        const result = Math.ceil(numerator / this.cell_step_dist());
        return Math.max(result, 0);
    }

    private calc_visible_cell_count(canvas_width: number) {
        return Math.ceil(canvas_width / this.cell_step_dist() / this.cam_scale) + 1;
    }

    private convert_pos_element_to_world(pos_x: number, pos_y: number) {
        return new Vec2(this.cam_pos.x + pos_x / this.cam_scale, this.cam_pos.y + pos_y / this.cam_scale);
    }


    public on_mouse_down(e: React.MouseEvent) {
        this.mouse_captured = true;
    }

    public on_mouse_up(e: React.MouseEvent) {
        this.mouse_captured = false;
    }

    public on_mouse_enter(e: React.MouseEvent) {
        set_scroll_state(false);
    }

    public on_mouse_leave(e: React.MouseEvent) {
        this.mouse_captured = false;
        set_scroll_state(true);
    }

    public on_mouse_move(e: React.MouseEvent) {
        const scalar = 1 / this.cam_scale;

        if (this.mouse_captured) {
            this.cam_pos.x -= e.movementX * scalar;
            this.cam_pos.y -= e.movementY * scalar;
        }
    }

    public on_wheel(e: React.WheelEvent) {
        if (0 == e.deltaY) {
            return;
        }

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
