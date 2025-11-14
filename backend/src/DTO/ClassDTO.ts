import { Level, PartExercised } from "../generated/prisma";

export interface ClassDTO {
  exercise_name: string;
  level: Level;
  image_url: string;
  video_url: string;
  part_exercised: PartExercised;
  description: string;
}

export interface UpdateClassDTO {
  exercise_name?: string;
  level?: Level;
  image_url?: string;
  video_url?: string;
  part_exercised?: PartExercised;
  description?: string;
}
