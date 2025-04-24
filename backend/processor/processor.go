package processor

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
)

func ScanFile(file string) error {
	conteudo, err := os.ReadFile(file)
	if err != nil {
		return fmt.Errorf("error reading file %s: %w", file, err)
	}

	pattern := `\bAlert\s*(\(.*\))\s*;?`
	res, err := Matches(string(conteudo), pattern)

	if err != nil {
		return err
	}

	if res {
		return fmt.Errorf("file %s matches %q", file, pattern)
	}
	return nil
}

func Scan() {
	raiz := ".." // Diretório raiz para iniciar a busca

	err := filepath.WalkDir(raiz, func(caminho string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		// && (strings.HasSuffix(caminho, ".html") || strings.HasSuffix(caminho, ".js"))
		if !d.IsDir() {
			if err := ScanFile(caminho); err != nil {
				fmt.Println(err)
			}
		}
		return nil
	})

	if err != nil {
		fmt.Println("Erro durante a busca:", err)
	} else {
		fmt.Println("Verificação concluída. Nenhuma instrução Alert() encontrada nos arquivos .html e .js (palavra inteira).")
	}
}
