// AOBGen TypeScript rewrite by Sebastián Aedo.
// This tool is heavily based on this file which is licensed under MIT: 
// https://github.com/FransBouma/InjectableGenericCameraSystem/blob/master/Tools/AOBGen/AOBGenerator.cs
// So all rights reserved to Frans Bouma as well.

export class AOBGenerator {
    generateAob(toParse: string, alsoWildcardOffsets: boolean): string {
        const lineEndings = /[\r\n]/;
        const execName = /^[/\w].*?\.exe/igm;
        const countChar = (arr: string[], c: string) => arr.reduce((acc, x) => acc + (x == c ? 1 : 0), 0);
        
        // We strip executable name because if contains a dash it could cause some parsing issues.
        let splitted = toParse.split(lineEndings).map(x => x.toLowerCase().replace(execName, ""));

        if (splitted.length == 0)
            return "";
        
        if (splitted[0].includes("|"))
            return this.handleX64Dbg(splitted, alsoWildcardOffsets);
        else if (countChar(splitted[0].split(""), "-") > 1)
            return this.handleCheatEngine(splitted, alsoWildcardOffsets);
        else 
            return "<Unknown Format>";
    }

    private handleX64Dbg(words: string[], alsoWildcardOffsets: boolean): string {
        let result = "";
        for (const word of words) {
            let fragments = word.split("|");

            // invalid cases.
            if (fragments.length < 3) continue;
            fragments[1] = fragments[1].replace(":", " ");
            result += this.handleByteFragments(fragments[1], fragments[2], alsoWildcardOffsets);
        }
        return result.trim().toUpperCase();
    }

    private handleCheatEngine(words: string[], alsoWildcardOffsets: boolean): string {
        let result = "";
        for (const word of words) {
            const firstHyphen = word.indexOf("-");
            if (firstHyphen < 0) continue;

            const secondHyphen = word.indexOf("-", firstHyphen + 1);
            if (secondHyphen < 0) continue;
            const secondFragment = word.substring(firstHyphen + 1, secondHyphen - 1).trim();
            const thirdFragment = word.substring(secondHyphen + 1).trim().toLowerCase();

            result += this.handleByteFragments(secondFragment, thirdFragment, alsoWildcardOffsets);
        }
        return result.trim().toUpperCase();
    }

    // Sadly, we have to return strings by copy, or something like that.
    private handleByteFragments(secondFragment: string, thirdFragment: string, alsoWildcardOffsets: boolean): string {
        const byteFragments = secondFragment.split(" ");
        let result = "";
        // We usually want to wildcard only once, since second operand is
        // highly unlikely to be an offset.
        let wasWildcarded = false;

        for (let i = 0; i < byteFragments.length; i++) {
            const bytes = byteFragments[i];
            switch(bytes.length) {
                case 2:
                    if (!wasWildcarded && alsoWildcardOffsets && i == (byteFragments.length - 1) && thirdFragment.includes("+" + bytes)) {
                        result += "?? ";
                        wasWildcarded = true;
                    } else {
                        result += AOBGenerator.pureBytes(bytes);
                    }
                    break;
                case 4:
                case 6:
                    result += AOBGenerator.pureBytes(bytes);
                    break;
                case 8:
                    if (!wasWildcarded && this.shouldWildcard(bytes.toLowerCase(), thirdFragment, alsoWildcardOffsets)) {
                        result += "?? ?? ?? ?? ";
                        wasWildcarded = true;
                    } else {
                        result += AOBGenerator.pureBytes(bytes);
                    }
                    break;
                default:
                    continue;
            }
        }

        return result;
    }

    private shouldWildcard(bytes: string, thirdFragment: string, alsoWildcardOffsets: boolean): boolean {
        const littleEndianValue = "" + bytes[6] + bytes[7] + bytes[4] + bytes[5] + bytes[2] + bytes[3] + bytes[0] + bytes[1];
        const number = Number.parseInt(littleEndianValue, 16);
        const numberHex = number.toString(16);

        const isRelativeOffset = thirdFragment.includes(numberHex) || thirdFragment.includes(littleEndianValue);

        if (alsoWildcardOffsets && isRelativeOffset) {
            return true;
        }

        return !thirdFragment.includes(numberHex) && !thirdFragment.includes(littleEndianValue);
    }

    private static pureBytes(bytes: string): string {
        let acc = "";
        for (let i = 0; i < bytes.length; i+= 2) {
            acc += bytes[i] + bytes[i + 1] + " ";
        }

        return acc;
    }
}
