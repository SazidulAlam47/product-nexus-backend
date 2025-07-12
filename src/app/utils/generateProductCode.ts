import crypto from 'crypto';

type TSubstringObj = {
    substring: string;
    startIndex: number;
    endIndex: number;
};

const generateProductCode = (productName: string) => {
    const normalizeName = productName.toLocaleLowerCase().replace(/\s+/g, '');

    const substringObjs: TSubstringObj[] = [];

    let i = 0;
    let currentSubstring = '';
    let startIndex = 0;
    for (; i < normalizeName.length; i++) {
        if (currentSubstring === '') {
            currentSubstring += normalizeName[i];
            startIndex = i;
        } else if (
            currentSubstring[currentSubstring.length - 1] <= normalizeName[i]
        ) {
            currentSubstring += normalizeName[i];
        } else if (
            currentSubstring[currentSubstring.length - 1] > normalizeName[i]
        ) {
            substringObjs.push({
                substring: currentSubstring,
                startIndex,
                endIndex: i - 1,
            });

            // set next substring
            currentSubstring = normalizeName[i];
            startIndex = i;
        }
    }
    substringObjs.push({
        substring: currentSubstring,
        startIndex,
        endIndex: i - 1,
    });

    const maxLength = Math.max(
        ...substringObjs.map((obj) => obj.substring.length),
    );

    const longestSubstrings = substringObjs.filter(
        (obj) => obj.substring.length === maxLength,
    );

    const finalSubstring = longestSubstrings
        .map((obj) => obj.substring)
        .join('');

    const finalStartIndex = longestSubstrings[0].startIndex;
    const finalEndIndex =
        longestSubstrings[longestSubstrings.length - 1].endIndex;

    const hash = crypto
        .createHash('sha1')
        .update(productName)
        .digest('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, 8)
        .toLocaleLowerCase();

    return `${hash}-${finalStartIndex}${finalSubstring}${finalEndIndex}`;
};

export default generateProductCode;
