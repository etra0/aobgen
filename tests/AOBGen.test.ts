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

    it("Should wildcard only once", () => {
        const aobgen = new AOBGenerator();
        const snippet = `\
Darksiders3-Win64-Shipping.exe+16DE850 - 83 B9 90010000 00    - cmp dword ptr [rcx+00000190],00 { 0 }
Darksiders3-Win64-Shipping.exe+16DE857 - 7E 0C                - jle Darksiders3-Win64-Shipping.exe+16DE865
Darksiders3-Win64-Shipping.exe+16DE859 - 48 8B 89 88010000    - mov rcx,[rcx+00000188]
Darksiders3-Win64-Shipping.exe+16DE860 - E9 BB8404FF          - jmp Darksiders3-Win64-Shipping.exe+726D20
Darksiders3-Win64-Shipping.exe+16DE865 - 33 C0                - xor eax,eax
Darksiders3-Win64-Shipping.exe+16DE867 - C3                   - ret`
        expect(aobgen.generateAob(snippet, false)).toEqual("83 B9 90 01 00 00 00 7E 0C 48 8B 89 88 01 00 00 E9 ?? ?? ?? ?? 33 C0 C3");
        expect(aobgen.generateAob(snippet, true)).toEqual("83 B9 ?? ?? ?? ?? 00 7E 0C 48 8B 89 ?? ?? ?? ?? E9 ?? ?? ?? ?? 33 C0 C3");
    });
})
