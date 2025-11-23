declare module "*.svg" {
  import * as React from "react";

  // Let TypeScript know that imported SVGs are valid React components
  const SVGComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default SVGComponent;
}
declare module "*.json" {
  const value: any;
  export default value;
}

