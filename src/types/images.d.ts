declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import React from 'react';

  type SVGAndHTMLProps = React.SVGAttributes<SVGElement> | React.HTMLAttributes<SVGElement>
  const ReactComponent: React.FunctionComponent<SVGAndHTMLProps>;
  export default ReactComponent;
}

declare module '*.svg?url' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}
