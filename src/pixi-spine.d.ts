declare module "@/pixi-spine" {
  import * as PIXI from "pixi.js";

  export class Spine extends PIXI.Container {
    constructor(spineData: any);
    state: any;
  }
}
