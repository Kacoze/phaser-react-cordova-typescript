import * as Phaser from "phaser";
import Controlls from "./controlls";

export class Bird extends Phaser.GameObjects.Sprite {
  private anim: Phaser.Tweens.Tween[];
  private isDead: boolean = false;
  private isFlapping: boolean = false;
  private controlls: Controlls;

  public getDead(): boolean {
    return this.isDead;
  }

  public setDead(dead): void {
    this.isDead = dead;
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // image
    this.setScale(3);
    this.setOrigin(0, 0);

    // physics
    this.scene.physics.world.enable(this);
    this.body.setGravityY(1000);
    this.body.setSize(17, 12);

    // animations & tweens
    this.anim = [];
    this.anim.push(
      this.scene.tweens.add({
        targets: this,
        duration: 100,
        angle: -20
      })
    );

    this.scene.add.existing(this);
    this.controlls = new Controlls(this.scene);
  }

  update(): void {
    this.handleAngleChange();
    this.handleInput();
    this.isOffTheScreen();
  }

  private handleInput(): void {
    if(this.controlls.jump()) {
      // if (!this.isFlapping) {
        this.flap();
      // } else {
      //   this.isFlapping = false;
      // }
    }
  }

  private handleAngleChange(): void {
    if (this.angle < 20) {
      this.angle += 1;
    }
  }

  public flap(): void {
    this.isFlapping = true;
    this.body.setVelocityY(-350);
    this.anim[0].restart();
  }

  private isOffTheScreen(): void {
    if (this.y + this.height > this.scene.sys.canvas.height) {
      this.isDead = true;
    }
  }
}
