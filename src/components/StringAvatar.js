export function stringToColor(string) {
    let hash = 0;
    let i;

    if(!string) return;
    /* eslint-disable no-bitwise */
    for (i = 0; i < String(string || "d").length; i += 1) {
        hash = String(string).charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
export function stringAvatar(name = "User") {
    name = String(name).toUpperCase()
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${String(name)?.split(' ')?.length > 0 ? (name?.split(' ')?.[0]?.split('')?.[0] || "")+(name.split(' ')?.[1]?.split('')?.[0] || "") : String(name || "A")?.split('')?.[0]}`,
    };
}
