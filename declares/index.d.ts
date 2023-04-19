declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}
declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.mp3" {
  const content: string;
  export default content;
}
declare module "*.MP4" {
  const content: string;
  export default content;
}

declare module "*.mp4" {
  const content: string;
  export default content;
}