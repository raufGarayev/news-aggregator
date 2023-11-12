export const extractAuthorName = (inputString: string) => {
    // Check if the string contains a name in the format "Fullname (now) and Fullname (later)"
    const match = inputString.match(/(.+?) \(.+?\) and (.+?) \(.+?\)/);

    if (match) {
        return match[1];
    } else {
        return inputString;
    }
}
