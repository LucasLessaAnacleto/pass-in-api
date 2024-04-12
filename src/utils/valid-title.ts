// export function validTitle(title: string) : string | null {
//     const newTitle = title
//     .replace(/^[\s]+|[\s]+$/g, "")
//     .match(/[\s|\u002C-\u002E|\u0040|\u005F]|[\w]+/giu)
//     ?.join("")
//     .replace(/([\S]+[\s])[\s]+/gui, "$1") || ""
    
//     return newTitle.length >= 4 ? newTitle : null;
// }

// console.log(validTitle("@@joão_evento"))