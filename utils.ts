// export const makeImgPath = (img: string, width: string = "w500") => 
//     `https://image.tmdb.org/t/p/${width}${img}`;


export const makeImgPath = (path: string, width: string = "w500") =>
    `https://image.tmdb.org/t/p/${width}${path}`;
