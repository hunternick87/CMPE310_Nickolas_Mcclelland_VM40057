;   get filename from command line
;   open file
;   first line of file is number of lines in file (max 1000)
;   read the integers into an array
;   find the sum
;   print the sum
;   close the file


section .data
    file_mode db "r", 0
    max_array_size equ 1000
    out_format db "Sum: %d", 10, 0
    in_format db "%d", 0

section .bss
    file_pointer resd 1                 ; pointer to file
    number_count resd 1                 ; number of integers in the file
    number_array resd max_array_size    ; array
    sum resd 1                          ; sum

section .text
    global main
    extern fopen, fscanf, printf, fclose

main:
    ; prompt user or get filename from command line
    mov ebx, [esp+4]
    mov ebx, [esp+8]        ; filename argument
    ; maybe implement error checking?

    ; open file
    push mode
    push ebx
    call fopen
    add esp, 8

    mov [file_pointer], eax


    ; read first line of filename


    ; read integers into array


    ; find the sum


    ; print the sum


    ; close the file


    ; exit