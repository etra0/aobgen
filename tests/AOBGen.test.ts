import { AOBGenerator } from "../src/AOBGen";

// notepad++.exe+165107 - 48 89 4A 08          - mov [rdx+08], rcx
// notepad++.exe+1651DB - 48 8D 48 08          - lea rcx, [rax+08]
// notepad++.exe+1651DF - E8 54E80100          - call notepad++.exe+183A38
// notepad++.exe+1651E4 - 48 8D 05 182BOCOR    - lea rax, [notepad++.exe+227D08] { (7FF6A97D71B0) }
// notepad++.exe+1651EB - 48 89 03             - mov [rbx],rax
// notepad++.exe+1651EE - 48 8B C3             - mov rax, rbx
// notepad++.exe+1651F1 - 48 83 C4 20          - add rsp,20 { 32 }
// notepad++.exe+165175 - 5B                   - pop rbx
// notepad++.exe+1651F6 - C3                   - ret
// notepad++.exe+1651F7 - CC                   - int 3
// notepad++.exe+1651F8 - 33 CO                - xor eax,eax
// notepad++.exe+1651FA - 48 89 41 10          - mov (rcx+10),rax
// notepad++.exe+1651FE - 48 8D 05 132BOCOO    - lea rax, (notepad++.exe+227018] { "bad array new length") }
// notepad++.exe+165205 - 48 89 41 08          - mov (rcx+08], rax
// notepad++.exe+165209 - 48 8D 05 F82AOCOO    - lea rax, [notepad++.exe+227D08] { (7FF6A97D71B0) }
// notepad++.exe+165210 - 48 89 01             - mov [rex], rax



describe("Handle Cheat Engine", () => {
    it("Should handle cases correctly", () => {
        const aobgen = new AOBGenerator();
        const snippet = `\
notepad++.exe+1651DF - E8 54E80100          - call notepad++.exe+183A38
notepad++.exe+1651E4 - 48 8D 05 182B0C00    - lea rax, [notepad++.exe+227D08] { (7FF6A97D71B0) }
notepad++.exe+1651EB - 48 89 03             - mov [rbx],rax
notepad++.exe+1651EE - 48 8B C3             - mov rax, rbx`
        expect(aobgen.generateAob(snippet, false)).toEqual("E8 ?? ?? ?? ?? 48 8D 05 ?? ?? ?? ?? 48 89 03 48 8B C3");
    })
})