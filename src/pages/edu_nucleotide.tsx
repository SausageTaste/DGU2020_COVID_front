import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';

import i18n from './../i18n';
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
        this.x = (this.x + pos_x) * scale;
        this.y = (this.y + pos_y) * scale;
        this.w = this.w * scale;
        this.h = this.h * scale;
    }

}


class MyCanvas2DUserData implements Canvas2DUserData {

    private mouse_captured: boolean = false;

    private cam_pos = new Vec2(35, 40);
    private cam_scale: number = 2;

    private FONT_SIZE: number = 30;
    private CELL_SIZE: Vec2 = new Vec2(35, 40);

    ////

    public init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.font = `${this.FONT_SIZE}px 'Malgun Gothic'`;
        ctx.textAlign = "center";
    }

    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.draw_a_cell(ctx, 0, "A");
        this.draw_a_cell(ctx, 1, "B");
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
        this.draw_a_rect_char(ctx, 40 * index, 0, char);
    }


    public on_mouse_down(e: React.MouseEvent) {
        this.mouse_captured = true;
    }

    public on_mouse_up(e: React.MouseEvent) {
        this.mouse_captured = false;
    }

    public on_mouse_leave(e: React.MouseEvent) {
        this.mouse_captured = false;
    }

    public on_mouse_move(e: React.MouseEvent) {
        const scalar = 1 / this.cam_scale;

        if (this.mouse_captured) {
            this.cam_pos.x += e.movementX * scalar;
            this.cam_pos.y += e.movementY * scalar;
        }
    }


}


interface EduNucleotideProps {

}

interface EduNucleotideState {
    interval: NodeJS.Timeout;
}

export class EduNucleotide extends React.Component<EduNucleotideProps, EduNucleotideState> {

    private canvas_id: string = "the_canvas";

    ////

    constructor(props: EduNucleotideProps) {
        super(props);

        this.state = {
            interval: null,
        };
    }

    public render() {
        return (
            <div>
                <Header as='h1' dividing>{i18n.t("title_edu_nucleotide")}</Header>

                <Segment basic textAlign='center'>
                    <Canvas2D id={this.canvas_id} width="800" height="450" fps={60} userdata={new MyCanvas2DUserData()} />
                </Segment>
            </div>
        );
    }

}
