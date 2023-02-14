var CURSOR;

interface Pos {
  x: number
  y: number
};

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

class Cursor {
  pos: { curr: Pos | null; prev: Pos | null };
  cursor: any;
  scr: any;
  constructor(con: HTMLElement) {
    this.pos = {
      curr: null,
      prev: null,
    };
    this.create(con);
    this.init();
    this.render();
  }

  move(left: number, top: number) {
    this.cursor.style['left'] = `${left}px`;
    this.cursor.style['top'] = `${top}px`;
  }

  create(con: HTMLElement) {
    if (!this.cursor) {
      this.cursor = document.createElement('div');
      this.cursor.id = 'cursor';
      this.cursor.classList.add('hidden');
      con.append(this.cursor);
    }
  }

  refresh() {
    this.scr.remove();
    this.cursor.classList.remove('active');
    this.pos = {
      curr: null,
      prev: null,
    };

    this.init();
    this.render();
  }

  init() {
    document.onmousemove = (e) => {
      this.pos.curr == null && this.move(e.clientX - 8, e.clientY - 8);
      this.pos.curr = {
        x: e.clientX - 8,
        y: e.clientY - 8,
      };
      this.cursor.classList.remove('hidden');
    };
    document.onmouseenter = (e) => this.cursor.classList.remove('hidden');
    document.onmouseleave = (e) => this.cursor.classList.add('hidden');
    document.onmousedown = (e) => this.cursor.classList.add('active');
    document.onmouseup = (e) => this.cursor.classList.remove('active');
  }

  render() {
    if (this.pos.prev && this.pos.curr) {
      this.pos.prev.x = lerp(this.pos.prev.x, this.pos.curr.x, 0.35);
      this.pos.prev.y = lerp(this.pos.prev.y, this.pos.curr.y, 0.35);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }
}

const cursorInit = (con: HTMLElement) => {
  CURSOR = new Cursor(con);
};

export default cursorInit;
