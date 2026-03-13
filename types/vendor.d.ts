declare module "spark-md5" {
  export default class SparkMD5 {
    static hash(value: string): string;
    static ArrayBuffer: {
      new (): {
        append(data: ArrayBuffer): void;
        end(raw?: boolean): string;
      };
    };
  }
}

declare module "less" {
  const less: {
    render(input: string): Promise<{ css: string }>;
  };

  export default less;
}

declare module "image-compare-viewer" {
  type LabelOptions = {
    before?: string;
    after?: string;
    onHover?: boolean;
  };

  type ImageCompareSettings = {
    controlColor?: string;
    controlShadow?: boolean;
    addCircle?: boolean;
    addCircleBlur?: boolean;
    showLabels?: boolean;
    labelOptions?: LabelOptions;
    smoothing?: boolean;
    smoothingAmount?: number;
    hoverStart?: boolean;
    verticalMode?: boolean;
    startingPoint?: number;
    fluidMode?: boolean;
  };

  export default class ImageCompare {
    constructor(el: HTMLElement, settings?: ImageCompareSettings);
    mount(): void;
  }
}

declare module "opencc-js" {
  export function Converter(options: {
    from: "cn" | "tw" | "hk" | "jp" | "t";
    to: "cn" | "tw" | "hk" | "jp" | "t" | "twp";
  }): (input: string) => string;
}
