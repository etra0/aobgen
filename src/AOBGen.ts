export class AOBGenerator {
    generateAob(toParse: string, alsoWildcardOffsets: boolean): string {
        const lineEndings = /[\r\n]/;
        const splitted = toParse.split(lineEndings);

        if (splitted.length == 0)
            return "";
        
        if (splitted[0].includes("|"))
            return this.handleX64Dbg(splitted, alsoWildcardOffsets);
        // A bit boilerplate-y, but we basically check how many times '-' is in the string, according to Frans's version.
        else if (splitted[0].split("").reduce((acc: number, x: string) => acc + (x == "-" ? 1 : 0), 0))
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
        return result.trim();
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
        return result.trim();
    }

    // Sadly, we have to return strings by copy, or something like that.
    private handleByteFragments(secondFragment: string, thirdFragment: string, alsoWildcardOffsets: boolean): string {
        const byteFragments = secondFragment.split(" ");
        let result = "";

        for (let i = 0; i < byteFragments.length; i++) {
            const bytes = byteFragments[i];
            switch(bytes.length) {
                case 2:
                    if (alsoWildcardOffsets && i == byteFragments.length - 1 && thirdFragment.includes("+" + bytes)) {
                        result += "?? ";
                    } else {
                        result += AOBGenerator.pureBytes(bytes);
                    }
                    break;
                case 4:
                case 6:
                    result += AOBGenerator.pureBytes(bytes);

                case 8:
                    if (this.checkIfShouldBeWildcarded(bytes.toLowerCase(), thirdFragment, alsoWildcardOffsets)) {
                        result += "?? ?? ?? ?? ";
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

    private checkIfShouldBeWildcarded(bytes: string, thirdFragment: string, alsoWildcardOffsets: boolean): boolean {
        const littleEndianValue = "" + bytes[6] + bytes[7] + bytes[4] + bytes[5] + bytes[2] + bytes[3] + bytes[0] + bytes[1];
        const number = Number.parseInt(littleEndianValue, 16);
        const numberHex = number.toString(16);

        if (alsoWildcardOffsets) {
            return thirdFragment.includes(numberHex) || thirdFragment.includes(littleEndianValue);
        }

        return !thirdFragment.includes(numberHex) || !thirdFragment.includes(littleEndianValue);
    }

    private static pureBytes(bytes: string): string {
        let acc = "";
        for (let i = 0; i < bytes.length; i+= 2) {
            acc += bytes[i] + bytes[i + 1] + " ";
        }

        return acc;
    }
}