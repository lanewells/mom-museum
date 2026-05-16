import { Vector3 } from "three"

export const CAMERA_START = {
  position: [0, 2.5, 7] as [number, number, number],
  target: [0, 1.3, -1.8] as [number, number, number]
}

export type CameraState = {
  position: Vector3
  target: Vector3
}
