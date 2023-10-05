//
//  Utils.ts
//
//  Created by Lars Rothaus on 03/10/2023.
//  Copyright © 03/10/2023 Lars Rothaus. All rights reserved.
//
export interface RGBValues { r: number, g: number, b: number }
export class Utils {

  public static GenerateRandomColor(alpha?: number): string {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor((Math.random() * 127) + 127);

    return `rgba(${r},${g},${b},${alpha ?? 1})`;
  }
  public static GenerateColorFromRGB(rgb:RGBValues, alpha?: number): string {
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha ?? 1})`;
  }


  public static GenerateRandomRGB(): RGBValues{
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor((Math.random() * 127) + 127);

    return {
      r, g, b
    };
  }

  public static download(content: string, fileName: string, contentType: string): void {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  public static GenerateId(length?:number):string {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    if(!length){
      length = 8;
    }
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;

  }
}
