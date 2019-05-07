import * as Phaser from "phaser";

export default class Controlls {
  private currentScene: Phaser.Scene;
  public pointer: Phaser.Input.Pointer;
  constructor(currentScene: Phaser.Scene) {
    this.currentScene = currentScene;
    this.pointer = this.currentScene.input.activePointer;
  }

  public left(): boolean {
    let pointerAction = false;
    if (this.pointer.isDown && this.pointer.x < this.currentScene.sys.canvas.width / 2) {
      pointerAction = true;
    }
    return pointerAction;
  }

  public right(): boolean {
    let pointerAction = false;
    if (this.pointer.isDown && this.pointer.x > this.currentScene.sys.canvas.width / 2) {
      pointerAction = true;
    }
    return pointerAction;
  }

  public jump(): boolean {
    const isUp = this.pointer.justDown;
    this.pointer.justDown = false;
    return isUp;
  }
}