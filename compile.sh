# ask for file name
read -p "Enter the assembly file name (without extension): " file_name

# compile asm file
nasm -f elf "${file_name}.asm"

# link asm file
ld -m elf_i386 -s -o "${file_name}" "${file_name}.o"

echo "Compilation and linking completed. Executable is ${file_name}"