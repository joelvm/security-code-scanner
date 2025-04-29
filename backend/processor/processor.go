package processor

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"scs/model"
)

func ScanFile(file string, vulnerabilityType *model.VulnerabilityType, scanResults *[]model.ScanResultType) error {
	conteudo, err := os.ReadFile(file)
	if err != nil {
		return fmt.Errorf("error reading file %s: %w", file, err)
	}

	for _, vtp := range vulnerabilityType.Patterns {
		res, err := Matches(string(conteudo), vtp.Pattern)
		if err != nil {
			return err
		} else {
			if len(res) > 0 {
				*scanResults = append(*scanResults, model.ScanResultType{File: file, Matches: res})
			}
		}
	}
	return nil
}

func Scan(scanPath string, vulnerabilityType *model.VulnerabilityType) (scanResults []model.ScanResultType, err error) {

	var res []model.ScanResultType

	er := filepath.WalkDir(scanPath, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() {
			error2 := ScanFile(path, vulnerabilityType, &res)
			if error2 != nil {
				return error2
			}
		}
		return nil
	})

	return res, er
}
