section .data
    prompt_1 db "First string: ", 0
    prompt_2 db "Second string: ", 0
    result db "The Hamming distance is: ", 0
    newline db 10, 0
    hamming_distance_str db "000", 0

section .bss
    str1 resb 256
    str2 resb 256
    hamming_distance resb 1

section .text
    global _start

_start:
    ; first prompt
    mov eax, 4
    mov ebx, 1
    mov ecx, prompt_1
    mov edx, 14
    int 0x80

    ; read in string
    mov eax, 3
    mov ebx, 0
    mov ecx, str1
    mov edx, 255
    int 0x80

    ; null terminate
    mov byte [str1 + eax - 1], 0

    ; second prompt
    mov eax, 4
    mov ebx, 1
    mov ecx, prompt_2
    mov edx, 15
    int 0x80

    ; read in string
    mov eax, 3
    mov ebx, 0
    mov ecx, str2
    mov edx, 255
    int 0x80

    ; null terminate
    mov byte [str2 + eax - 1], 0

    ; calculate hamming distance
    xor ecx, ecx
    xor edx, edx

calculate_loop:
    mov al, [str1 + ecx]
    mov bl, [str2 + ecx]
    cmp al, 0
    je end_calculation
    cmp bl, 0
    je end_calculation

    ; Compare the binary representation of each character
    mov esi, 8

compare_bits:
    xor ah, ah
    xor bh, bh
    test al, 1
    setnz ah
    test bl, 1
    setnz bh
    cmp ah, bh
    je skip_bit
    inc edx
    
skip_bit:
    shr al, 1
    shr bl, 1
    dec esi
    jnz compare_bits

    inc ecx
    jmp calculate_loop

end_calculation:
    ; store data
    mov [hamming_distance], dl

    ; convert hamming distance to string
    movzx eax, byte [hamming_distance]
    call int_to_str

    ; print result string
    mov eax, 4
    mov ebx, 1
    mov ecx, result
    mov edx, 25
    int 0x80

    ; print result number (the hamming distance)
    mov eax, 4
    mov ebx, 1
    mov ecx, hamming_distance_str
    mov edx, 3
    int 0x80

    ; print the newline
    mov eax, 4
    mov ebx, 1
    mov ecx, newline
    mov edx, 1
    int 0x80

    ; close program
    mov eax, 1
    xor ebx, ebx
    int 0x80

int_to_str:
    ; Convert integer in EAX to string in hamming_distance_str
    mov ecx, 10
    xor ebx, ebx
    mov edi, hamming_distance_str + 2
    
convert_loop:
    xor edx, edx
    div ecx
    add dl, '0'
    mov [edi], dl
    dec edi
    test eax, eax
    jnz convert_loop
    ret