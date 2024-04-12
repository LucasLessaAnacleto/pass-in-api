export function generateSlug(text: string) : string {
    return text.normalize("NFD")
        .toLowerCase()
        .replace(/[\u0020|\u005F]+/gui, "-")
        .match(/[\u002E|\u0030-\u0039|\u0040-\u005A|\u002D]/gui)
        ?.join("") || String(Date.now());
}