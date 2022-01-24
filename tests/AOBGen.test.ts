import { AOBGenerator } from "../src/AOBGen";

describe("Handle Cheat Engine", () => {
    it("Should handle cases correctly", () => {
        const aobgen = new AOBGenerator();
        const snippet = `\
notepad++.exe+1651DF - E8 54E80100          - call notepad++.exe+183A38
notepad++.exe+1651E4 - 48 8D 05 182B0C00    - lea rax, [notepad++.exe+227D08] { (7FF6A97D71B0) }
notepad++.exe+1651EB - 48 89 03             - mov [rbx],rax
notepad++.exe+1651EE - 48 8B C3             - mov rax, rbx`

        expect(aobgen.generateAob(snippet, false)).toEqual("E8 ?? ?? ?? ?? 48 8D 05 ?? ?? ?? ?? 48 89 03 48 8B C3");
        expect(aobgen.generateAob(snippet, true)).toEqual("E8 ?? ?? ?? ?? 48 8D 05 ?? ?? ?? ?? 48 89 03 48 8B C3");
    })

    it("Should handle instructions offsets", () => {
        const aobgen = new AOBGenerator();
        const snippet = `\
GoW. exe+5C6930 - F3 44 0F10 9B BC000000 - movs xmm11, [rbx+000000BC] 
GoW. exe+5C6939 - F3 44 0F10 83 B0000000 - movs xmm11, [rbx+000000B0]
GoW. exe+5C6942 - F3 45 0F58 CB - jasjcjasc`

        expect(aobgen.generateAob(snippet, true)).toEqual("F3 44 0F 10 9B ?? ?? ?? ?? F3 44 0F 10 83 ?? ?? ?? ?? F3 45 0F 58 CB");
        expect(aobgen.generateAob(snippet, false)).toEqual("F3 44 0F 10 9B BC 00 00 00 F3 44 0F 10 83 B0 00 00 00 F3 45 0F 58 CB");
    })

    it("Should support mixed cases", () => {
        const aobgen = new AOBGenerator();
        const snippet = `\
notepad++.exe+1651DF - E8 54E80100          - call notepad++.exe+183A38
notepad++.exe+1651E4 - 48 8D 05 182B0C00    - lea rax, [notepad++.exe+227D08] { (7FF6A97D71B0) }
notepad++.exe+1651EB - 48 89 03             - mov [rbx],rax
notepad++.exe+1651EE - 48 8B C3             - mov rax, rbx
notepad++.exe+1651FE - F3 44 0F10 9B BC000000 - movs xmm11, [rbx+000000BC] `

        expect(aobgen.generateAob(snippet, false)).toEqual("E8 ?? ?? ?? ?? 48 8D 05 ?? ?? ?? ?? 48 89 03 48 8B C3 F3 44 0F 10 9B BC 00 00 00");
        expect(aobgen.generateAob(snippet, true)).toEqual("E8 ?? ?? ?? ?? 48 8D 05 ?? ?? ?? ?? 48 89 03 48 8B C3 F3 44 0F 10 9B ?? ?? ?? ??");
    })
})